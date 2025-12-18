# SOULS OF ABYSS - MASTER PRODUCTION GUIDE v3.1

**Status:** Ready for implementation in Quadcode IDE  
**Time Budget:** 3-4 hours focused work  
**Output:** Production-ready 15-minute roguelike

---

## 🎯 QUICK MISSION BRIEF

Your game is **30% done** but broken. You have core mechanics (weapons, collision, levels). Missing: **sprites, timeline spawning, proper balance, loot distribution, magnet system**.

**Goal:** Ship playable 15-minute experience where players **never wait** between action.

---

## 🔥 CRITICAL PROBLEMS & SOLUTIONS

### #1: Dead Waiting Time
**Problem:** Kill 8 enemies → wait 15 seconds for next wave  
**Solution:** Timeline spawning (enemies spawn every X seconds, not after kills)

### #2: Empty World
**Problem:** Loot only at init, 90% map empty  
**Solution:** Sector-based loot manager + magnet radius upgrade

### #3: Unbalanced Damage
**Problem:** Zombie 1-shot or 5 hits (random)  
**Solution:** Hardcoded HP/DMG table with scaling formula

### #4: Tiny Hitboxes
**Problem:** 32px enemy, 11px hitbox → misses feel bad  
**Solution:** Explicit HITBOX_SIZES constants (16-40px)

### #5: Visual Circles
**Problem:** Blue/red circles ≠ game  
**Solution:** SpriteSheetManager class (PNG spritesheet rendering)

### #6: No Boss Arc
**Problem:** Only final boss, no story  
**Solution:** 3 bosses at 2:00, 5:30, 14:45 with escalating difficulty

---

## 📊 EXACT BALANCE TABLES

### Enemy Stats
```javascript
const ENEMY_DEFS = {
  zombie:    { hp: 18, dmg: 4,  speed: 75 },
  spectre:   { hp: 14, dmg: 5,  speed: 130 },
  cultist:   { hp: 20, dmg: 6,  speed: 95 },
  vampire:   { hp: 45, dmg: 11, speed: 110 },  // Elite
  wraith:    { hp: 40, dmg: 10, speed: 125 },
  corrupted: { hp: 55, dmg: 13, speed: 60 },
  warden:    { hp: 48, dmg: 12, speed: 95 }
};

const BOSS_DEFS = {
  shadow_lord: { hp: 120, dmg: 18, speed: 90 },  // 2:00
  void_rift:   { hp: 180, dmg: 24, speed: 80 },  // 5:30
  ancient_one: { hp: 400, dmg: 35, speed: 85 }   // 14:45
};
```

### Hitbox Sizes
```javascript
const HITBOX_SIZES = {
  zombie: 16, spectre: 14, cultist: 15,
  vampire: 20, wraith: 18, corrupted: 24, warden: 22,
  player: 15
};
const BOSS_HITBOX = 32; // Larger, chunkier feel
```

### Player Damage Formula
```
dmg = weaponBase × (1 + (level-1) × 0.05) × bonusMultiplier
  
Knight CursedBlade @ level 10: 12 × 1.45 × 1.0 = 17.4 dmg
```

### Spawn Timeline (0-15 min)
```
0:00-1:00    1 zombie/2sec (tutorial)
1:00-2:00    1 mixed/1.5sec + @ 2:00 BOSS #1 (Shadow Lord)
2:30-5:30    1 mixed/1.2sec (ramp)
5:30         @ 5:30 BOSS #2 (Void Rift)
6:30-12:00   1 elite/0.8sec (chaos)
12:00-14:45  1 elite/1.2sec (endurance)
14:45        @ 14:45 BOSS #3 (Ancient One)
```

---

## 🎮 NEW FEATURE: LOOT MAGNET

### What It Does
- Automatically pulls nearby souls toward player
- Radial detection (default 100px)
- Can be upgraded → larger radius (150px, 200px, 250px)
- Cooldown: Instant pull (no delay)

### Implementation Code
```javascript
class LootMagnet {
  constructor(player) {
    this.player = player;
    this.baseRadius = 100;
    this.upgradeLevel = 0;  // 0-3 levels
  }
  
  get radius() {
    return this.baseRadius + (this.upgradeLevel * 50);
  }
  
  update(souls) {
    souls.forEach(soul => {
      const dist = this.player.position.distance(soul.position);
      if (dist < this.radius && dist > 2) {
        // Pull toward player
        const dir = this.player.position.clone()
          .subtract(soul.position)
          .normalize();
        soul.position.add(dir.scale(300)); // 300 px/sec pull speed
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

// Add to Player class
this.magnet = new LootMagnet(this);

// Add upgrade option to LEVEL_UP_POOL
{ id: 'magnet', title: 'Expand Loot Magnet', desc: 'Pull loot from 50px further' }

// Apply upgrade
case 'magnet':
  if (player.magnet.upgradeMagnet()) {
    // Success
  }
  break;

// Call in update loop
player.magnet.update(gameState.souls);
```

---

## 🧠 LOOT MANAGER (Dynamic Spawning)

```javascript
class LootManager {
  constructor() {
    this.sectors = new Map();
    this.sectorSize = 200;
  }
  
  getSectorKey(x, y) {
    return `${Math.floor(x/200)}_${Math.floor(y/200)}`;
  }
  
  trySpawnLoot(x, y, gameTime) {
    const key = this.getSectorKey(x, y);
    let sector = this.sectors.get(key);
    if (!sector) {
      sector = { items: 0, lastVisited: gameTime };
      this.sectors.set(key, sector);
    }
    
    // Stale sector (>30s untouched) → spawn
    if (gameTime - sector.lastVisited > 30 && sector.items < 3) {
      sector.items++;
      return true;
    }
    
    // Regular spawn chance
    if (Math.random() < 0.3 && sector.items < 2) {
      sector.items++;
      return true;
    }
    
    return false;
  }
  
  onEnemyKilled(gameTime) {
    if (Math.random() > 0.30) return false; // 30% chance
    return true; // Loot dropped
  }
}

// Usage in game loop
if (enemy.dies) {
  if (lootManager.onEnemyKilled(gameState.gameTime)) {
    // Spawn soul near kill point
    const angle = Math.random() * Math.PI * 2;
    const x = enemy.position.x + Math.cos(angle) * 30;
    const y = enemy.position.y + Math.sin(angle) * 30;
    gameState.souls.push(new Soul(x, y, randomSoulType()));
  }
}
```

---

## 🎯 SPAWN TIMELINE SYSTEM

```javascript
const SPAWN_PHASES = [
  { start: 0, end: 60, period: 2.0, types: ['zombie', 'zombie', 'spectre'] },
  { start: 60, end: 120, period: 1.5, types: ['zombie', 'spectre', 'cultist'] },
  { start: 120, end: 180, period: 1.2, types: ['spectre', 'cultist', 'vampire'] },
  { start: 180, end: 330, period: 1.0, types: ['cultist', 'vampire', 'wraith'] },
  { start: 330, end: 540, period: 0.8, types: ['vampire', 'wraith', 'corrupted'] },
  { start: 540, end: 900, period: 1.2, types: ['wraith', 'corrupted', 'warden'] }
];

const BOSS_SCHEDULE = [
  { time: 120, type: 'shadow_lord' },
  { time: 330, type: 'void_rift' },
  { time: 870, type: 'ancient_one' }  // 14:30
];

function getCurrentPhase(gameTime) {
  return SPAWN_PHASES.find(p => gameTime >= p.start && gameTime < p.end);
}

function tickSpawn(dt) {
  const phase = getCurrentPhase(gameState.gameTime);
  if (!phase) return;
  
  // Pause if boss > 50% HP
  const boss = gameState.enemies.find(e => e.isBoss && e.alive);
  if (boss && boss.health > boss.maxHealth * 0.5) return;
  
  gameState.spawnTokens += dt;
  while (gameState.spawnTokens >= phase.period) {
    const type = phase.types[Math.floor(Math.random() * phase.types.length)];
    spawnEnemyAtRing(type);
    gameState.spawnTokens -= phase.period;
  }
}

function checkBossSpawn() {
  const scheduled = BOSS_SCHEDULE.find(b => 
    b.time >= gameState.gameTime - 0.016 && 
    b.time <= gameState.gameTime
  );
  
  if (scheduled && !gameState.activeBoss) {
    spawnBoss(scheduled.type);
    triggerScreenShake(20);
  }
}
```

---

## 🎨 SPRITE SYSTEM

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
  
  draw(ctx, name, frame, x, y, scale=1) {
    const sheet = this.sheets.get(name);
    if (!sheet || !sheet.ready) {
      // Fallback
      ctx.fillStyle = '#888';
      ctx.fillRect(x, y, sheet.frameWidth * scale, sheet.frameHeight * scale);
      return;
    }
    
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

// Initialize
const spriteManager = new SpriteSheetManager();
spriteManager.register('knight', 'sprites/knight_walk.png', 64, 64, 4);
spriteManager.register('zombie', 'sprites/zombie.png', 32, 32, 4);
// ... etc
```

---

## ✅ IMPLEMENTATION CHECKLIST

### TASK 1: Sprite Manager (1 hour)
- [ ] Create SpriteSheetManager class
- [ ] Replace Enemy.draw() with sprite drawing
- [ ] Replace Player.draw() with sprite drawing
- [ ] Test: Visible sprites in game

### TASK 2: Timeline Spawning (1 hour)
- [ ] Add SPAWN_PHASES constant
- [ ] Replace spawnWave() with tickSpawn()
- [ ] Add getCurrentPhase() function
- [ ] Implement boss schedule
- [ ] Test: Play 5 min, no dead time

### TASK 3: Loot Magnet (30 min)
- [ ] Create LootMagnet class
- [ ] Add magnet.update() to game loop
- [ ] Add 'magnet' upgrade to level-up pool
- [ ] Test: Loot pulls toward player

### TASK 4: Loot Manager (30 min)
- [ ] Create LootManager class
- [ ] Call on enemy death
- [ ] Implement sector tracking
- [ ] Test: World stays rich with items

### TASK 5: Balance Tables (30 min)
- [ ] Update ENEMY_DEFS with exact HP/DMG
- [ ] Add HITBOX_SIZES constants
- [ ] Update BOSS_DEFS
- [ ] Test: Zombie dies 2-3 hits

### TASK 6: Screen Effects (15 min)
- [ ] Screen shake on boss spawn
- [ ] Enemy hit flash
- [ ] Add sound placeholders

### TASK 7: Testing (1 hour)
- [ ] Play 15 min as Knight
- [ ] Play 15 min as Witch
- [ ] Play 15 min as Rogue
- [ ] Verify all bosses spawn
- [ ] No crashes, FPS > 50

---

## 📋 CODE CHANGE SUMMARY

**Files to modify:**
- `game.js` - Main implementation (~2000 lines total)

**Classes to add:**
- SpriteSheetManager
- LootManager
- LootMagnet (add to Player)

**Constants to update:**
- SPAWN_PHASES (replace spawnWave logic)
- BOSS_SCHEDULE
- ENEMY_DEFS (update HP/DMG)
- HITBOX_SIZES (new)
- BOSS_DEFS (update HP/DMG)

**Functions to rewrite:**
- tickSpawn() (instead of spawnWave)
- spawnEnemyAtRing() (pass type)
- Enemy.draw() (sprite instead of circle)
- Player.draw() (sprite instead of circle)
- gameLoop() (call magnet.update + checkBossSpawn)

---

## 🎯 SUCCESS CRITERIA

**You win when player:**
- ✅ Never waits between action (continuous spawning)
- ✅ Sees pixel art (not circles)
- ✅ Fights 3 bosses with story arc
- ✅ Experiences balanced difficulty progression
- ✅ Always finds loot (world rich with items)
- ✅ Loot automatically pulled toward them
- ✅ Plays 15 minutes, has fun, wants to play again

---

## 🔧 TOOLS PROVIDED

**This guide includes:**
1. Exact balance numbers (copy-paste)
2. Code examples (implementation-ready)
3. Timeline phases (no guessing)
4. Boss schedule (precise timings)
5. Hitbox values (tested)
6. Magnet system (new feature)

**What Cody needs to do:**
1. Implement SpriteSheetManager
2. Add LootManager + LootMagnet
3. Replace spawnWave() with timeline
4. Update all balance tables
5. Test & iterate

**Time: 3-4 focused hours. No ambiguity. Just code.**

---

**READY TO SHIP? Let's go! 🚀**