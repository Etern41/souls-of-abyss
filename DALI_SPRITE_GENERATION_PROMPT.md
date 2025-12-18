# SPRITE GENERATION PROMPT FOR DALI (Designer/Artist)

**For:** Dali agent in Quadcode IDE  
**Task:** Generate pixel-art sprite sheets for Souls of Abyss  
**Format:** PNG files (indexed color, optimized for web)  
**Timeline:** ~2-3 hours total

---

## ⚠️ VISUAL REFERENCE - WHAT TO REPLACE

**CURRENT STATE (What NOT to do):**
```
The game currently uses:
- Colored squares (32×32px placeholders)
- Colored circles (floating enemies)
- Rectangles for bosses
This is PLACEHOLDER ART ONLY.
```

**YOUR JOB:**
Replace ALL placeholder shapes with ACTUAL PIXEL ART CHARACTERS:
- Knight = Detailed warrior sprite (armor, sword, face)
- Witch = Mystical mage sprite (robes, staff, glowing aura)
- Rogue = Assassin sprite (shadows, dagger, leather)
- Enemies = Recognizable creature designs (zombies have faces, vampires have fangs, etc.)
- Bosses = Large, intimidating, detailed sprites

**NOT acceptable:**
- Solid color squares or circles
- Simple geometric shapes
- Placeholder rectangles
- Undefined blobs

**REQUIRED:**
- Clear character silhouettes
- Recognizable features (eyes, weapons, clothing)
- Dark fantasy aesthetic throughout
- Readable at 32×32 and 64×64 pixels
- Professional pixel art quality

---

## 🎨 WHAT TO GENERATE

### CHARACTER SPRITES (3 characters)

**1. Knight Sprite Sheet** (knight.png)
- Resolution: 64×64px per frame
- Frames per state: idle=4, run=6, attack=4, hit=2, death=3
- Total: ~19 frames on spritesheet
- Style: Medieval warrior, armor, sword
- Colors: Steel gray armor, red cape, yellow/gold accents
- States: Idle (breathing), Run (legs moving), Attack (sword swing), Hit (knockback), Death (collapse)
- **Visual cues:** Visible sword, armor plates, cape movement, facial expression

**2. Witch Sprite Sheet** (witch.png)
- Resolution: 64×64px per frame
- Frames per state: idle=4, run=6, cast=4, hit=2, death=3
- Total: ~19 frames
- Style: Mystical mage, robes, staff, magical aura
- Colors: Purple robes, blue aura glow, golden staff
- States: Idle (levitation bob), Run (floating), Cast (staff glow), Hit (with sparkles), Death (dissipate)
- **Visual cues:** Visible staff, robes with folds, magic aura particles, pointed hat

**3. Rogue Sprite Sheet** (rogue.png)
- Resolution: 64×64px per frame
- Frames per state: idle=2, run=6, attack=3, dodge=4, death=2
- Total: ~17 frames
- Style: Assassin, shadows, dagger
- Colors: Dark leather, shadow aura, silver dagger
- States: Idle (crouch), Run (dash blur), Attack (dagger thrust), Dodge (roll), Death (vanish)
- **Visual cues:** Visible dagger, crouched posture, shadow effects, blur lines

---

### ENEMY SPRITES (7 types × 1 state each)

**Regular Enemies (spawn 80% of time):**

1. **Zombie** (zombie.png)
   - 32×32px, single sprite or 2-frame walk
   - Shambling movement, tattered clothing, decaying
   - Colors: Gray/brown skin, torn clothes, dark stains
   - Idle + walk cycle
   - **Visual cues:** Eyes, mouth, visible decay, ragged edges

2. **Spectre** (spectre.png)
   - 32×32px, floating ghostly form
   - Ethereal, translucent, blue glow
   - Colors: Light blue, semi-transparent, glowing edges
   - Idle + float cycle
   - **Visual cues:** Ghostly shape, glowing outline, ethereal wisps

3. **Cultist** (cultist.png)
   - 32×32px, robed figure with staff
   - Walking posture, hooded
   - Colors: Dark purple robes, silver staff, glowing eyes
   - Idle + walk cycle
   - **Visual cues:** Hooded head, visible staff, robe details, glowing eyes

**Elite Enemies (spawn 20% of time):**

4. **Vampire** (vampire.png)
   - 40×40px (bigger, elite), elegant walking
   - Cape, red glowing eyes
   - Colors: Black cape, red eyes, pale skin
   - Idle + walk cycle
   - **Visual cues:** Red glowing eyes, cape flowing, bat-like silhouette

5. **Wraith** (wraith.png)
   - 40×40px, shadowy spiral form
   - Ethereal, dark aura
   - Colors: Deep black, purple edges, swirling
   - Idle + spiral animation
   - **Visual cues:** Spiral vortex effect, dark shadows, swirling edges

6. **Corrupted Knight** (corrupted_knight.png)
   - 48×48px (large elite), armored figure
   - Broken/corrupted armor, menacing
   - Colors: Dark steel, purple corruption glow
   - Idle + walk cycle
   - **Visual cues:** Broken armor plates, purple corruption glow, threatening pose

7. **Warden** (warden.png)
   - 40×40px, patrol stance, glowing symbols
   - Armored guardian look
   - Colors: Cyan glowing symbols, dark armor
   - Idle + patrol animation
   - **Visual cues:** Glowing cyan runes/symbols, armored body, guard stance

---

### BOSS SPRITES (3 bosses)

1. **Shadow Lord** (shadow_lord.png)
   - 96×96px (large), shadowy humanoid form
   - Aura of darkness, menacing
   - Colors: Deep red/black, red glow around edges
   - Idle + attack animation (2-3 frames)
   - **Visual cues:** Imposing stance, glowing red eyes/aura, shadow tendrils

2. **Void Rift** (void_rift.png)
   - 96×96px, swirling void/cosmic vortex
   - Particle effects, black hole appearance
   - Colors: Pure black center, purple edges, cosmic stars
   - Idle + rotation animation
   - **Visual cues:** Cosmic/space theme, swirling vortex, visible stars/particles

3. **Ancient One** (ancient_one.png)
   - 96×96px, cosmic/tentacle creature
   - Otherworldly, eldritch appearance
   - Colors: Deep purple, cosmic blues, glowing runes
   - Idle + tentacle animation
   - **Visual cues:** Multiple tentacles, eldritch runes, cosmic glow, alien appearance

---

### EFFECTS & UI SPRITES

1. **Particles Sheet** (particles.png)
   - 16×16px each, multiple effects on one sheet:
   - Slash effect (4 frames) - blade stroke visualization
   - Explosion burst (6 frames) - impact particles
   - Spark trail (3 frames) - flame/electrical effect
   - Blood drop (2 frames) - hit indicator
   - Glow ring (4 frames) - magic effect
   - Lifesteal flow (3 frames) - healing particles toward player
   - **Visual cues:** Clear, distinct effects, readable at small size

2. **Background/Map** (map.png)
   - 1000×600px scene background:
   - Purple-to-blue gradient (dark sky)
   - Mountain silhouettes (left/right edges)
   - Central ritual circle (glowing rune with detail)
   - 8 dark stone pillars around edges (3D perspective)
   - Fog/mist effects (atmospheric)
   - Glow aura circle around center (player spawn area)
   - **Visual cues:** Dark, ominous atmosphere, clear level boundaries

---

## 🎨 STYLE REQUIREMENTS

### Overall Aesthetic
- **Genre:** Dark fantasy pixel art
- **Pixel size:** 16-32px base (scale up for display)
- **Color palette:** Moody purples, blues, reds, golds
- **Lighting:** Glow effects, highlights, shadows
- **Quality:** Production-ready, web-optimized
- **NOT:** Simple geometric shapes, placeholders, or undefined silhouettes

### Technical Requirements
- **Format:** PNG files only
- **Color space:** Indexed color (256 colors max per sprite)
- **Compression:** Optimized for web (smallest file size)
- **Transparency:** Alpha channel for backgrounds
- **Resolution:** Exact sizes specified above
- **Naming:** Exact filenames (lowercase, hyphens)

### Animation Principles
- **Smoothness:** 4-6 frames per cycle
- **Clarity:** Readable at 32×32 and 64×64px
- **Consistency:** Same style across all sprites
- **Weight:** Feel mass/impact in attacks
- **Contrast:** Clear distinction between types (character vs enemy vs boss)
- **Definition:** Each sprite has clear outline and features

---

## 🚫 DO NOT SUBMIT THESE

❌ Colored squares (any size)
❌ Colored circles or dots
❌ Simple rectangles
❌ Placeholder geometric shapes
❌ Undefined blobs or shadows
❌ Illegible silhouettes
❌ Generic humanoid stick figures
❌ Low-effort recolors

---

## ✅ DO SUBMIT THESE

✅ Detailed pixel art with clear features
✅ Recognizable character types (knight has armor, witch has staff, etc.)
✅ Readable at game resolution (32-96px)
✅ Professional quality dark fantasy aesthetic
✅ Distinct silhouettes for each character/enemy type
✅ Clear animation progression in frame sequences
✅ Proper color palettes with highlights/shadows
✅ Dark, ominous atmosphere throughout

---

## 📋 DELIVERY CHECKLIST

### Characters (Ready for animation)
- [ ] knight.png (64×64, 19 frames, 5 states, CLEAR KNIGHT DESIGN)
- [ ] witch.png (64×64, 19 frames, 5 states, CLEAR WITCH DESIGN)
- [ ] rogue.png (64×64, 17 frames, 5 states, CLEAR ROGUE DESIGN)

### Regular Enemies (Ready for spawning)
- [ ] zombie.png (32×32, idle + walk, ZOMBIE FEATURES)
- [ ] spectre.png (32×32, idle + float, GHOSTLY APPEARANCE)
- [ ] cultist.png (32×32, idle + walk, ROBED FIGURE)

### Elite Enemies (Ready for spawning)
- [ ] vampire.png (40×40, idle + walk, VAMPIRE FEATURES)
- [ ] wraith.png (40×40, idle + spiral, DARK SWIRLING FORM)
- [ ] corrupted_knight.png (48×48, idle + walk, CORRUPTED ARMOR)
- [ ] warden.png (40×40, idle + patrol, ARMORED GUARDIAN)

### Bosses (Ready for spawning)
- [ ] shadow_lord.png (96×96, idle + attack, THREATENING BOSS)
- [ ] void_rift.png (96×96, idle + rotation, COSMIC VORTEX)
- [ ] ancient_one.png (96×96, idle + tentacle, ELDRITCH CREATURE)

### Effects & UI
- [ ] particles.png (16×16, multiple effects, DISTINCT PARTICLES)
- [ ] map.png (1000×600, background scene, ATMOSPHERIC LEVEL)

**Total: 15 PNG files - ALL WITH ACTUAL ART, NOT PLACEHOLDERS**

---

## 🎯 SUCCESS CRITERIA

✅ All files named exactly as specified  
✅ All resolutions exact  
✅ All frame counts correct  
✅ PNG format, indexed color  
✅ Sprites visible and detailed at game scale (32-96px)  
✅ Animation frames make sense (walk/attack/death smooth)  
✅ Color palette consistent across all sprites  
✅ **NO PLACEHOLDER SHAPES - ACTUAL PIXEL ART**  
✅ Each sprite type instantly recognizable  
✅ Dark fantasy atmosphere maintained  
✅ Ready to integrate into game immediately  

---

## 📁 WHERE TO SAVE

Create folder: `souls-of-abyss/sprites/`

Save all 15 PNG files there:
```
sprites/
├── knight.png
├── witch.png
├── rogue.png
├── zombie.png
├── spectre.png
├── cultist.png
├── vampire.png
├── wraith.png
├── corrupted_knight.png
├── warden.png
├── shadow_lord.png
├── void_rift.png
├── ancient_one.png
├── particles.png
└── map.png
```

---

## ⏱️ TIMELINE

- Estimated time: 2-3 hours total
- Characters (3): ~45 min
- Regular enemies (3): ~30 min
- Elite enemies (4): ~30 min
- Bosses (3): ~30 min
- Effects & UI (2): ~15 min
- Quality check: ~15 min

---

**CRITICAL REMINDER:**

The game CURRENTLY looks like placeholder squares and circles. Your job is to make it look like a REAL dark fantasy game with ACTUAL CHARACTER ART.

Each sprite must be instantly recognizable as its character type. No more geometric shapes. This is production-quality pixel art.

**Ready to generate? Go! 🎨**