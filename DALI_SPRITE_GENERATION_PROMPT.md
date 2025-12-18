# SPRITE GENERATION PROMPT FOR DALI (Designer/Artist)

**For:** Dali agent in Quadcode IDE  
**Task:** Generate pixel-art sprite sheets for Souls of Abyss  
**Format:** PNG files (indexed color, optimized for web)  
**Timeline:** ~2-3 hours total

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

**2. Witch Sprite Sheet** (witch.png)
- Resolution: 64×64px per frame
- Frames per state: idle=4, run=6, cast=4, hit=2, death=3
- Total: ~19 frames
- Style: Mystical mage, robes, staff, magical aura
- Colors: Purple robes, blue aura glow, golden staff
- States: Idle (levitation bob), Run (floating), Cast (staff glow), Hit (with sparkles), Death (dissipate)

**3. Rogue Sprite Sheet** (rogue.png)
- Resolution: 64×64px per frame
- Frames per state: idle=2, run=6, attack=3, dodge=4, death=2
- Total: ~17 frames
- Style: Assassin, shadows, dagger
- Colors: Dark leather, shadow aura, silver dagger
- States: Idle (crouch), Run (dash blur), Attack (dagger thrust), Dodge (roll), Death (vanish)

---

### ENEMY SPRITES (7 types × 1 state each)

**Regular Enemies (spawn 80% of time):**

1. **Zombie** (zombie.png)
   - 32×32px, single sprite or 2-frame walk
   - Shambling movement, tattered clothing, decaying
   - Colors: Gray/brown skin, torn clothes, dark stains
   - Idle + walk cycle

2. **Spectre** (spectre.png)
   - 32×32px, floating ghostly form
   - Ethereal, translucent, blue glow
   - Colors: Light blue, semi-transparent, glowing edges
   - Idle + float cycle

3. **Cultist** (cultist.png)
   - 32×32px, robed figure with staff
   - Walking posture, hooded
   - Colors: Dark purple robes, silver staff, glowing eyes
   - Idle + walk cycle

**Elite Enemies (spawn 20% of time):**

4. **Vampire** (vampire.png)
   - 40×40px (bigger, elite), elegant walking
   - Cape, red glowing eyes
   - Colors: Black cape, red eyes, pale skin
   - Idle + walk cycle

5. **Wraith** (wraith.png)
   - 40×40px, shadowy spiral form
   - Ethereal, dark aura
   - Colors: Deep black, purple edges, swirling
   - Idle + spiral animation

6. **Corrupted Knight** (corrupted_knight.png)
   - 48×48px (large elite), armored figure
   - Broken/corrupted armor, menacing
   - Colors: Dark steel, purple corruption glow
   - Idle + walk cycle

7. **Warden** (warden.png)
   - 40×40px, patrol stance, glowing symbols
   - Armored guardian look
   - Colors: Cyan glowing symbols, dark armor
   - Idle + patrol animation

---

### BOSS SPRITES (3 bosses)

1. **Shadow Lord** (shadow_lord.png)
   - 96×96px (large), shadowy humanoid form
   - Aura of darkness, menacing
   - Colors: Deep red/black, red glow around edges
   - Idle + attack animation (2-3 frames)

2. **Void Rift** (void_rift.png)
   - 96×96px, swirling void/cosmic vortex
   - Particle effects, black hole appearance
   - Colors: Pure black center, purple edges, cosmic stars
   - Idle + rotation animation

3. **Ancient One** (ancient_one.png)
   - 96×96px, cosmic/tentacle creature
   - Otherworldly, eldritch appearance
   - Colors: Deep purple, cosmic blues, glowing runes
   - Idle + tentacle animation

---

### EFFECTS & UI SPRITES

1. **Particles Sheet** (particles.png)
   - 16×16px each, multiple effects on one sheet:
   - Slash effect (4 frames)
   - Explosion burst (6 frames)
   - Spark trail (3 frames)
   - Blood drop (2 frames)
   - Glow ring (4 frames)
   - Lifesteal flow (3 frames)

2. **Background/Map** (map.png)
   - 1000×600px scene background:
   - Purple-to-blue gradient
   - Mountain silhouettes (left/right edges)
   - Central ritual circle (glowing rune)
   - 8 dark stone pillars around edges
   - Fog/mist effects
   - Glow aura circle around center

---

## 🎨 STYLE REQUIREMENTS

### Overall Aesthetic
- **Genre:** Dark fantasy pixel art
- **Pixel size:** 16-32px base (scale up for display)
- **Color palette:** Moody purples, blues, reds, golds
- **Lighting:** Glow effects, highlights, shadows
- **Quality:** Production-ready, web-optimized

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
- **Contrast:** Clear distinction between types

---

## 📋 DELIVERY CHECKLIST

### Characters (Ready for animation)
- [ ] knight.png (64×64, 19 frames, 5 states)
- [ ] witch.png (64×64, 19 frames, 5 states)
- [ ] rogue.png (64×64, 17 frames, 5 states)

### Regular Enemies (Ready for spawning)
- [ ] zombie.png (32×32, idle + walk)
- [ ] spectre.png (32×32, idle + float)
- [ ] cultist.png (32×32, idle + walk)

### Elite Enemies (Ready for spawning)
- [ ] vampire.png (40×40, idle + walk)
- [ ] wraith.png (40×40, idle + spiral)
- [ ] corrupted_knight.png (48×48, idle + walk)
- [ ] warden.png (40×40, idle + patrol)

### Bosses (Ready for spawning)
- [ ] shadow_lord.png (96×96, idle + attack)
- [ ] void_rift.png (96×96, idle + rotation)
- [ ] ancient_one.png (96×96, idle + tentacle)

### Effects & UI
- [ ] particles.png (16×16, multiple effects)
- [ ] map.png (1000×600, background scene)

**Total: 15 PNG files**

---

## 🎯 SUCCESS CRITERIA

✅ All files named exactly as specified  
✅ All resolutions exact  
✅ All frame counts correct  
✅ PNG format, indexed color  
✅ Sprites visible at game scale (32-96px)  
✅ Animation frames make sense (walk/attack/death smooth)  
✅ Color palette consistent across all sprites  
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

**Notes:**
- Prioritize readability at game scale
- Animation frames should tell a story (clear state transitions)
- Keep file sizes small (optimize color palettes)
- Dark fantasy aesthetic throughout
- All sprites ready for Sonic to create animation specs

**Ready to generate? Go! 🎨**