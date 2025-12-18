# SOULS OF ABYSS - Master Orchestration Guide for Many

**Version:** 2.1  
**Target Agent:** Many (Team Leader)  
**Project Type:** Top-down dark fantasy roguelike (Vampire Survivors / Halls of Torment style)  
**Timeline:** 15-minute max playtime  
**Current Status:** Prototype working but needs visual/gameplay polish

---

## 📚 REQUIRED READING

**Before starting any task, all agents MUST read:**
- **`GAME_DESIGN.md`** - Complete game specifications, visual style, enemy stats, timeline, biome rules

This master prompt explains **HOW** to execute. `GAME_DESIGN.md` explains **WHAT** to build.

---

## 🎯 PROJECT GOAL

Transform the current prototype into a **polished, playable game** with:
- Real pixel art sprites (characters, mobs, bosses, environment)
- Dark fantasy atmosphere (see `GAME_DESIGN.md` for palette)
- Continuous action (no waiting between waves)
- Smart procedural generation (4 biomes)
- Balanced 15-minute gameplay loop (3 boss encounters)

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

**⚠️ Dali MUST read `GAME_DESIGN.md` sections:**
- "PLAYABLE CHARACTERS" (Knight, Witch, Rogue descriptions)
- "ENEMIES" (all 10 enemy types)
- "VISUAL STYLE GUIDE" (color palette, pixel art specs)
- "SETTING & ATMOSPHERE" (dark fantasy theme)

**Style Requirements (from GAME_DESIGN.md):**
- 16-bit/32-bit pixel art aesthetic
- Max 32 colors per sprite
- Dark fantasy palette: #0d0c14, #4e5b6e, #b21f35, #4db1e8, etc.
- Clear silhouettes for gameplay readability
- Transparent backgrounds

**Required Sprite Sheets (15 files):**

See `GAME_DESIGN.md` for detailed descriptions of each character/enemy.

#### Characters (3 files)
1. `sprites/knight.png` - 256x64px (4 frames idle) - Armored warrior, sword & shield
2. `sprites/witch.png` - 256x64px (4 frames idle) - Levitating sorceress with staff
3. `sprites/rogue.png` - 128x64px (2 frames idle) - Hooded assassin crouching

#### Regular Enemies (3 files)
4. `sprites/zombie.png` - 64x32px (2 frames walk) - Rotting corpse, green skin
5. `sprites/spectre.png` - 64x32px (2 frames float) - Translucent ghost with chains
6. `sprites/cultist.png` - 64x32px (2 frames walk) - Purple robes, skull mask

#### Elite Enemies (4 files)
7. `sprites/vampire.png` - 120x40px (3 frames) - Pale skin, crimson coat
8. `sprites/wraith.png` - 120x40px (3 frames) - Black smoke, skull face, scythe
9. `sprites/corrupted_knight.png` - 96x48px (2 frames) - Rusted armor, red eyes
10. `sprites/warden.png` - 120x40px (3 frames) - Stone golem with runes

#### Bosses (3 files)
11. `sprites/shadow_lord.png` - 192x96px (2 frames) - Towering armored, greataxe
12. `sprites/void_rift.png` - 288x96px (3 frames) - Swirling black hole
13. `sprites/ancient_one.png` - 192x96px (2 frames) - Lovecraftian tentacles

#### Environment & Effects (2 files)
14. `sprites/particles.png` - 96x16px (6 types: slash, explosion, spark, blood, glow, lifesteal)
15. `sprites/tileset.png` - 512x512px organized in 32x32px tiles:
    - **Row 1:** Stone floor, cracked stone, rubble
    - **Row 2:** Dead grass, dirt, moss
    - **Row 3:** Lava, scorched earth, magma glow
    - **Row 4:** Broken tiles, blood stains, bones
    - **Row 5-8:** Objects (rocks, columns, braziers, trees, sarcophagi)

**Dali Success Criteria:**
- All 15 PNG files created
- Matches descriptions in `GAME_DESIGN.md`
- Correct dimensions
- Transparent backgrounds
- Frames aligned horizontally

---

### Phase 1B: Sonic Creates Animation Specs

**⚠️ Sonic MUST read `GAME_DESIGN.md` sections:**
- "VISUAL STYLE GUIDE" (animation timing guidelines)

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
    }
  }
}
```

**Critical:** `frameTime` in **SECONDS** (not milliseconds)

**Timing from GAME_DESIGN.md:**
- Fast (attack): 0.06-0.10 sec/frame
- Medium (run): 0.10-0.15 sec/frame
- Slow (idle): 0.25-0.40 sec/frame

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

**Sonic Success Criteria:**
- Valid JSON
- frameTime in seconds
- frameCount matches sprite frames

---

### Phase 1C: Cody Integrates Sprites

**⚠️ Cody MUST read `GAME_DESIGN.md` sections:**
- "TECHNICAL CONSTRAINTS" (performance targets)

**Tasks:**

1. **Verify Sprite Loading**
   - Test all 15 PNG files load correctly
   - Add console logging: `console.log('✅ Loaded:', spriteName)`
   - Handle 404 errors gracefully

2. **Replace Fallback Rendering**
   - Keep circle fallback but ensure sprites load
   - Update `Enemy.draw()` and `Player.draw()`

3. **Add Tileset Manager**
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

4. **Update Background Rendering**
   - Replace gradient with tileset
   - Use biome logic (prepare for Task 3)

**Cody Success Criteria:**
- Pixel art sprites visible in browser
- No console errors
- 60 FPS with 50+ entities

---

## ⚡ TASK 2: FIX SPAWN SYSTEM (Cody)

**⚠️ Cody MUST read `GAME_DESIGN.md` sections:**
- "GAME TIMELINE (15 Minutes)" - Complete spawn schedule
- "ENEMIES" - All enemy types and stats

### Problem: Wave System Creates Dead Time

Replace wave-based spawning with **timeline-based continuous spawning** as specified in `GAME_DESIGN.md`.

**Implementation:**

Use exact timeline from `GAME_DESIGN.md`:

```javascript
const SPAWN_TIMELINE = [
  { start: 0,   end: 60,   interval: 2.0, types: ['zombie'], maxAlive: 8 },
  { start: 60,  end: 120,  interval: 1.5, types: ['zombie', 'spectre', 'cultist'], maxAlive: 12 },
  { start: 120, end: 180,  interval: 1.2, types: ['spectre', 'cultist', 'vampire'], maxAlive: 15 },
  { start: 180, end: 330,  interval: 1.0, types: ['cultist', 'vampire', 'wraith'], maxAlive: 15 },
  { start: 330, end: 540,  interval: 0.8, types: ['vampire', 'wraith', 'corrupted_knight'], maxAlive: 20 },
  { start: 540, end: 900,  interval: 1.0, types: ['wraith', 'corrupted_knight', 'warden'], maxAlive: 18 }
];

const BOSS_SCHEDULE = [
  { time: 120, type: 'shadow_lord' },   // 2:00
  { time: 330, type: 'void_rift' },     // 5:30
  { time: 870, type: 'ancient_one' }    // 14:30
];
```

**Boss Spawn Rule:** Pause regular spawns when boss HP > 50%

**Cody Tasks:**
1. Replace `spawnWave()` with `tickSpawn()`
2. Implement `checkBossSpawn()`
3. Add difficulty scaling (1.0 → 4.0 over 15 min)
4. Test: No dead time in 5-minute playthrough

---

## 🌍 TASK 3: PROCEDURAL WORLD GENERATION (Cody)

**⚠️ Cody MUST read `GAME_DESIGN.md` sections:**
- "WORLD GENERATION" - Complete biome specs
- "SETTING & ATMOSPHERE" - Visual theme

### Problem: Empty World

Implement **sector-based generation** with 4 biomes from `GAME_DESIGN.md`:

**Biome Rules (from GAME_DESIGN.md):**
- **Lava:** rocks, magma pools, scorched earth, NO grass
- **Stone:** pillars, boulders, rubble, altars
- **Grass:** dead trees, bushes, small rocks, bones
- **Ruins:** columns, broken statues, sarcophagi, symmetrical layout

**Implementation:**

```javascript
class WorldGenerator {
  determineBiome(x, y) {
    const noiseVal = (Math.sin(x * 0.01) + Math.cos(y * 0.01)) / 2;
    
    if (noiseVal < -0.3) return 'lava';
    if (noiseVal < 0.2) return 'stone';
    if (noiseVal < 0.6) return 'grass';
    return 'ruins';
  }
  
  createEnvironmentObject(biome, baseX, baseY) {
    // Use object types from GAME_DESIGN.md biome definitions
    const types = {
      lava:  ['rock', 'scorched_earth', 'magma_pool', 'steam_vent'],
      stone: ['pillar', 'boulder', 'rubble', 'altar'],
      grass: ['dead_tree', 'bush', 'small_rock', 'bones'],
      ruins: ['column', 'broken_statue', 'sarcophagus', 'coffin']
    };
    // ...
  }
}
```

**Cody Tasks:**
1. Implement `WorldGenerator` with 4 biomes
2. Add object spawning (3-8 per sector)
3. Render objects with tileset
4. Optional: Add collision for large objects

---

## 🔧 TASK 4: BALANCE & POLISH (Cody)

**⚠️ Cody MUST use exact stats from `GAME_DESIGN.md` "ENEMIES" section.**

### Update Enemy Stats

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

### Performance Verification

**From GAME_DESIGN.md "TECHNICAL CONSTRAINTS":**
- 60 FPS minimum
- Max 150 entities on screen
- No memory leaks in 15-min run

---

## 📋 EXECUTION ORDER

**Many orchestrates:**

### Week 1: Visuals
1. **Day 1-2:** Dali creates sprites (read `GAME_DESIGN.md` first!)
2. **Day 2-3:** Sonic creates animations
3. **Day 3-4:** Cody integrates sprites

### Week 2: Gameplay
4. **Day 5:** Cody implements timeline spawn (exact schedule from GDD)
5. **Day 6:** Cody adds boss schedule
6. **Day 7:** Cody implements world generator (4 biomes)

### Week 3: Polish
7. **Day 8:** Cody updates balance (use GDD stats)
8. **Day 9:** Testing
9. **Day 10:** Final polish

---

## ✅ SUCCESS CRITERIA

**Game is "done" when it matches `GAME_DESIGN.md` specifications:**

### Visual ✅
- Pixel art matches GDD descriptions
- 4 biomes visible
- Objects placed per biome rules

### Gameplay ✅
- 15-minute playtime
- Timeline spawn (no dead time)
- 3 bosses at exact times (2:00, 5:30, 14:30)
- Difficulty scaling (1.0 → 4.0)

### Technical ✅
- 60 FPS with 150 entities
- No crashes

---

## 📞 AGENT COMMUNICATION

**Many's checklist before assigning tasks:**
1. ✅ Agent read `GAME_DESIGN.md` relevant sections?
2. ✅ Agent has clear success criteria?
3. ✅ Dependencies complete (Dali → Sonic → Cody)?

**Status reporting:**
```
✅ Phase 1A Complete: Sprites match GDD specs
⏳ Phase 1B In Progress: 8/14 JSONs done
❌ Phase 1C Blocked: Waiting for Sonic
```

---

**END OF MASTER PROMPT**

**Many:** Before starting, ensure all agents have read `GAME_DESIGN.md`. That document is the source of truth. This prompt is your execution guide. Let's ship! 🚀