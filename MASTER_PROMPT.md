# SOULS OF ABYSS - Master Orchestration Guide for Many

**Version:** 2.0  
**Target Agent:** Many (Team Leader)  
**Project Type:** Top-down dark fantasy roguelike (Vampire Survivors / Halls of Torment style)  
**Timeline:** 15-minute max playtime  
**Current Status:** Prototype working but needs visual/gameplay polish

---

## 🎯 PROJECT GOAL

Transform the current prototype into a **polished, playable game** with:
- Real pixel art sprites (characters, mobs, bosses, environment)
- Dark fantasy atmosphere
- Continuous action (no waiting between waves)
- Smart procedural generation
- Balanced 15-minute gameplay loop

---

## 📊 CURRENT STATE ANALYSIS

### What's Working ✅
- Core game engine in `game.js` (~45KB)
- Player movement (WASD)
- Weapon system (7 weapons)
- Collision detection
- Level-up system
- Basic enemy spawning
- HTML/CSS UI in `index.html`

### Critical Issues ❌

**1. Visuals are Placeholder**
- Characters/enemies render as colored circles
- No pixel art sprites
- Map is flat gradient background
- No environmental objects

**2. Spawn System is Broken**
- Wave-based spawning causes dead time
- Player kills all enemies → waits 15+ seconds
- No continuous pressure

**3. World is Empty**
- Loot spawns only at game start
- 90% of map is empty space
- No environmental variety

**4. Boss System Incomplete**
- Only 1 boss at end (14:45)
- No mid-game boss encounters
- Missing boss variety

---

## 🎨 TASK 1: PIXEL ART SPRITES (Dali → Sonic → Cody)

### Phase 1A: Dali Creates Sprite Sheets

**Style Guide:**
- 16-bit/32-bit pixel art aesthetic
- Dark fantasy theme (Vampire Survivors / Halls of Torment reference)
- Clear silhouettes for gameplay readability
- Consistent color palette: dark purples, grays, reds, blues

**Required Sprite Sheets:**

#### Characters (3 files)
1. `sprites/knight.png` - 256x64px (4 frames idle)
   - Armored warrior with sword & shield
   - Breathing animation

2. `sprites/witch.png` - 256x64px (4 frames idle)
   - Levitating sorceress with staff
   - Floating bob animation

3. `sprites/rogue.png` - 128x64px (2 frames idle)
   - Hooded assassin crouching
   - Ready stance

#### Regular Enemies (3 files)
4. `sprites/zombie.png` - 64x32px (2 frames walk)
5. `sprites/spectre.png` - 64x32px (2 frames float)
6. `sprites/cultist.png` - 64x32px (2 frames walk)

#### Elite Enemies (4 files)
7. `sprites/vampire.png` - 120x40px (3 frames)
8. `sprites/wraith.png` - 120x40px (3 frames)
9. `sprites/corrupted_knight.png` - 96x48px (2 frames)
10. `sprites/warden.png` - 120x40px (3 frames)

#### Bosses (3 files)
11. `sprites/shadow_lord.png` - 192x96px (2 frames breathe)
12. `sprites/void_rift.png` - 288x96px (3 frames rotate)
13. `sprites/ancient_one.png` - 192x96px (2 frames idle)

#### Environment & Effects (2 files)
14. `sprites/particles.png` - 96x16px (6 particle types: slash, explosion, spark, blood, glow, lifesteal)
15. `sprites/tileset.png` - 512x512px tileset with:
    - Ground tiles: dirt, stone, grass, cracked earth, lava
    - Objects: rocks, columns, ruins, bones, braziers
    - Organized in 32x32px grid

**Dali Success Criteria:**
- All 15 PNG files created
- Correct dimensions
- Transparent backgrounds where needed
- Frames aligned in horizontal strips

---

### Phase 1B: Sonic Creates Animation Specs

**Input:** Dali's sprite sheets  
**Output:** JSON files in `animations/` folder

**Format Required by game.js:**
```json
{
  "animations": {
    "idle": {
      "frameCount": 4,
      "frameTime": 0.25,
      "loop": true
    },
    "run": {
      "frameCount": 6,
      "frameTime": 0.10,
      "loop": true
    }
  }
}
```

**Critical:** `frameTime` must be in **SECONDS** (not milliseconds)

**Required Files (14 total):**
```
animations/
├── knight.json (5 states: idle, run, attack, hit, death)
├── witch.json (5 states: idle, run, cast, hit, death)
├── rogue.json (5 states: idle, run, attack, dodge, death)
├── zombie.json (4 states: idle, walk, attack, death)
├── spectre.json (4 states: idle, float, attack, death)
├── cultist.json (4 states: idle, walk, attack, death)
├── vampire.json (4 states: idle, walk, attack, death)
├── wraith.json (4 states: idle, spiral, attack, death)
├── corrupted_knight.json (4 states: idle, walk, attack, death)
├── warden.json (4 states: idle, patrol, attack, death)
├── shadow_lord.json (5 states: idle, attack, hit, phase_change, death)
├── void_rift.json (5 states: idle, attack, hit, phase_change, death)
├── ancient_one.json (5 states: idle, attack, hit, phase_change, death)
└── particles.json (6 types: slash, explosion, spark, blood, glow, lifesteal)
```

**Timing Guidelines:**
- Fast actions (attack): 0.06-0.10 sec per frame
- Medium (run): 0.10-0.15 sec per frame
- Slow (idle): 0.25-0.40 sec per frame

**Sonic Success Criteria:**
- Valid JSON (no syntax errors)
- frameTime in seconds
- frameCount matches sprite sheet frames

---

### Phase 1C: Cody Integrates Sprites

**Tasks:**

1. **Update Sprite Class in game.js**
   - Verify sprite loading works
   - Add error handling for missing sprites
   - Add console logging: `console.log('✅ Loaded:', spriteName)`

2. **Replace Fallback Rendering**
   - Current code draws circles when sprites fail
   - Keep fallback but ensure sprites load correctly
   - In `Enemy.draw()` and `Player.draw()`: use sprite rendering

3. **Test Sprite Display**
   - Open index.html in browser
   - Verify characters show pixel art (not circles)
   - Check browser console for errors

4. **Add Tileset Manager**
   ```javascript
   class TilesetManager {
     constructor(imageUrl, tileSize) {
       this.image = new Image();
       this.image.src = imageUrl;
       this.tileSize = tileSize;
       this.ready = false;
       this.image.onload = () => this.ready = true;
     }
     
     drawTile(ctx, tileX, tileY, x, y) {
       if (!this.ready) return;
       ctx.drawImage(
         this.image,
         tileX * this.tileSize, tileY * this.tileSize,
         this.tileSize, this.tileSize,
         x, y,
         this.tileSize, this.tileSize
       );
     }
   }
   ```

5. **Update Background Rendering**
   - Replace gradient with tileset
   - Draw tiles in `drawBackground()` function

**Cody Success Criteria:**
- Browser shows pixel art sprites
- No console errors
- Performance: 60 FPS with 50+ entities

---

## ⚡ TASK 2: FIX SPAWN SYSTEM (Cody)

### Problem: Wave System Creates Dead Time

Current:
```javascript
function spawnWave() {
  // Spawns 6-10 enemies
  // Player kills them
  // Waits 15s for next wave ❌
}
```

### Solution: Timeline-Based Continuous Spawning

**Implementation:**

```javascript
const SPAWN_TIMELINE = [
  // time_start, time_end, spawn_interval, enemy_types
  { start: 0,   end: 60,   interval: 2.0, types: ['zombie'] },
  { start: 60,  end: 120,  interval: 1.5, types: ['zombie', 'spectre', 'cultist'] },
  { start: 120, end: 180,  interval: 1.2, types: ['spectre', 'cultist', 'vampire'] },
  { start: 180, end: 330,  interval: 1.0, types: ['cultist', 'vampire', 'wraith'] },
  { start: 330, end: 540,  interval: 0.8, types: ['vampire', 'wraith', 'corrupted_knight'] },
  { start: 540, end: 900,  interval: 1.0, types: ['wraith', 'corrupted_knight', 'warden'] }
];

const BOSS_SCHEDULE = [
  { time: 120, type: 'shadow_lord' },   // 2:00
  { time: 330, type: 'void_rift' },     // 5:30
  { time: 870, type: 'ancient_one' }    // 14:30
];

function getCurrentPhase(gameTime) {
  return SPAWN_TIMELINE.find(p => 
    gameTime >= p.start && gameTime < p.end
  );
}

function tickSpawn(dt) {
  const phase = getCurrentPhase(gameState.gameTime);
  if (!phase) return;
  
  // Pause spawning if boss above 50% HP
  const boss = gameState.enemies.find(e => e.isBoss && e.alive);
  if (boss && boss.health > boss.maxHealth * 0.5) return;
  
  gameState.spawnTimer += dt;
  if (gameState.spawnTimer >= phase.interval) {
    const type = phase.types[Math.floor(Math.random() * phase.types.length)];
    spawnEnemy(type);
    gameState.spawnTimer = 0;
  }
}

function checkBossSpawn() {
  BOSS_SCHEDULE.forEach(boss => {
    const timeDiff = Math.abs(gameState.gameTime - boss.time);
    if (timeDiff < 0.1 && !gameState.bossSpawned[boss.type]) {
      spawnBoss(boss.type);
      gameState.bossSpawned[boss.type] = true;
      triggerScreenShake(20);
    }
  });
}

// Add to gameLoop()
function gameLoop(dt) {
  // ...
  tickSpawn(dt);
  checkBossSpawn();
  // ...
}
```

**Cody Tasks:**
1. Replace `spawnWave()` with `tickSpawn()`
2. Add `SPAWN_TIMELINE` constant
3. Add `BOSS_SCHEDULE` constant
4. Implement `checkBossSpawn()`
5. Test: Play 5 minutes, ensure no dead time

**Success Criteria:**
- Enemies spawn continuously
- No waiting between action
- Difficulty ramps smoothly
- Bosses appear at exact times

---

## 🌍 TASK 3: PROCEDURAL WORLD GENERATION (Cody)

### Problem: Empty World, Static Loot

Current:
- World generates once at start
- Loot spawns only initially
- 90% of map is empty

### Solution: Dynamic Sector-Based Generation

**Implementation:**

```javascript
class WorldGenerator {
  constructor() {
    this.sectors = new Map();
    this.sectorSize = 200; // pixels
  }
  
  getSectorKey(x, y) {
    const sx = Math.floor(x / this.sectorSize);
    const sy = Math.floor(y / this.sectorSize);
    return `${sx}_${sy}`;
  }
  
  generateSector(x, y) {
    const key = this.getSectorKey(x, y);
    if (this.sectors.has(key)) return;
    
    const sector = {
      objects: [],
      loot: [],
      biome: this.determineBiome(x, y)
    };
    
    // Generate environmental objects
    const objCount = 3 + Math.floor(Math.random() * 5);
    for (let i = 0; i < objCount; i++) {
      const obj = this.createEnvironmentObject(sector.biome, x, y);
      sector.objects.push(obj);
    }
    
    // Spawn some loot
    if (Math.random() < 0.3) {
      const loot = this.createLoot(x, y);
      sector.loot.push(loot);
    }
    
    this.sectors.set(key, sector);
  }
  
  determineBiome(x, y) {
    // Use noise or simple rules
    const noiseVal = (Math.sin(x * 0.01) + Math.cos(y * 0.01)) / 2;
    
    if (noiseVal < -0.3) return 'lava';
    if (noiseVal < 0.2) return 'stone';
    if (noiseVal < 0.6) return 'grass';
    return 'ruins';
  }
  
  createEnvironmentObject(biome, baseX, baseY) {
    const offsetX = (Math.random() - 0.5) * this.sectorSize;
    const offsetY = (Math.random() - 0.5) * this.sectorSize;
    
    const types = {
      lava:  ['rock', 'scorched_earth', 'magma_pool'],
      stone: ['boulder', 'stone_pillar', 'rubble'],
      grass: ['tree', 'bush', 'small_rock'],
      ruins: ['column', 'broken_statue', 'sarcophagus']
    };
    
    const availableTypes = types[biome] || types.stone;
    const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    
    return {
      type,
      x: baseX + offsetX,
      y: baseY + offsetY,
      sprite: `env_${type}`
    };
  }
  
  createLoot(x, y) {
    return {
      type: 'soul',
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100
    };
  }
  
  update(playerX, playerY) {
    // Generate sectors around player
    const radius = 2; // sectors
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const x = playerX + dx * this.sectorSize;
        const y = playerY + dy * this.sectorSize;
        this.generateSector(x, y);
      }
    }
  }
}

// Add to game state
const worldGen = new WorldGenerator();

// Call in gameLoop
worldGen.update(player.position.x, player.position.y);
```

**Environmental Object Rules:**
- **Lava biome:** rocks, scorched earth, no grass
- **Grass biome:** trees, bushes, occasional rocks
- **Stone biome:** boulders, pillars, rubble
- **Ruins biome:** columns, broken statues, sarcophagi

**Cody Tasks:**
1. Create `WorldGenerator` class
2. Implement biome system
3. Add object spawning logic
4. Render environmental objects
5. Add collision for large objects (optional)

**Success Criteria:**
- World feels full
- Objects placed logically
- Performance: 60 FPS with 100+ objects
- No large empty areas

---

## 🔧 TASK 4: BALANCE & POLISH (Cody)

### Enemy Stats Update

```javascript
const ENEMY_DEFS = {
  zombie:    { hp: 18,  dmg: 4,  speed: 75,  hitbox: 16 },
  spectre:   { hp: 14,  dmg: 5,  speed: 130, hitbox: 14 },
  cultist:   { hp: 20,  dmg: 6,  speed: 95,  hitbox: 15 },
  vampire:   { hp: 45,  dmg: 11, speed: 110, hitbox: 20 },
  wraith:    { hp: 40,  dmg: 10, speed: 125, hitbox: 18 },
  corrupted_knight: { hp: 55, dmg: 13, speed: 60, hitbox: 24 },
  warden:    { hp: 48,  dmg: 12, speed: 95, hitbox: 22 }
};

const BOSS_DEFS = {
  shadow_lord: { hp: 120, dmg: 18, speed: 90, hitbox: 32 },
  void_rift:   { hp: 180, dmg: 24, speed: 80, hitbox: 32 },
  ancient_one: { hp: 400, dmg: 35, speed: 85, hitbox: 32 }
};
```

### Hitbox Fix

Current issue: Enemies have tiny hitboxes → attacks miss

**Fix in Enemy class:**
```javascript
class Enemy {
  constructor(type, x, y, isBoss = false) {
    // ...
    const def = isBoss ? BOSS_DEFS[type] : ENEMY_DEFS[type];
    this.hitRadius = def.hitbox || 16; // Use explicit hitbox size
  }
}
```

### Player Damage Formula

```javascript
getDamageMultiplier() {
  let mult = 1 + (this.level - 1) * 0.05; // 5% per level
  mult *= this.bonusDamageMult; // From upgrades
  if (this.killStreakActive) mult += 0.15; // Rogue bonus
  return mult;
}
```

### Performance Checks

**Cody must verify:**
- FPS stays above 50 with 100+ entities
- No memory leaks (run 15 min, check RAM)
- Collision detection efficient
- Sprite rendering optimized

**Optimizations if needed:**
- Cull off-screen entities
- Pool particle objects
- Cache sprite frames

---

## 📋 EXECUTION ORDER

**Many orchestrates in this sequence:**

### Week 1: Visuals
1. **Day 1-2:** Dali creates all sprite sheets (15 files)
2. **Day 2-3:** Sonic creates animation JSONs (14 files)
3. **Day 3-4:** Cody integrates sprites + tileset

### Week 2: Gameplay
4. **Day 5:** Cody implements timeline spawn system
5. **Day 6:** Cody adds boss schedule
6. **Day 7:** Cody implements world generator

### Week 3: Polish
7. **Day 8:** Cody updates balance (HP/DMG/hitboxes)
8. **Day 9:** Testing & bug fixes
9. **Day 10:** Final polish & performance

---

## ✅ SUCCESS CRITERIA

**Game is "done" when:**

### Visual ✅
- [x] Pixel art characters visible (not circles)
- [x] All enemies have sprites
- [x] Bosses look intimidating
- [x] Environment has variety (rocks, columns, etc.)
- [x] Map uses tileset (not gradient)

### Gameplay ✅
- [x] 15-minute playtime
- [x] Continuous enemy spawning (no dead time)
- [x] 3 bosses appear at scheduled times
- [x] World feels full (objects + loot everywhere)
- [x] Difficulty ramps smoothly

### Technical ✅
- [x] 60 FPS with 100+ entities
- [x] No console errors
- [x] No crashes after 15+ min
- [x] Mobile-friendly (1000x600 canvas)

### Fun ✅
- [x] Player wants to replay
- [x] Different characters feel unique
- [x] Progression is satisfying
- [x] Boss fights are memorable

---

## 🚨 COMMON ISSUES & FIXES

**"Sprites show as circles"**
→ Check browser console for 404 errors  
→ Verify sprite paths match filenames  
→ Ensure PNGs uploaded to `sprites/` folder

**"Enemies spawn too fast/slow"**
→ Adjust `interval` in `SPAWN_TIMELINE`  
→ Test with different values (0.5-2.0 sec)

**"World generation lags"**
→ Reduce sector generation radius  
→ Cache generated sectors  
→ Limit objects per sector to 5-8

**"Hitboxes still feel wrong"**
→ Increase `hitRadius` values in ENEMY_DEFS  
→ Draw debug circles (hitbox visualization)  
→ Test with playtesters

---

## 📞 AGENT COMMUNICATION

**Many's responsibilities:**
1. Assign tasks to Dali, Sonic, Cody in correct order
2. Verify each phase complete before next
3. Test integration points
4. Report blockers immediately

**Expected outputs:**
- Dali: 15 PNG files in `sprites/`
- Sonic: 14 JSON files in `animations/`
- Cody: Updated `game.js` (functional changes)

**Status reporting format:**
```
✅ Phase 1A Complete: All sprite sheets created
⏳ Phase 1B In Progress: Sonic creating animation JSONs (8/14 done)
❌ Phase 1C Blocked: Waiting for Sonic completion
```

---

**END OF MASTER PROMPT**

Many: Read this guide, understand priorities, execute phases in order. Ask questions if anything unclear. Goal = ship playable game in 2-3 weeks. Let's go! 🚀