# ANIMATION MOTION SPECS PROMPT FOR SONIC (Motion Designer)

**For:** Sonic agent in Quadcode IDE  
**Task:** Create animation specifications (timing, easing, transitions)  
**Format:** JSON metadata files describing frame timings  
**Timeline:** ~1-2 hours total

---

## ⚠️ ANIMATION TIMING REFERENCE

**CURRENT PROBLEM:**
Animations are too slow or too fast, or feel generic.

**YOUR JOB:**
Create timing that makes the game FEEL RIGHT:
- Characters feel responsive & snappy (fast attacks = immediate feedback)
- Bosses feel intimidating & powerful (slow, heavy animations)
- Enemies feel dangerous (varied speeds prevent predictability)
- Particles emphasize impact (fast bursts for hits, slow fades for effects)

**TIMING PRINCIPLES:**
- **Fast (60-100ms per frame):** Quick attacks, dash, dodge feel responsive
- **Medium (150-250ms per frame):** Walking, basic actions, normal feel
- **Slow (300-600ms per frame):** Boss idle, imposing movements, weight
- **Instant (1 frame, 0-50ms):** Critical hits, quick flashes

**FEEL TARGETS:**
- Knight attack: "CLANG!" instant feedback (4 frames × 75ms = 300ms total swing)
- Rogue dodge: Snappy roll (4 frames × 100ms = 400ms, invincibility frame 2)
- Boss attack: Slow, intimidating buildup (3 frames × 150ms = 450ms)
- Particle slash: Crisp impact (4 frames × 100ms = 400ms lifetime)

---

## 🎬 WHAT TO GENERATE

### Animation Specification Format

Each sprite needs a JSON file describing:
- Frame count per animation state
- Duration per frame (in milliseconds)
- Loop vs one-shot
- Transitions between states
- Physics (gravity, acceleration, easing)

---

## 📋 CHARACTER ANIMATIONS

### 1. Knight Animations (knight.json)

**Idle:** 4 frames × 250ms = 1 sec loop (breathing)
**Run:** 6 frames × 100ms = 0.6 sec loop (legs moving fast = responsive)
**Attack:** 4 frames × 75ms = 0.3 sec (SHARP, immediate feedback)
**Hit:** 2 frames × 100ms = 0.2 sec (quick knockback reaction)
**Death:** 3 frames × 200ms = 0.6 sec (heavy collapse)

**Feel:** Heavy, armored, powerful. Quick attacks. Slow death.
Transitions: idle ↔ run (immediate), any → hit (interrupt), hit → idle (wait complete), any → death (interrupt)

### 2. Witch Animations (witch.json)

**Idle:** 4 frames × 300ms = 1.2 sec loop (levitation bob, SMOOTH ease-in-out)
**Run:** 6 frames × 120ms = 0.72 sec loop (floating, graceful)
**Cast:** 4 frames × 100ms = 0.4 sec (staff buildup, magical)
**Hit:** 2 frames × 120ms = 0.24 sec (sparkles on impact)
**Death:** 3 frames × 250ms = 0.75 sec (dissipate, graceful fade)

**Feel:** Magical, smooth, ethereal. Floating movement. Slow casting.
Physics: Floating bob (amplitude 5px, frequency 2Hz), easing adds floaty feel

### 3. Rogue Animations (rogue.json)

**Idle:** 2 frames × 400ms = 0.8 sec loop (crouch ready, still)
**Run:** 6 frames × 80ms = 0.48 sec loop (FASTEST, dash blur effect)
**Attack:** 3 frames × 60ms = 0.18 sec (INSTANT dagger thrust - snappiest)
**Dodge:** 4 frames × 100ms = 0.4 sec (roll animation, invincibility frame 2 out of 4)
**Death:** 2 frames × 150ms = 0.3 sec (vanish with shadow)

**Feel:** Fast, responsive, deadly. Quickest attacks. Most agile.
Physics: Dodge invincibility frame 2 (out of 4), dash speed 1.5x, shadow trail

---

## 👻 ENEMY ANIMATIONS

### Regular Enemies (Slow, predictable, balanced)

**Zombie (zombie.json)**
- Idle: 1 frame × 500ms = loop (VERY SLOW, shambling)
- Walk: 2 frames × 300ms = 0.6 sec loop (slow approach)
- Attack: 1 frame × 200ms (simple, no animation)
- Death: 1 frame × 300ms (instant death animation)
**Feel:** Slow, predictable, easy to kite

**Spectre (spectre.json)**
- Idle: 2 frames × 400ms = loop (floating bob, ease-in-out)
- Float: 2 frames × 300ms = loop (hovering movement)
- Attack: 1 frame × 200ms (ethereal)
- Death: 1 frame × 400ms (fade away)
**Feel:** Ghostly, eerie, smooth movement
Physics: Float bob (amplitude 8px, frequency 1.5Hz), fade_on_death transparency

**Cultist (cultist.json)**
- Idle: 1 frame × 400ms = loop (standing still)
- Walk: 2 frames × 250ms = 0.5 sec loop (walking pace)
- Attack: 1 frame × 200ms (staff thrust)
- Death: 1 frame × 300ms (collapse)
**Feel:** Human-like, medium speed, threatening

### Elite Enemies (Faster, more dangerous, varied)

**Vampire (vampire.json)**
- Idle: 2 frames × 350ms = loop (elegant, menacing)
- Walk: 3 frames × 200ms = 0.6 sec loop (FASTER than cultist, threatening)
- Attack: 2 frames × 150ms (quick bite)
- Death: 1 frame × 400ms (dramatic)
**Feel:** Elegant but deadly, faster than regular enemies, elegant_smooth_movements physics

**Wraith (wraith.json)**
- Idle: 2 frames × 500ms = loop (ominous pause)
- Spiral: 3 frames × 200ms = loop (continuous rotating, linear easing)
- Attack: 2 frames × 150ms (swirling strike)
- Death: 1 frame × 300ms (dissipate)
**Feel:** Otherworldly, continuous rotation, shadow trail
Physics: Continuous rotation, shadowTrail true

**Corrupted Knight (corrupted_knight.json)**
- Idle: 2 frames × 400ms = loop (menacing stance)
- Walk: 2 frames × 300ms = 0.6 sec loop (armored, heavy)
- Attack: 2 frames × 120ms (corrupted power)
- Death: 1 frame × 400ms (spectacular)
**Feel:** Heavy, corrupted, threatening

**Warden (warden.json)**
- Idle: 2 frames × 450ms = loop (alert, watching)
- Patrol: 3 frames × 250ms = 0.75 sec loop (patrolling, medium pace)
- Attack: 2 frames × 150ms (guardian strike)
- Death: 1 frame × 350ms (disappear)
**Feel:** Armored guardian, protective stance
Physics: Continuous glow pulse (cyan runes)

---

## 👿 BOSS ANIMATIONS (Intimidating, heavy, impactful)

### Shadow Lord (shadow_lord.json)

**Idle:** 2 frames × 500ms = loop (breathing/pulsing, SLOW = powerful)
**Attack:** 3 frames × 150ms (boss-specific move, deliberate)
**Hit:** 1 frame × 150ms (flash white on damage)
**Phase Change:** 2 frames × 300ms @ 50% HP (intensity increase, slow build)
**Death:** 3 frames × 200ms (explosion + fade, dramatic)

**Feel:** Dark, imposing, slow but powerful
Physics: Aura pulse (amplitude 10px, frequency 1Hz), screen shake on attack (intensity 15)

### Void Rift (void_rift.json)

**Idle:** 3 frames × 200ms = loop (continuous rotation, linear easing = constant spin)
**Attack:** 2 frames × 120ms (quick vortex attack)
**Hit:** 1 frame × 150ms (cosmic flash)
**Phase Change:** 3 frames × 250ms @ 50% HP (intensified rotation)
**Death:** 4 frames × 180ms (cosmic explosion)

**Feel:** Cosmic, otherworldly, constantly spinning
Physics: Continuous CW rotation, particle emanation, screen shake on attack (intensity 20)

### Ancient One (ancient_one.json)

**Idle:** 2 frames × 600ms = loop (slowest, most imposing)
**Attack:** 3 frames × 140ms (tentacle sweep, powerful)
**Hit:** 1 frame × 150ms (cosmic flash)
**Phase Change:** 2 frames × 300ms @ 50% HP (tentacle intensify)
**Death:** 4 frames × 200ms (cosmic dissipation)

**Feel:** Eldritch, alien, powerful, slowest idle
Physics: Tentacle sweeping animation, cosmic glow pulsing, screen shake on attack (intensity 25 = MAX)

---

## ✨ PARTICLE ANIMATIONS (Fast, impactful, emphasize action)

**Slash Effect**
- Frames: 4
- Duration: 100ms per frame
- Lifetime: 400ms total
- Physics: Trajectory + gravity
- Easing: ease-out (FAST START, then slow)
- **Feel:** Quick blade impact

**Explosion Burst**
- Frames: 6
- Duration: 80ms per frame
- Lifetime: 480ms total
- Physics: Expanding burst
- Easing: ease-out
- **Feel:** Explosive impact

**Spark**
- Frames: 3
- Duration: 150ms per frame
- Lifetime: 450ms total
- Physics: Arc trajectory + gravity
- **Feel:** Electrical/fire effect

**Blood Drop**
- Frames: 2
- Duration: 200ms per frame
- Lifetime: 400ms total
- Physics: Gravity down
- **Feel:** Hit indicator

**Glow Ring**
- Frames: 4
- Duration: 150ms per frame
- Lifetime: 600ms total
- Physics: Expanding ring
- Easing: ease-in (SLOW EXPAND)
- **Feel:** Magic effect, buildup

**Lifesteal Flow**
- Frames: 3
- Duration: 100ms per frame
- Lifetime: 500ms total
- Physics: Move toward player
- **Feel:** Healing particles flowing to player

---

## 📊 ANIMATION DELIVERY CHECKLIST

### Character Animation Specs
- [ ] knight.json (5 states + transitions, SNAPPY attacks)
- [ ] witch.json (5 states + physics, SMOOTH floating)
- [ ] rogue.json (5 states + physics, FASTEST attacks)

### Enemy Animation Specs
- [ ] zombie.json (4 states, SLOW & predictable)
- [ ] spectre.json (4 states + physics, FLOATING bob)
- [ ] cultist.json (4 states, MEDIUM speed)
- [ ] vampire.json (4 states, FASTER than cultist)
- [ ] wraith.json (4 states + physics, CONTINUOUS rotation)
- [ ] corrupted_knight.json (4 states, HEAVY armor)
- [ ] warden.json (4 states + physics, GLOWING runes)

### Boss Animation Specs
- [ ] shadow_lord.json (5 states + phase change, IMPOSING slow)
- [ ] void_rift.json (5 states + phase change, COSMIC spin)
- [ ] ancient_one.json (5 states + phase change, ELDRITCH slow)

### Effects
- [ ] particles.json (6 particle types, FAST impacts)

**Total: 14 JSON files - ALL WITH PROPER TIMING FOR FEEL**

---

## 🎯 SUCCESS CRITERIA

✅ All JSON files valid syntax  
✅ Frame counts match sprite sheets exactly  
✅ All durations in milliseconds  
✅ Character attacks feel SNAPPY (rogue fastest, knight medium, witch slow)
✅ Boss animations feel IMPOSING (slow, heavy, screen shake)
✅ Particle effects feel IMPACTFUL (fast bursts, ease-out easing)
✅ Transitions are instant or interrupt (no lag)
✅ Screen shake intensities (boss > enemy, scale 0-25)
✅ Easing curves add personality (ease-in for buildup, ease-out for hits)
✅ Physics parameters realistic (gravity, rotation, trails)
✅ Ready to integrate into game.js immediately  

---

## 📁 WHERE TO SAVE

Create folder: `souls-of-abyss/animations/`

Save all 14 JSON files:
```
animations/
├── knight.json
├── witch.json
├── rogue.json
├── zombie.json
├── spectre.json
├── cultist.json
├── vampire.json
├── wraith.json
├── corrupted_knight.json
├── warden.json
├── shadow_lord.json
├── void_rift.json
├── ancient_one.json
└── particles.json
```

---

## ⏱️ TIMELINE

- Estimated time: 1-2 hours total
- Characters (3): ~20 min
- Regular enemies (3): ~15 min
- Elite enemies (4): ~15 min
- Bosses (3): ~20 min
- Particles: ~10 min
- Quality check: ~10 min

---

## 📝 TECHNICAL NOTES

- **Durations:** All in milliseconds (1000ms = 1 second)
- **Loop:** true = restart after last frame, false = play once
- **Easing:** "linear", "ease-in", "ease-out", "ease-in-out"
- **Transitions:** "immediate", "interrupt", "wait_complete"
- **Physics:** Describe gravity, acceleration, rotation, trails
- **Screen Shake:** 0-25 intensity scale
- **Particle Lifetime:** in milliseconds from spawn to despawn

### Timing Formula:
**Total animation duration = Frame count × Duration per frame**
- 4 frames × 250ms = 1000ms (1 second loop)
- 6 frames × 100ms = 600ms (0.6 second loop)
- 3 frames × 150ms = 450ms (0.45 second attack)

### Easing Impact:
- ease-out on attacks = FAST START, then slow (snappy feeling)
- ease-in on buildup = SLOW START, then fast (powerful feeling)
- linear on rotation = CONSTANT SPEED (hypnotic)

---

## 🚠 WORKFLOW

1. Dali generates sprites (PNG files)
2. Sonic creates animation specs (JSON files) ← **YOU ARE HERE**
3. Cody loads both into game.js
4. Game animates based on sprite + JSON metadata
5. Perfect smooth motion with personality! 🎬

---

**CRITICAL REMINDER:**

Timing is EVERYTHING. The same sprites with different timings feel completely different:
- Fast timings (60-100ms) = Responsive, snappy, fun
- Slow timings (300-600ms) = Powerful, imposing, impressive
- Wrong timings = Game feels laggy or broken

Your job: Make it FEEL RIGHT.

**Ready to create motion specs? Go! 🎬**