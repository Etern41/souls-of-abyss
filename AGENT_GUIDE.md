# AI AGENT COORDINATION GUIDE

## QUICK START

**Your Role:** Delegate work to agents via prompts. Don't code yourself.

**Team Structure:**
```
YOU (Many - Team Lead)
├─ CODY (Developer) → game.js, game logic, spawn balance
├─ DALI (Designer) → Sprites, character art, visual assets
├─ SONIC (Motion Designer) → Animations, JSON timing specs
└─ JACE (Frontend) → HTML/UI updates (not needed yet)
```

---

## AGENT PROMPTS - COPY & PASTE

### 1. CODY - GAME BALANCE & OBSTACLES

**Copy this and paste into Cody's chat:**

```
You are Cody, a JavaScript game developer updating Souls of the Abyss.

Task: Improve spawn mechanics and balance for better 10-minute survival.

REQUIREMENTS:

1. Add ObstacleManager class:
   - Properties: obstacles[] array (position, radius, type)
   - Methods: add(x, y, radius, type), isBlocked(x, y, checkRadius)
   - Modify spawnEnemyAtRing() to avoid obstacles
   - If blocked, retry 3 times or skip spawn

2. Place 15-20 obstacles:
   - Types: tree (radius 30), pillar (25), rock (20)
   - Location: spawn ring 200-600px from player
   - Visual: Draw as part of background layer

3. Adjust difficulty curve:
   Old: gameState.difficultyMultiplier = 1 + gameState.gameTime / 120
   New: gameState.difficultyMultiplier = 1 + gameState.gameTime / 150 (capped at 4)
   Effect:
   - 2min: 1.13x
   - 4min: 1.27x
   - 6min: 1.40x
   - 8min: 1.53x
   - 10min: 1.67x

4. Reduce enemy health by 15%:
   - zombie: 20→17, spectre: 18→15, cultist: 22→19
   - vampire: 40→34, wraith: 38→32, corrupted_knight: 50→42, warden: 42→36

5. Change elite spawn rate:
   Old: Math.min(0.15 + gameState.waveNumber * 0.01, 0.35)
   New: Math.min(0.10 + gameState.gameTime / 600, 0.35)
   Effect: Starts at 10%, reaches 25% at 8min, caps at 35%

6. Boss timing:
   - First boss: 90 seconds
   - Subsequent: every 120 seconds
   - Boss health scales: multiply by gameState.difficultyMultiplier

7. Test and validate:
   ✓ Obstacles don't overlap entities
   ✓ Spawn avoids obstacles
   ✓ 2min: feels easy
   ✓ 5min: moderate difficulty
   ✓ 8min: intense but winnable
   ✓ 60 FPS maintained
   ✓ No console errors

Return: Updated game.js ONLY. No markdown.
```

---

### 2. DALI - MAP & ENVIRONMENT SPRITES

**Copy this and paste into Dali's chat:**

```
You are Dali, a digital artist designing Souls of the Abyss visuals.

Task: Create map background and environmental decoration assets.

DELIVERABLES:

1. sprites/map.png (1000x600 background)
   - Gradient: Purple (#4a0e4e) → Dark Blue (#0d1f2d) → Black (#0a0a0f)
   - Fog effect with transparency overlay
   - Mountain silhouettes on edges
   - Worn stone ground texture
   - Ritual circle glow at center (faint purple)
   - Floating mist particles

2. sprites/decorations.png (sprite sheet, 256x256 total)
   Four 48x48 decorations:
   - Dead tree (gnarled, skeletal)
   - Stone pillar (ancient, carved)
   - Boulder (moss-covered, dark)
   - Crypt stone (gothic arch)
   All: Dark fantasy style, consistent palette, soft shadows

COLOR PALETTE (use exact hex codes):
- Purples: #4a0e4e, #6f1b7f, #9e3fb0
- Blues: #0d1f2d, #1a3a52, #32b8c6
- Blacks: #0a0a0f, #1f2121, #0d0d0d
- Gold: #ffd700, #f9d71c
- Cyan: #00ffff, #06b6d4

Format: PNG with transparency, optimized for web
Output: Both files to sprites/ folder
```

---

### 3. DALI - CHARACTER SPRITES (HEROES)

**Copy this and paste into Dali's chat:**

```
You are Dali, a digital artist. Create 3 hero character sprites.

Task: Design unique heroes with personality and visual distinction.

1. KNIGHT (sprites/knight.png - 384x240 sprite sheet)
   Persona: Heavy-armored noble warrior, RED aura
   - Appearance: Full plate armor (red/gold), large sword, cape
   - Idle: Standing composed, glowing red aura, breathing (8 frames × 48px)
   - Run: Heavy stride, armor clanking, cape trailing (4 frames)
   - Attack: Overhead sword swing (2 frames, powerful)
   - Hit: Knocked back animation (2 frames)
   - Death: Collapses and fades (6 frames)
   Color: Reds (#c41e3a, #ff5459), golds (#f9d71c), blacks

2. WITCH (sprites/witch.png - 384x240 sprite sheet)
   Persona: Arcane mage, PURPLE magical aura
   - Appearance: Flowing robes, pointed hat, staff with glowing orb
   - Idle: Levitating, robe flowing, staff glowing (8 frames)
   - Run: Graceful floating movement, magical particles (4 frames)
   - Attack: Staff raised, magical cast (2 frames)
   - Hit: Knockback with sparkles (2 frames)
   - Death: Dissipates into particles (6 frames, ethereal slow fade)
   Color: Purples (#9e3fb0, #6f1b7f), magentas (#ff99c8)

3. ROGUE (sprites/rogue.png - 384x240 sprite sheet)
   Persona: Fast shadowy assassin, ORANGE accent
   - Appearance: Dark leathers, dual daggers, hooded, shadow aura
   - Idle: Crouched ready stance, subtle movement (8 frames, tense)
   - Run: Quick dashing sprints, blur trails (3 frames, FAST)
   - Attack: Dagger thrust, shadow effect (2 frames, instant)
   - Hit: Quick dodge with shadow burst (2 frames)
   - Death: Vanishes into shadow (4 frames, quick)
   Color: Darks (#1f2121), oranges (#ff7b5f), shadows

SPRITE SHEET FORMAT (all):
Row 1: Idle (8 frames × 48px each)
Row 2: Run (4 frames × 48px)
Row 3: Attack (2 frames × 48px)
Row 4: Hit (2 frames × 48px)
Row 5: Death (6 frames × 48px)
Total: 384×240 pixels, 48×48 per frame

REQUIREMENTS:
- Consistent pixel/vector art style
- Clear animation frame alignment
- Distinct silhouettes (easy to recognize)
- Dark fantasy aesthetic
- PNG with transparency
- Animation-ready (frames connect smoothly)

Output: 3 PNG files (knight.png, witch.png, rogue.png) to sprites/
```

---

### 4. DALI - ENEMY SPRITES (REGULAR + ELITE)

**Copy this and paste into Dali's chat:**

```
You are Dali. Create 7 enemy character sprites for Souls of the Abyss.

Task: Design distinct enemies showing visual hierarchy (weak → strong).

REGULAR ENEMIES (3 types - simple, shambling):

1. ZOMBIE (sprites/zombie.png - 240x240)
   - Appearance: Shambling undead, tattered clothes, decomposing
   - Idle: Swaying dumbly (2 frames)
   - Attack: Slow swipe (1 frame, held 0.4s)
   - Death: Collapses (4 frames)
   - Palette: Grays (#9da3a4, #6f7d7c), greens (#7aa896)

2. SPECTRE (sprites/spectre.png - 240x240)
   - Appearance: Ghostly floating entity, ethereal, semi-transparent
   - Idle: Hovering in spiral pattern (2 frames)
   - Attack: Energy drain gesture (1 frame, held 0.4s)
   - Death: Fades away (4 frames)
   - Palette: Blues (#4db1e8, #32b8c6), whites (#f3f6ff)

3. CULTIST (sprites/cultist.png - 240x240)
   - Appearance: Robed figure, occult symbols, staff or dagger
   - Idle: Chanting stance (2 frames)
   - Attack: Casting gesture (1 frame, held 0.4s)
   - Death: Falls and dissipates (4 frames)
   - Palette: Purples (#a347d6, #5f1e8f), darks

ELITE ENEMIES (4 types - stronger, glowing, intimidating):

4. VAMPIRE (sprites/vampire.png - 240x240)
   - Appearance: Noble vampire, crimson cloak, pale, aristocratic
   - Idle: Elegant standing (2 frames)
   - Attack: Swift strike (1 frame, 0.4s)
   - Death: Shatters into shadow (4 frames)
   - Palette: Reds (#c41e3a, #ff5459), blacks (#1f2121)
   - Signal: RED = danger

5. WRAITH (sprites/wraith.png - 240x240)
   - Appearance: Dark shadowy form, writhing essence, glowing eyes
   - Idle: Hovering menacingly (2 frames)
   - Attack: Energy bolt (1 frame, 0.4s)
   - Death: Dissipates to shadow (4 frames)
   - Palette: Blacks (#0d0d0d, #1f2121), blues (#32b8c6)
   - Signal: DARK = elite

6. CORRUPTED_KNIGHT (sprites/corrupted_knight.png - 240x240)
   - Appearance: Blackened armor, corrupted aura, tainted guardian
   - Idle: Standing defiant (2 frames)
   - Attack: Heavy sword swing (1 frame, 0.4s, slow)
   - Death: Crumbles to dust (4 frames)
   - Palette: Grays (#4e5b6e), purples (#9e3fb0), blacks
   - Signal: GRAY/PURPLE = armored threat

7. WARDEN (sprites/warden.png - 240x240)
   - Appearance: Celestial guardian corrupted, ethereal armor, cyan glow
   - Idle: Scanning patrol stance (2 frames)
   - Attack: Energy beam (1 frame, 0.4s)
   - Death: Fades with light burst (4 frames)
   - Palette: Cyans (#0ad1ff, #06b6d4), whites (#f3f6ff)
   - Signal: CYAN/BRIGHT = magical

SPRITE SHEET FORMAT (all):
3-4 rows × 2-4 frames
Row 1: Idle/Walk (2 frames × 48px)
Row 2: Attack (1 frame × 48px, usually holds 0.4s)
Row 3+: Death (4 frames × 48px)
Total: 240×240 pixels per sprite

REQUIREMENTS:
- Visual hierarchy: Regular < Elite (bigger, more detail, glow)
- Unique silhouette for each enemy type
- Color-coded by power level
- Dark fantasy consistent style
- Clear animation frames
- PNG with transparency

Output: 7 PNG files (zombie.png through warden.png) to sprites/
```

---

### 5. DALI - BOSS SPRITES (EPIC)

**Copy this and paste into Dali's chat:**

```
You are Dali. Create 3 EPIC boss sprites for Souls of the Abyss.

Task: Design massive, intimidating boss encounters.

1. SHADOW_LORD (sprites/shadow_lord.png - 384x384)
   Persona: Dark overlord, embodiment of shadow
   - Appearance: Humanoid MASSIVE, cloak of darkness, glowing red eyes
   - Idle: Pulsing menacingly, breathing darkness (2 frames)
   - Attack: Sweeping dark energy (1 frame, slow and powerful, 0.8s)
   - Phase: Intensifies at 50% HP (1 frame, glowing brighter)
   - Death: Dissipates into void (1 frame, 2s epic fade)
   - Palette: Reds (#ff304f, #c41e3a), blacks (#0d0d0d)
   - Feel: Oppressive, dark, final boss energy

2. VOID_RIFT (sprites/void_rift.png - 384x384)
   Persona: Cosmic horror, dimensional portal, abstract threat
   - Appearance: Swirling void, tentacle-like appendages, cosmic particles
   - Idle: Swirling vortex, cosmic energy (2 frames)
   - Attack: Tentacle strike or void explosion (1 frame, 0.8s)
   - Phase: Reality distortion at 50% HP (1 frame)
   - Death: Implodes inward (1 frame, 2s cosmic collapse)
   - Palette: Purples (#4a0e4e, #9e3fb0), blacks, blues (#0d1f2d)
   - Feel: Alien, incomprehensible, nightmare fuel

3. ANCIENT_ONE (sprites/ancient_one.png - 384x384)
   Persona: Primordial entity, forgotten god
   - Appearance: Massive otherworldly creature, multiple limbs, eldritch symbols
   - Idle: Cosmic breathing, ancient power (2 frames)
   - Attack: Multi-limb strike or AOE (1 frame, 0.8s)
   - Phase: Awakens more at 50% HP (1 frame, more intense)
   - Death: Fades into cosmic dust (1 frame, 2s ethereal fade)
   - Palette: Oranges (#ff9f1c, #e68161), golds (#ffd700), blacks
   - Feel: Massive, dangerous, time-worn, unkillable

BOSS SPECIFICATIONS:
- Size: 96×96 per frame (2× larger than elite enemies 48×48)
- Frames: Minimal (1-2 per state)
- Frame times: SLOW and deliberate (0.5-1.0s per frame)
- Animations: ~384×384 total (96×96 × 4 rows or variations)
- Glowing auras: Use glow effects or particles
- Unique from all other entities

SPRITE SHEET FORMAT (all):
Size: 96×96 pixels per frame
Rows vary by boss:
- Idle (2 frames × 96px)
- Attack (1 frame × 96px)
- Phase (1 frame × 96px)
- Death (1 frame × 96px)
Total: 384×384 pixels per boss

REQUIREMENTS:
- MASSIVE and intimidating (double normal size)
- Glowing effects (auras, particles)
- Unique design not resembling other entities
- Clear attack/idle/death frames
- Palette matches character (red, purple, orange)
- Dark fantasy + cosmic/eldritch themes
- PNG with transparency

Output: 3 PNG files (shadow_lord.png, void_rift.png, ancient_one.png) to sprites/
```

---

### 6. SONIC - ANIMATION TIMING SPECS

**Copy this and paste into Sonic's chat:**

```
You are Sonic, a motion designer. Create animation JSON specifications for all entities.

Task: Define animation timing and state machine for smooth motion.

OUTPUT: 14 JSON files to animations/ folder:

Characters: knight.json, witch.json, rogue.json
Regular enemies: zombie.json, spectre.json, cultist.json
Elite enemies: vampire.json, wraith.json, corrupted_knight.json, warden.json
Bosses: shadow_lord.json, void_rift.json, ancient_one.json
Effects: particles.json

FORMAT (example - Knight):
{
  "entityType": "knight",
  "spriteSize": 48,
  "animations": {
    "idle": {
      "frameCount": 8,
      "frameTime": 0.25,
      "loop": true,
      "nextState": "idle"
    },
    "run": {
      "frameCount": 4,
      "frameTime": 0.15,
      "loop": true,
      "nextState": "run"
    },
    "attack": {
      "frameCount": 2,
      "frameTime": 0.2,
      "loop": false,
      "nextState": "idle"
    },
    "hit": {
      "frameCount": 2,
      "frameTime": 0.15,
      "loop": false,
      "nextState": "idle"
    },
    "death": {
      "frameCount": 6,
      "frameTime": 0.15,
      "loop": false,
      "nextState": "death"
    }
  }
}

TIMING REFERENCE:

CHARACTERS:
- Knight: idle 0.25/frame, run 0.15, attack 0.2, hit 0.15, death 0.15
- Witch: idle 0.25/frame, run 0.15, attack 0.15, hit 0.15, death 0.2 (slower)
- Rogue: idle 0.15/frame (subtle), run 0.1 (fast), attack 0.1, hit 0.12, death 0.1

REGULAR ENEMIES (Zombie, Spectre, Cultist):
- Idle: 2 frames, 0.5s/frame (slow shamble)
- Attack: 1 frame, 0.4s (held)
- Death: 4 frames, 0.15s/frame (0.6s total)

ELITE ENEMIES (Vampire, Wraith, Corrupted Knight, Warden):
- Idle: 2 frames, 0.4s/frame (menacing)
- Attack: 1 frame, 0.4s (held, faster than regular)
- Death: 4 frames, 0.15s/frame (same as regular)

BOSSES (Shadow Lord, Void Rift, Ancient One):
- Idle: 2 frames, 0.5s/frame (pulsing, deliberate)
- Attack: 1 frame, 0.8s (LONG wind-up, threatening)
- Phase: 1 frame, 1.0s (intensity shift)
- Death: 1 frame, 2.0s (EPIC fade)
- SpriteSize: 96 (not 48)

PARTICLES.JSON:
{
  "entityType": "particles",
  "animations": {
    "slash": { "frameCount": 4, "frameTime": 0.08, "loop": false },
    "explosion": { "frameCount": 4, "frameTime": 0.1, "loop": false },
    "spark": { "frameCount": 3, "frameTime": 0.1, "loop": false },
    "blood": { "frameCount": 2, "frameTime": 0.12, "loop": false },
    "glow": { "frameCount": 4, "frameTime": 0.1, "loop": false }
  }
}

REQUIREMENTS:
- All animations loop smoothly (last frame connects to first)
- Attack animations can be snappy (abrupt end OK)
- Death animations slow and satisfying
- Boss animations 1.5× slower than regular
- Frame counts match sprite sheet layout
- No animation shorter than 0.1s or longer than 3s
- Valid JSON syntax

Output: 14 JSON files to animations/ (no markdown)
```

---

## WORKFLOW SUMMARY

1. **You → Cody** (game.js update) - Give first prompt
2. **You → Dali** (sprites) - Give 4 prompts (map, characters, enemies, bosses) in parallel
3. **You → Sonic** (animations) - Give 1 prompt
4. **Wait** for deliverables
5. **Integrate** assets into game
6. **Test** all together
7. **Iterate** if needed

---

## QUALITY CHECKLIST

Before considering done:

- [ ] NO MORE COLORED CIRCLES
- [ ] All 3 heroes look distinct and cool
- [ ] All 7 enemies have personality
- [ ] All 3 bosses are INTIMIDATING
- [ ] Map background looks atmospheric
- [ ] Animations smooth and natural
- [ ] Idle animations have breathing/movement
- [ ] Attacks feel responsive
- [ ] Spawn balance feels fair
- [ ] 60 FPS maintained
- [ ] No console errors
- [ ] Ready to show players!

---

## TROUBLESHOOTING

**Problem:** Agent says "I can't see the sprite sheet format"
**Solution:** Copy the exact pixel dimensions (384x240 for characters, etc.)

**Problem:** Animations jittery
**Solution:** Check sprite frame alignment - frames must be exact pixel-perfect

**Problem:** Spawn feels too easy/hard
**Solution:** Adjust difficultyMultiplier formula in Cody prompt

**Problem:** Sprites not loading
**Solution:** Check file paths in game.js and sprite names match exactly

**Problem:** Color palette looks wrong
**Solution:** Use exact HEX codes from guide (not approximations)

---

**Status:** Ready to delegate!

