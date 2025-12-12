# SPAWN & BALANCE OPTIMIZATION GUIDE

## CURRENT SYSTEM ANALYSIS

### How Spawning Works Now

```javascript
// In spawnEnemyAtRing():
const minRadius = 320;  // Minimum spawn distance
const maxRadius = 720 + gameState.waveNumber * 8;  // Max increases with waves
const angle = Math.random() * Math.PI * 2;  // Random direction
const radius = minRadius + Math.random() * (maxRadius - minRadius);  // Random distance

// Enemy placed at:
const x = player.x + cos(angle) * radius;
const y = player.y + sin(angle) * radius;
```

**Problem:** Enemies spawn in a ring around player, no obstacles = straight paths

### Difficulty Curve

```javascript
// Current formula:
gameState.difficultyMultiplier = Math.min(1 + gameState.gameTime / 120, 4);

// Results:
// 0 min:   1.0x (easy)
// 2 min:   1.17x (moderate)
// 4 min:   1.33x (challenge)
// 6 min:   1.5x (intense)
// 8 min:   1.67x (very intense)
// 10 min:  1.83x (extreme)
```

**Problem:** Too aggressive too early, players don't have enough time to power up

### Elite Spawn Rate

```javascript
// Current formula:
const waveEliteChance = Math.min(0.15 + gameState.waveNumber * 0.01, 0.35);

// Results (assuming 30 seconds per wave):
// 0 min:   Wave 0: 15% elite (5 enemies = 0-1 elite)
// 2 min:   Wave 4: 19% elite (2+ elites)
// 4 min:   Wave 8: 23% elite (lots of elites)
// 6 min:   Wave 12: 27% elite
// 8 min:   Wave 16: 31% elite
// 10 min:  Wave 20: 35% elite
```

**Problem:** 15% seems reasonable but combined with difficulty multiplier, becomes overwhelming

### Enemy Health

```javascript
// Current base health:
const ENEMY_DEFS = {
  zombie: { health: 20, ... },    // Takes 2 hits from starter weapon
  spectre: { health: 18, ... },
  cultist: { health: 22, ... },
  vampire: { health: 40, ... },   // Elite, 4x starter hits
  wraith: { health: 38, ... },
  corrupted_knight: { health: 50, ... },
  warden: { health: 42, ... }
};
```

**Problem:** With 7+ enemies attacking simultaneously, high health = tedious grinding

---

## OPTIMIZATION STRATEGY

### Goal: Better Pacing

```
Ideal progression:
0-2 min:   TUTORIAL - Single digit enemies, new player learns controls
2-4 min:   WARM-UP - Moderate spawn rate, player gains levels
4-6 min:   CHALLENGE - Noticeably harder, requires weapon diversity
6-8 min:   INTENSE - Chaos, but survivable with good play
8-10 min:  EXTREME - Overwhelming, requiring all skills
```

### Change 1: Difficulty Curve (CRITICAL)

**Old:**
```javascript
gameState.difficultyMultiplier = 1 + gameState.gameTime / 120;  // Too aggressive
```

**New:**
```javascript
gameState.difficultyMultiplier = Math.min(1 + gameState.gameTime / 150, 4);
```

**Impact:**
```
0 min:    1.0x  (baseline)
2 min:    1.13x (gentle ramp)
4 min:    1.27x (moderate)
6 min:    1.4x  (challenge)
8 min:    1.53x (intense)
10 min:   1.67x (extreme but fair)
```

**Benefit:** Slower curve allows player to level up, unlock weapons, feel progression

### Change 2: Enemy Health Reduction

**Old:**
```javascript
zombie: 20,  // Survives 2 hits from 10 dmg starter weapon
spectre: 18,
culist: 22,
vampire: 40,  // Elite, very tanky
wraith: 38,
corrupted_knight: 50,
warden: 42
```

**New (15% reduction):**
```javascript
zombie: 17,      // Dies in 2 hits (more satisfying)
spectre: 15,     // Dies faster
culist: 19,
vampire: 34,     // Elite still threatening, but not spongy
wraith: 32,
corrupted_knight: 42,
warden: 36
```

**Benefit:** Combat feels snappier, less grinding, more visual feedback

### Change 3: Elite Spawn Progression

**Old:**
```javascript
const waveEliteChance = Math.min(0.15 + gameState.waveNumber * 0.01, 0.35);
```

**Problem:** Tied to wave count, not player progression. By minute 2, too many elites appear

**New:**
```javascript
const waveEliteChance = Math.min(0.10 + gameState.gameTime / 600, 0.35);
```

**Impact:**
```
0 min:    10% elite
2 min:    10.2% elite
4 min:    10.4% elite
6 min:    11% elite
8 min:    12% elite
10 min:   13% elite (caps at 35% baseline, but with good difficulty scaling)
```

**Benefit:** Early game stays manageable, elite difficulty ramps naturally

### Change 4: Boss Spawn Timing

**Old:**
```javascript
if (gameState.bossTimer >= 120) {
  spawnBoss();  // Every 120 seconds
}
```

**New:**
```javascript
// First boss at 90 seconds (quick first encounter)
// Subsequent bosses every 120 seconds
if (gameState.bossTimer >= 120 || (gameState.bossIndex === 0 && gameState.bossTimer >= 90)) {
  spawnBoss();
}

// Scale boss health with difficulty:
boss.health *= gameState.difficultyMultiplier;
```

**Impact:**
```
0:90    First boss (Shadow Lord) appears - surprise!
2:30    Second boss (Void Rift)
4:30    Third boss (Ancient One)
6:30    Fourth boss (Shadow Lord again, harder)
8:30    Fifth boss
```

**Benefit:** Boss encounters feel climactic and rewarding

### Change 5: Obstacle System (NEW)

**What:** Add environmental obstacles to spawn arena

**Why:** 
- Prevents mob clustering in center
- Creates tactical depth
- Visual interest on map
- Forces dynamic positioning

**Implementation:**

```javascript
class ObstacleManager {
  constructor() {
    this.obstacles = [];  // {x, y, radius, type}
  }
  
  add(x, y, radius, type) {
    this.obstacles.push({x, y, radius, type});
  }
  
  isBlocked(x, y, checkRadius) {
    for (let obs of this.obstacles) {
      const dist = Math.sqrt((x-obs.x)**2 + (y-obs.y)**2);
      if (dist < (checkRadius + obs.radius)) {
        return true;
      }
    }
    return false;
  }
}

// Usage in spawnEnemyAtRing():
let placed = false;
for (let attempt = 0; attempt < 3; attempt++) {
  const x = ...  // Calculate spawn position
  const y = ...
  
  if (!gameState.obstacles.isBlocked(x, y, 40)) {
    // Safe to spawn
    gameState.enemies.push(new Enemy(type, x, y));
    placed = true;
    break;
  }
}
// If not placed after 3 tries, skip this spawn (rare)
```

**Obstacles to add:**
```javascript
const OBSTACLES = [
  { type: 'tree', radius: 30 },      // Dead trees
  { type: 'pillar', radius: 25 },    // Stone pillars
  { type: 'rock', radius: 20 }       // Boulders
];

// During initGame():
for (let i = 0; i < 15; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 250 + Math.random() * 350;  // Spawn ring 200-600px
  const x = player.x + Math.cos(angle) * radius;
  const y = player.y + Math.sin(angle) * radius;
  const obstType = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];
  gameState.obstacles.add(x, y, obstType.radius, obstType.type);
}
```

**Visual Rendering:**
```javascript
function drawObstacles(ctx) {
  for (let obs of gameState.obstacles) {
    if (obs.type === 'tree') {
      // Draw gnarled tree shape
      ctx.fillStyle = '#2d3b2d';
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (obs.type === 'pillar') {
      // Draw stone pillar
      ctx.fillStyle = '#4a5568';
      ctx.fillRect(obs.x - 12, obs.y - 20, 24, 40);
    } else if (obs.type === 'rock') {
      // Draw boulder
      ctx.fillStyle = '#6b7280';
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    // Shadow for depth
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(obs.x, obs.y + obs.radius * 0.7, obs.radius * 0.8, obs.radius * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Call in drawGame():
drawObstacles(ctx);
```

---

## TESTING FRAMEWORK

### Minute 0-2: Tutorial Phase

**Metrics:**
- Max enemies alive: 5-8
- Elite chance: 10% (0-1 elite)
- Difficulty multiplier: 1.0x-1.1x
- Player level: 1-2

**Success criteria:**
- Can survive without taking damage if careful
- Easy to understand mechanics
- Starter weapon feels adequate

**Test:** Start game, go AFK for 2 minutes
- Should survive easily
- If death, difficulty too high

### Minute 2-4: Warm-Up Phase

**Metrics:**
- Max enemies alive: 8-12
- Elite chance: 10.3% (1-2 elites)
- Difficulty multiplier: 1.13x-1.27x
- Player level: 2-4
- Expected unlocks: 1-2 weapons

**Success criteria:**
- Difficulty noticeably increases
- New weapon unlock feels impactful
- Still survivable with skill

**Test:** Play actively, try new weapons
- Weapon diversity matters
- Boss encounter at 90s feels epic
- Should still be winning

### Minute 4-6: Challenge Phase

**Metrics:**
- Max enemies alive: 12-18
- Elite chance: 10.7% (2-3 elites)
- Difficulty multiplier: 1.27x-1.4x
- Player level: 4-6
- Expected unlocks: 2-4 weapons

**Success criteria:**
- Meaningful challenge without feeling unfair
- Resource management (dodge, position) matters
- Multiple weapon synergies

**Test:** Play with focus on positioning
- Should barely survive with good play
- Boss at 4:30 is legitimate threat
- Level-up choices matter

### Minute 6-8: Intense Phase

**Metrics:**
- Max enemies alive: 18-25
- Elite chance: 11.3% (3-4 elites)
- Difficulty multiplier: 1.4x-1.53x
- Player level: 6-8
- Expected unlocks: 4-6 weapons

**Success criteria:**
- Overwhelming but not impossible
- Requires optimal play and build
- Feels like managing chaos

**Test:** Full focus play
- High skill can survive
- Boss encounters are desperate
- Screen feels full of action

### Minute 8-10: Extreme Phase

**Metrics:**
- Max enemies alive: 25-35
- Elite chance: 12% (4-5 elites)
- Difficulty multiplier: 1.53x-1.67x
- Player level: 8-10
- Expected unlocks: 6-7+ weapons

**Success criteria:**
- Victory condition (survive 10 minutes) is achievable
- Best players can win
- Feels like true survival

**Test:** Perfection play required
- Any mistake likely death
- Boss encounters are epic
- 10-minute survival is earned

---

## QUICK COMPARISON TABLE

| Time | Old Difficulty | New Difficulty | Old Elites | New Elites | Enemies | Health |
|------|---------------|-----------------|-----------|-----------|-----------|---------|
| 0m   | 1.0x          | 1.0x            | 10%       | 10%       | 5-6       | Normal  |
| 2m   | 1.17x         | 1.13x           | 12%       | 10.2%     | 8-10      | -15%    |
| 4m   | 1.33x         | 1.27x           | 14%       | 10.7%     | 12-15     | -15%    |
| 6m   | 1.5x          | 1.4x            | 16%       | 11%       | 15-20     | -15%    |
| 8m   | 1.67x         | 1.53x           | 18%       | 11.3%     | 20-25     | -15%    |
| 10m  | 1.83x         | 1.67x           | 20%       | 12%       | 25-30     | -15%    |

**Summary:**
- Old system: Too harsh too fast, players feel defeated at minute 6
- New system: Smooth progression, achievable goals, rewarding at each stage

---

## IMPLEMENTATION CHECKLIST

When updating game.js:

- [ ] Change difficultyMultiplier formula (divide by 150)
- [ ] Reduce all enemy base health by 15%
- [ ] Update elite spawn formula (use gameTime instead of waveNumber)
- [ ] Add ObstacleManager class
- [ ] Implement obstacle collision in spawnEnemyAtRing()
- [ ] Place 15-20 obstacles during initGame()
- [ ] Add drawObstacles() function
- [ ] Adjust boss spawn timing (90s first, then 120s)
- [ ] Scale boss health by difficultyMultiplier
- [ ] Test each phase (0-2, 2-4, 4-6, 6-8, 8-10)
- [ ] Verify 60 FPS performance
- [ ] No console errors

---

## COMMON MISTAKES TO AVOID

❌ **Don't:** Reduce difficulty too much (makes game boring)
✅ **Do:** Find balance between challenge and fairness

❌ **Don't:** Obstacles block player from reaching edges
✅ **Do:** Place obstacles only in outer ring, never near center

❌ **Don't:** Boss health doesn't scale with difficulty
✅ **Do:** Multiply boss health by difficultyMultiplier

❌ **Don't:** Elite enemies as common as regular enemies
✅ **Do:** Keep elite spawn rate low early, ramp late

❌ **Don't:** Test only at minute 2
✅ **Do:** Test all 5 phases (0-2, 2-4, 4-6, 6-8, 8-10)

---

## SUCCESS CRITERIA

Game balance is **GOOD** when:

✅ New players can survive 2 minutes without effort
✅ At 5 minutes, difficulty is noticeably increased
✅ At 10 minutes, survival is challenging but possible
✅ Bosses feel like climactic moments (not just another enemy)
✅ Weapon unlocks feel impactful
✅ No sudden difficulty spikes
✅ Player feels progression throughout game
✅ Death feels fair (not RNG-based)
✅ Fun to replay multiple times
✅ 60 FPS maintained throughout

---

**Author:** Many (Team Lead)
**Last Updated:** 2025-12-12
**Status:** Ready for Cody to implement

