# SOULS OF ABYSS - Game Design Document

**Version:** 1.0  
**Genre:** Top-down roguelike survivor  
**Style:** Dark fantasy pixel art  
**References:** Vampire Survivors, Halls of Torment, Hades  
**Target Platform:** Web (Desktop + Mobile)  
**Playtime:** 15 minutes per run

---

## 🎮 CORE CONCEPT

**Elevator Pitch:**  
Survive 15 minutes in a cursed dungeon, fighting endless waves of monsters. Level up, unlock weapons, and defeat three powerful bosses before facing the Ancient One.

**Core Loop:**
1. Kill enemies → Collect souls
2. Gain XP → Level up → Choose upgrades
3. Unlock new weapons → Increase power
4. Survive bosses → Reach final encounter

---

## 🌍 SETTING & ATMOSPHERE

### World
**The Abyss** - An endless cursed dungeon beneath a forgotten kingdom. The ground shifts between:
- Cracked stone floors (ancient temple ruins)
- Patches of dead grass (overgrown courtyards)  
- Lava pools (volcanic chambers)
- Bone-strewn earth (catacombs)

### Visual Theme
- **Color Palette:** Dark purples, grays, blood reds, sickly greens, dim blues
- **Lighting:** Low-light atmosphere, torches/braziers as light sources
- **Architecture:** Gothic ruins, broken columns, sarcophagi, altars
- **Atmosphere:** Oppressive, haunted, souls trapped between life and death

### Audio (Future)**
- Ambient: Echoing drips, distant groans, wind through ruins
- Combat: Visceral hits, magical whooshes, enemy death screams
- Music: Dark orchestral with choir, boss themes intensify

---

## 👤 PLAYABLE CHARACTERS

### Knight - "The Bulwark"
**Playstyle:** Melee tank, close-range dominance  
**Stats:**
- HP: 100 (highest)
- Damage: 12
- Speed: 200 (medium)
- Armor: 5 (reduces incoming damage)
- Starting Weapon: Cursed Blade (cone melee)

**Identity:**
- Heavy armor, sword & shield
- Gains +1 armor per level
- Best for new players
- Theme: Undying protector

**Visual:**
- Full plate armor (dark iron/steel)
- Large sword, kite shield
- Flowing tattered cape
- Glowing blue aura

---

### Witch - "The Voidcaller"
**Playstyle:** Ranged caster, high damage glass cannon  
**Stats:**
- HP: 70 (lowest)
- Damage: 8 (+ high spell multipliers)
- Speed: 180
- Armor: 2
- Starting Weapon: Chaos Orb (projectile)

**Identity:**
- Levitates above ground
- High burst damage
- Fragile but deadly
- Theme: Forbidden magic user

**Visual:**
- Hooded robes (purple/black)
- Glowing staff with crystal
- Levitating 5px off ground
- Purple aura with sparks

---

### Rogue - "The Shadowblade"
**Playstyle:** Fast assassin, dodge-focused  
**Stats:**
- HP: 85
- Damage: 10
- Speed: 250 (fastest)
- Armor: 3
- Dodge Chance: 10%
- Starting Weapon: Soulreaver Dagger (multi-hit melee)

**Identity:**
- Kill streak system (bonus damage after 5+ kills)
- High mobility
- Risk/reward playstyle
- Theme: Death's shadow

**Visual:**
- Black leather armor
- Dual daggers
- Hood concealing face
- Red/orange aura
- Shadow trail when moving

---

## ⚔️ WEAPON SYSTEM

### Weapon Categories

**Auto Weapons** (fire automatically):
1. **Cursed Blade** - Cone melee slash
2. **Shatterburst Axe** - AoE explosion around player
3. **Soulreaver Dagger** - Multi-hit rapid strikes
4. **Eternal Halberd** - Large sweeping arc with pull
5. **Chaos Orb** - Projectile with spread
6. **Reaper's Scythe** - 360° spin attack
7. **Bloodmoon Lance** - Directional beam with lifesteal

**Manual Weapon** (player activated):
8. **Godsayer Sword** - Ultimate ability, costs essence charges

### Weapon Progression
- Start with 1 weapon (class-specific)
- Unlock new weapons at levels 3, 6, 9, 12, 15, 18
- Each weapon has unique VFX (slash arcs, explosions, beams)
- Upgrades: +15% damage, +10% fire rate, +range

---

## 👾 ENEMIES

### Enemy Tiers

#### Regular (Common)
Spawn frequently, weak individually, dangerous in groups

**Zombie**
- HP: 18 | DMG: 4 | Speed: 75
- Behavior: Slow walk toward player
- Visual: Rotting corpse, torn clothing, green skin
- Soul Drop: Ethereal (10 XP)

**Spectre**
- HP: 14 | DMG: 5 | Speed: 130
- Behavior: Float in spiral pattern
- Visual: Translucent ghost, chains, floating
- Soul Drop: Ethereal (10 XP)

**Cultist**
- HP: 20 | DMG: 6 | Speed: 95
- Behavior: Walk toward player, raise staff to attack
- Visual: Purple robes, skull mask, ritual staff
- Soul Drop: Ethereal (10 XP)

---

#### Elite (Rare)
Spawn mid-game, much stronger, rewarding

**Vampire**
- HP: 45 | DMG: 11 | Speed: 110
- Behavior: Elegant movement, teleport dash
- Visual: Pale skin, crimson coat, fangs visible
- Soul Drop: Corrupted (20 XP) + Essence (30% chance)

**Wraith**
- HP: 40 | DMG: 10 | Speed: 125
- Behavior: Phase through obstacles, spiral movement
- Visual: Black smoke form, skull face, scythe
- Soul Drop: Corrupted (20 XP)

**Corrupted Knight**
- HP: 55 | DMG: 13 | Speed: 60
- Behavior: Slow but tanky, shield blocks some attacks
- Visual: Rusted dark armor, broken sword, glowing red eyes
- Soul Drop: Corrupted (20 XP)

**Warden**
- HP: 48 | DMG: 12 | Speed: 95
- Behavior: Patrol pattern, summons minions
- Visual: Stone golem with glowing runes, staff
- Soul Drop: Corrupted (20 XP)

---

### Boss Enemies

#### Shadow Lord (2:00)
**First Boss - Tutorial Challenge**
- HP: 120 | DMG: 18 | Speed: 90
- Size: 96x96px (large)
- Behavior:
  - Phase 1: Slow movement, predictable attacks
  - Phase 2 (50% HP): Faster attacks, summons spectres
- Visual: Towering armored figure, dark flames, greataxe
- Soul Drop: Cursed (50 XP) + guaranteed essence
- Arena Effect: Screen shake on hit

#### Void Rift (5:30)
**Second Boss - Mid-Game Spike**
- HP: 180 | DMG: 24 | Speed: 80
- Size: 96x96px
- Behavior:
  - Continuously rotates
  - Spawns void portals that shoot projectiles
  - Phase 2: More portals, faster rotation
- Visual: Swirling black hole with purple lightning
- Soul Drop: Cursed (50 XP) + 2 essence charges
- Arena Effect: Pulls player slightly toward center

#### Ancient One (14:30)
**Final Boss - Ultimate Challenge**
- HP: 400 | DMG: 35 | Speed: 85
- Size: 96x96px
- Behavior:
  - Tentacle sweep attacks (large hitbox)
  - Summons corrupted knights
  - Phase 2 (50% HP): Enraged, screen-wide attacks
  - Phase 3 (25% HP): Desperate, spawns multiple elites
- Visual: Lovecraftian horror, multiple eyes, writhing tentacles, cosmic glow
- Soul Drop: Cursed (50 XP) + 3 essence + game end
- Arena Effect: Heavy screen shake, reality distortion visual

---

## 📊 PROGRESSION SYSTEMS

### Experience & Leveling
- Souls give XP (10/20/50 depending on enemy tier)
- Level up every ~100 XP (scales 1.2x per level)
- Each level: +5 max HP, full heal
- Knight: +1 armor per level

### Level-Up Choices (Pick 1 of 3)
- **+15% Damage** - All weapons
- **+10% Move Speed** - Faster dodging
- **+1 Armor** - Reduce incoming damage
- **Heal 30% HP** - Emergency recovery
- **+1 Essence Charge** - More ultimate uses
- **+10% Fire Rate** - Auto weapons attack faster
- **Unlock Weapon** - New weapon (if available)
- **Expand Loot Magnet** - Pull souls from 50px further

### Essence System
- Collect 5 essence drops → 1 charge
- Spend charge → Use Godsayer Sword (100 damage AoE)
- Essence drops from:
  - Elites (30% chance)
  - Bosses (guaranteed)
  - Random world spawns (rare)

---

## 🗺️ WORLD GENERATION

### Biome System

**Lava Biome** (Hot zones)
- Tiles: Cracked stone, magma pools, scorched earth
- Objects: Volcanic rocks, steam vents, melted metal
- Lighting: Orange/red glow
- No grass or wood

**Stone Biome** (Temple ruins)
- Tiles: Stone floor, broken tiles, rubble
- Objects: Pillars, statues, altars, sarcophagi
- Lighting: Dim torchlight
- Gothic architecture

**Grass Biome** (Overgrown courtyards)
- Tiles: Dead grass, dirt paths, moss
- Objects: Dead trees, bushes, small rocks, bones
- Lighting: Moonlight filter
- Nature reclaiming ruins

**Ruins Biome** (Ancient halls)
- Tiles: Cracked marble, blood stains
- Objects: Broken columns, collapsed walls, coffins
- Lighting: Ghostly blue
- Most haunted feeling

### Procedural Generation Rules

**Sector-Based Generation:**
- World divided into 200x200px sectors
- Sectors generate as player approaches (2-sector radius)
- Each sector:
  - Biome determined by position (noise-based)
  - 3-8 environmental objects
  - 0-2 loot drops
  - Objects placed logically:
    - Lava biome: no grass/trees
    - Grass biome: no lava/magma
    - Ruins: grouped pillars/walls

**Object Placement Logic:**
```
IF biome = lava:
  objects = [rock, scorched_earth, magma_pool, steam_vent]
  spacing = wide (avoid clutter)
  
IF biome = grass:
  objects = [dead_tree, bush, small_rock, bones]
  clustering = medium (natural groups)
  
IF biome = stone:
  objects = [pillar, boulder, rubble, altar]
  alignment = grid-like (architectural)
  
IF biome = ruins:
  objects = [column, broken_statue, sarcophagus, coffin]
  arrangement = symmetrical (former temple layout)
```

**Collision:**
- Large objects (pillars, boulders) = solid (block movement)
- Small objects (bushes, rubble) = decorative (no collision)
- Player and enemies path around solids

---

## ⏱️ GAME TIMELINE (15 Minutes)

### Spawn Schedule

```
00:00 - 01:00  Tutorial
  Enemy: Zombie only
  Spawn Rate: 1 every 2 seconds
  Max Alive: 8
  Goal: Learn controls

01:00 - 02:00  Early Game
  Enemies: Zombie, Spectre, Cultist
  Spawn Rate: 1 every 1.5 seconds
  Max Alive: 12
  
02:00  BOSS: Shadow Lord
  Pause regular spawns above 50% boss HP
  Resume when boss below 50%

02:30 - 05:30  Ramp Up
  Enemies: Spectre, Cultist, Vampire (rare)
  Spawn Rate: 1 every 1.2 seconds
  Max Alive: 15
  
05:30  BOSS: Void Rift
  Pause regular spawns above 50% boss HP
  
06:00 - 12:00  Chaos
  Enemies: Cultist, Vampire, Wraith, Corrupted Knight
  Spawn Rate: 1 every 0.8 seconds
  Max Alive: 20
  Elite chance: 40%
  
12:00 - 14:30  Endurance
  Enemies: Vampire, Wraith, Corrupted Knight, Warden
  Spawn Rate: 1 every 1.0 seconds
  Max Alive: 18
  Elite chance: 60%
  
14:30  BOSS: Ancient One
  Pause regular spawns
  Summons adds during fight
  
15:00  Victory (if Ancient One defeated before timer)
```

### Difficulty Scaling
- Base difficulty multiplier: 1.0
- Increases by +0.01 every 6 seconds
- Max multiplier: 4.0 (at 15:00)
- Affects:
  - Enemy HP
  - Enemy damage
  - Spawn frequency (slightly)

---

## 🎨 VISUAL STYLE GUIDE

### Pixel Art Specifications

**Resolution:**
- Characters: 64x64px per frame
- Regular Enemies: 32x32px per frame
- Elite Enemies: 40x40px per frame
- Bosses: 96x96px per frame
- Tiles: 32x32px
- Particles: 16x16px

**Color Restrictions:**
- Max 32 colors per sprite
- Dark fantasy palette:
  - Shadows: #0d0c14, #1a1a1f
  - Stone: #4e5b6e, #9da3a4
  - Flesh: #c5cbe3, #f5f3f4
  - Blood: #b21f35, #ff304f
  - Magic: #4db1e8, #a347d6, #7bed9f
  - Fire: #ff9f1c, #ffd95a

**Animation Style:**
- Low frame count (2-6 frames per cycle)
- Snappy timing (fast transitions)
- Exaggerated poses (readability)
- Anticipation frames for attacks

### Readability Requirements
- Characters must be distinct from enemies (size, color, silhouette)
- Elite enemies larger/brighter than regular
- Bosses must dominate screen presence
- Hitboxes slightly larger than sprite (forgiving gameplay)

---

## 🔊 GAME FEEL CHECKLIST

**Impact Feedback:**
- [ ] Screen shake on heavy hits
- [ ] Particle burst on enemy death
- [ ] Flash white on boss hit
- [ ] Slash arc VFX on melee attacks
- [ ] Projectile trails

**Audio Feedback (Future):**
- [ ] Hit sound varies by weapon
- [ ] Enemy death sounds vary by type
- [ ] Boss roar on spawn
- [ ] Level up chime
- [ ] Essence collect "ding"

**Juiciness:**
- [ ] Enemy knockback on hit
- [ ] Player invincibility flash after damage
- [ ] Soul collection magnet effect
- [ ] Weapon cooldown visual indicator
- [ ] HP bar smooth drain (not instant)

---

## 🎯 DESIGN PILLARS

### 1. Constant Action
**Rule:** Player should never wait. Enemies always present.
- Timeline-based spawning (not wave-based)
- Bosses don't stop all spawns completely
- World always has loot to collect

### 2. Meaningful Choices
**Rule:** Every level-up matters. No "bad" choices.
- 3 options per level-up
- Each choice impacts playstyle
- No pure RNG (weighted randomness)

### 3. Power Fantasy
**Rule:** Player should feel godlike by minute 10.
- Exponential damage scaling
- Screen-filling VFX
- Hundreds of enemies killed per run

### 4. Fair Challenge
**Rule:** Deaths feel earned, not cheap.
- Clear enemy telegraphs
- Generous hitboxes
- Dodge opportunities
- No instant-kill attacks (except final boss enrage)

### 5. Replayability
**Rule:** Every run feels different.
- 3 unique characters
- Random level-up options
- Different weapon combos
- Procedural world layout

---

## 📐 TECHNICAL CONSTRAINTS

**Performance Targets:**
- 60 FPS minimum
- Max entities on screen: 150 (enemies + projectiles + particles)
- Canvas size: 1000x600px
- Mobile support: Touch controls, 30 FPS acceptable

**Asset Limits:**
- Total sprites: <5MB
- Max sprite sheet: 2048x2048px
- Animation JSONs: <10KB each

**Browser Support:**
- Chrome/Edge (primary)
- Firefox (secondary)
- Safari (tertiary)
- Mobile browsers (iOS Safari, Chrome Android)

---

## ✅ DONE CRITERIA

**Game is "complete" when:**

### Core Gameplay ✅
- [x] 3 playable characters
- [x] 8 unlockable weapons
- [x] 7 regular enemy types
- [x] 3 boss encounters
- [x] 15-minute gameplay loop
- [x] Level-up system with 8 upgrade types

### Visuals ✅
- [x] Pixel art for all characters
- [x] Pixel art for all enemies
- [x] Tileset with 4 biomes
- [x] VFX for all weapons
- [x] Particle effects (6 types)

### Feel ✅
- [x] Screen shake
- [x] Hit feedback
- [x] Smooth animations
- [x] Responsive controls

### Polish ✅
- [x] No crashes in 15min run
- [x] 60 FPS stable
- [x] Clear UI/HUD
- [x] Victory/defeat screens

---

**END OF GAME DESIGN DOCUMENT**

*This document is the single source of truth. All agents (Dali, Sonic, Cody) reference this for consistency.*