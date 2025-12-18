# IMPLEMENTATION NOTES - Souls of Abyss v3.1

**Last Updated:** 2025-12-18  
**Status:** Ready for Cody (Developer)

---

## What Needs To Be Done (In Order)

### PHASE 1: Add Loot Magnet (30 min)

**Location:** In `game.js`, after `Player` class definition

**Add this code:**

```javascript
class LootMagnet {
  constructor(player) {
    this.player = player;
    this.baseRadius = 100;
    this.upgradeLevel = 0;
  }
  
  get radius() {
    return this.baseRadius + (this.upgradeLevel * 50);
  }
  
  update(souls) {
    souls.forEach(soul => {
      const dist = this.player.position.distance(soul.position);
      if (dist < this.radius && dist > 2) {
        const dir = this.player.position.clone()
          .subtract(soul.position)
          .normalize();
        soul.position.add(dir.scale(300));
      }
    });
  }
  
  upgradeMagnet() {
    if (this.upgradeLevel < 3) {
      this.upgradeLevel++;
      return true;
    }
    return false;
  }
}
```

**Then in Player constructor, add:**
```javascript
this.magnet = new LootMagnet(this);
```

**Add upgrade to LEVEL_UP_POOL:**
```javascript
{ id: 'magnet', title: '+50px Loot Radius', desc: 'Pull loot from further away' }
```

**In applyUpgradeChoice, add case:**
```javascript
case 'magnet':
  if (player.magnet.upgradeMagnet()) {
    // Visual feedback
    spawnParticleBurst(player.position.x, player.position.y, '#ffd95a', 'glow', 10);
  }
  break;
```

**In gameLoop (update function), add after updateSouls:**
```javascript
gameState.player.magnet.update(gameState.souls);
```

---

### PHASE 2: Implement Timeline Spawning (1 hour)

**Location:** Replace spawnWave() and tickSpawn() functions

**Add SPAWN_PHASES constant BEFORE spawnWave():**

```javascript
const SPAWN_PHASES = [
  { start: 0, end: 60, spawnPeriod: 2.0, enemyTypes: ['zombie'] },
  { start: 60, end: 120, spawnPeriod: 1.5, enemyTypes: ['zombie', 'spectre'] },
  { start: 120, end: 180, spawnPeriod: 1.2, enemyTypes: ['spectre', 'cultist', 'vampire'] },
  { start: 180, end: 330, spawnPeriod: 1.0, enemyTypes: ['cultist', 'vampire', 'wraith'] },
  { start: 330, end: 540, spawnPeriod: 0.8, enemyTypes: ['vampire', 'wraith', 'corrupted_knight'] },
  { start: 540, end: 900, spawnPeriod: 1.2, enemyTypes: ['wraith', 'corrupted_knight', 'warden'] }
];

const BOSS_SCHEDULE = [
  { time: 120, bossType: 'shadow_lord' },
  { time: 330, bossType: 'void_rift' },
  { time: 870, bossType: 'ancient_one' }
];
```

**Replace spawnWave() with:**

```javascript
function getCurrentPhase(gameTime) {
  return SPAWN_PHASES.find(p => gameTime >= p.start && gameTime < p.end);
}

function tickSpawn(dt) {
  const phase = getCurrentPhase(gameState.gameTime);
  if (!phase) return;
  
  // Check if boss > 50% HP (pause spawning)
  const activeBoss = gameState.enemies.find(e => e.isBoss && e.alive && e.health > e.maxHealth * 0.5);
  if (activeBoss) return;
  
  gameState.spawnTokens = (gameState.spawnTokens || 0) + dt;
  
  while (gameState.spawnTokens >= phase.spawnPeriod) {
    const enemyType = phase.enemyTypes[Math.floor(Math.random() * phase.enemyTypes.length)];
    spawnEnemyAtRing(enemyType);
    gameState.spawnTokens -= phase.spawnPeriod;
    
    // 30% chance to spawn 2 enemies
    if (Math.random() < 0.3) {
      spawnEnemyAtRing(enemyType);
    }
  }
}

function checkBossSpawn() {
  const now = gameState.gameTime;
  const lastFrame = now - (gameState.lastDt || 0.016);
  
  BOSS_SCHEDULE.forEach(boss => {
    if (boss.spawned) return;
    if (lastFrame < boss.time && now >= boss.time) {
      spawnBoss(boss.bossType);
      triggerScreenShake(20);
      boss.spawned = true;
    }
  });
}
```

**In gameLoop(), REPLACE these lines:**

OLD:
```javascript
tickSpawn(dt);
```

NEW:
```javascript
ticKSpawn(dt);
checkBossSpawn();
```

**Remove/replace waveTimer logic:**

OLD:
```javascript
if (gameState.waveTimer >= 30) {
  spawnWave();
}
if (gameState.bossTimer >= 120) {
  spawnBoss();
}
```

NEW: (Delete these - already handled by checkBossSpawn and tickSpawn)

---

### PHASE 3: Update Balance Tables (30 min)

**Location:** ENEMY_DEFS and BOSS_DEFS constants

**Replace ENEMY_DEFS with:**

```javascript
const ENEMY_DEFS = {
  zombie: { health: 18, damage: 4, speed: 75, color: '#9da3a4', elite: false, move: 'walk' },
  spectre: { health: 14, damage: 5, speed: 130, color: '#4db1e8', elite: false, move: 'fly' },
  cultist: { health: 20, damage: 6, speed: 95, color: '#a347d6', elite: false, move: 'walk' },
  vampire: { health: 45, damage: 11, speed: 110, color: '#c41e3a', elite: true, move: 'fly' },
  wraith: { health: 40, damage: 10, speed: 115, color: '#1a1a1f', elite: true, move: 'fly' },
  corrupted_knight: { health: 55, damage: 13, speed: 60, color: '#4e5b6e', elite: true, move: 'walk' },
  warden: { health: 48, damage: 12, speed: 95, color: '#0ad1ff', elite: true, move: 'spiral' }
};
```

**Replace BOSS_DEFS with:**

```javascript
const BOSS_DEFS = {
  shadow_lord: { health: 120, damage: 18, speed: 90, spriteSize: 96, color: '#ff304f' },
  void_rift: { health: 180, damage: 24, speed: 80, spriteSize: 96, color: '#1b0326' },
  ancient_one: { health: 400, damage: 35, speed: 85, spriteSize: 96, color: '#ff9f1c' }
};
```

**Add HITBOX_SIZES constant:**

```javascript
const HITBOX_SIZES = {
  zombie: 16,
  spectre: 14,
  cultist: 15,
  vampire: 20,
  wraith: 18,
  corrupted_knight: 24,
  warden: 22,
  player: 15
};

const BOSS_HITBOX_SIZE = 32;
```

**Update Enemy constructor hitRadius calculation:**

OLD:
```javascript
const baseSize = this.definition.spriteSize || 48;
this.hitRadius = (baseSize * (this.isBoss ? 1.4 : 1)) * 0.35;
```

NEW:
```javascript
if (this.isBoss) {
  this.hitRadius = BOSS_HITBOX_SIZE;
} else {
  this.hitRadius = HITBOX_SIZES[type] || 15;
}
```

---

### PHASE 4: Add Sprite System (Optional but Recommended)

**Location:** Add before sprite cache code

```javascript
class SpriteSheetManager {
  constructor() {
    this.sheets = new Map();
  }
  
  register(name, url, frameW, frameH, perRow) {
    const img = new Image();
    img.src = url;
    this.sheets.set(name, {
      image: img,
      frameWidth: frameW,
      frameHeight: frameH,
      framesPerRow: perRow,
      ready: false
    });
    img.onload = () => this.sheets.get(name).ready = true;
  }
  
  draw(ctx, name, frame, x, y, scale = 1) {
    const sheet = this.sheets.get(name);
    if (!sheet || !sheet.ready) return; // Fallback handled by Sprite class
    
    const frameIdx = Math.floor(frame) % sheet.framesPerRow;
    const srcX = frameIdx * sheet.frameWidth;
    const srcY = 0;
    
    ctx.drawImage(
      sheet.image,
      srcX, srcY,
      sheet.frameWidth, sheet.frameHeight,
      x, y,
      sheet.frameWidth * scale, sheet.frameHeight * scale
    );
  }
}

const spriteManager = new SpriteSheetManager();
// Register sprites as they become available
```

---

## Testing Checkpoints

### After PHASE 1 (Magnet)
- [ ] Game starts without errors
- [ ] Pick level-up with "Loot Radius"
- [ ] Souls pull toward player
- [ ] No crashes

### After PHASE 2 (Timeline)
- [ ] Play 5 minutes
- [ ] No waiting between spawns
- [ ] Bosses appear at 2:00, 5:30, 14:45
- [ ] Spawning pauses when boss > 50% HP

### After PHASE 3 (Balance)
- [ ] Zombie dies in 2-3 hits (Knight base 12 DMG)
- [ ] Vampire dies in 8-10 hits
- [ ] Shadow Lord takes 8-10 seconds
- [ ] No one-shot kills early game

### Final (Everything)
- [ ] Play full 15 minutes as each character
- [ ] All 3 bosses fought
- [ ] No crashes, FPS > 50
- [ ] Someone else can pick it up and play

---

## Common Issues & Fixes

**Issue:** spawnWave still called somewhere
- **Fix:** Search code for `spawnWave()` and remove calls

**Issue:** Zombies still dying in 1 hit
- **Fix:** Check ENEMY_DEFS values are updated

**Issue:** Loot not pulling
- **Fix:** Check magnet.update() called in gameLoop
- **Fix:** Check LootMagnet class added to game.js

**Issue:** Bosses not spawning
- **Fix:** Check BOSS_SCHEDULE has correct times
- **Fix:** Check checkBossSpawn() called in gameLoop

---

## Code Locations Quick Reference

| Item | Location in game.js |
|------|---------------------|
| LootMagnet class | After Player class (~line 2000) |
| SPAWN_PHASES | Before spawnWave function (~line 2200) |
| BOSS_SCHEDULE | After SPAWN_PHASES (~line 2220) |
| HITBOX_SIZES | With other constants (~line 150) |
| spawnWave replacement | ~line 2300 |
| gameLoop modifications | ~line 3000-3100 |
| Magnet update call | In gameLoop, after updateSouls |

---

**Implementation by:** Cody  
**Time estimate:** 3-4 hours  
**Difficulty:** Medium  
**No ambiguity - just follow this guide step by step.**
