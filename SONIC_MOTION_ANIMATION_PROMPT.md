# ANIMATION MOTION SPECS PROMPT FOR SONIC (Motion Designer)

**For:** Sonic agent in Quadcode IDE  
**Task:** Create animation specifications (timing, easing, transitions)  
**Format:** JSON metadata files describing frame timings  
**Timeline:** ~1-2 hours total

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
**Run:** 6 frames × 100ms = 0.6 sec loop (legs moving)
**Attack:** 4 frames × 75ms = 0.3 sec (sword swing, no loop)
**Hit:** 2 frames × 100ms = 0.2 sec (knockback, no loop)
**Death:** 3 frames × 200ms = 0.6 sec (collapse, no loop)

Transitions: idle ↔ run (immediate), any → hit (interrupt), hit → idle (wait complete), any → death (interrupt)

### 2. Witch Animations (witch.json)

**Idle:** 4 frames × 300ms = 1.2 sec loop (levitation bob, ease-in-out)
**Run:** 6 frames × 120ms = 0.72 sec loop (floating)
**Cast:** 4 frames × 100ms = 0.4 sec (staff glow, no loop)
**Hit:** 2 frames × 120ms = 0.24 sec (sparkles, no loop)
**Death:** 3 frames × 250ms = 0.75 sec (dissipate, no loop)

Physics: Floating bob (amplitude 5px, frequency 2Hz)

### 3. Rogue Animations (rogue.json)

**Idle:** 2 frames × 400ms = 0.8 sec loop (crouch ready)
**Run:** 6 frames × 80ms = 0.48 sec loop (dash with blur)
**Attack:** 3 frames × 60ms = 0.18 sec (dagger thrust, no loop)
**Dodge:** 4 frames × 100ms = 0.4 sec (roll, no loop, invincibility frame 2)
**Death:** 2 frames × 150ms = 0.3 sec (vanish, no loop)

Physics: Dodge invincibility frame 2, dash speed 1.5x

---

## 👻 ENEMY ANIMATIONS

### Regular Enemies

**Zombie (zombie.json)**
- Idle: 1 frame × 500ms = loop
- Walk: 2 frames × 300ms = 0.6 sec loop
- Attack: 1 frame × 200ms
- Death: 1 frame × 300ms

**Spectre (spectre.json)**
- Idle: 2 frames × 400ms = loop (ease-in-out)
- Float: 2 frames × 300ms = loop
- Attack: 1 frame × 200ms
- Death: 1 frame × 400ms

Physics: Float bob (amplitude 8px, frequency 1.5Hz), fade on death

**Cultist (cultist.json)**
- Idle: 1 frame × 400ms = loop
- Walk: 2 frames × 250ms = 0.5 sec loop
- Attack: 1 frame × 200ms
- Death: 1 frame × 300ms

### Elite Enemies

**Vampire (vampire.json)**
- Idle: 2 frames × 350ms = loop
- Walk: 3 frames × 200ms = 0.6 sec loop
- Attack: 2 frames × 150ms
- Death: 1 frame × 400ms

**Wraith (wraith.json)**
- Idle: 2 frames × 500ms = loop
- Spiral: 3 frames × 200ms = loop (linear rotation)
- Attack: 2 frames × 150ms
- Death: 1 frame × 300ms

Physics: Continuous rotation, shadow trail

**Corrupted Knight (corrupted_knight.json)**
- Idle: 2 frames × 400ms = loop
- Walk: 2 frames × 300ms = 0.6 sec loop
- Attack: 2 frames × 120ms
- Death: 1 frame × 400ms

**Warden (warden.json)**
- Idle: 2 frames × 450ms = loop
- Patrol: 3 frames × 250ms = 0.75 sec loop
- Attack: 2 frames × 150ms
- Death: 1 frame × 350ms

Physics: Continuous glow pulse

---

## 👿 BOSS ANIMATIONS

### Shadow Lord (shadow_lord.json)

**Idle:** 2 frames × 500ms = loop (breathing/pulsing)
**Attack:** 3 frames × 150ms (boss-specific move)
**Hit:** 1 frame × 150ms (flash white)
**Phase Change:** 2 frames × 300ms @ 50% HP (intensity increase)
**Death:** 3 frames × 200ms (explosion + fade)

Physics: Aura pulse (amplitude 10px, frequency 1Hz), screen shake on attack (intensity 15)

### Void Rift (void_rift.json)

**Idle:** 3 frames × 200ms = loop (linear rotation)
**Attack:** 2 frames × 120ms
**Hit:** 1 frame × 150ms
**Phase Change:** 3 frames × 250ms @ 50% HP
**Death:** 4 frames × 180ms

Physics: Continuous CW rotation, particle emanation, screen shake on attack (intensity 20)

### Ancient One (ancient_one.json)

**Idle:** 2 frames × 600ms = loop
**Attack:** 3 frames × 140ms (tentacle sweep)
**Hit:** 1 frame × 150ms
**Phase Change:** 2 frames × 300ms @ 50% HP
**Death:** 4 frames × 200ms (cosmic dissipation)

Physics: Tentacle sweeping animation, cosmic glow pulsing, screen shake on attack (intensity 25)

---

## ✨ PARTICLE ANIMATIONS (particles.json)

**Slash Effect**
- Frames: 4
- Duration: 100ms per frame
- Lifetime: 400ms total
- Physics: Trajectory + gravity
- Easing: ease-out

**Explosion Burst**
- Frames: 6
- Duration: 80ms per frame
- Lifetime: 480ms total
- Physics: Expanding burst
- Easing: ease-out

**Spark**
- Frames: 3
- Duration: 150ms per frame
- Lifetime: 450ms total
- Physics: Arc trajectory + gravity

**Blood Drop**
- Frames: 2
- Duration: 200ms per frame
- Lifetime: 400ms total
- Physics: Gravity down

**Glow Ring**
- Frames: 4
- Duration: 150ms per frame
- Lifetime: 600ms total
- Physics: Expanding ring
- Easing: ease-in

**Lifesteal Flow**
- Frames: 3
- Duration: 100ms per frame
- Lifetime: 500ms total
- Physics: Move toward player

---

## 📊 ANIMATION DELIVERY CHECKLIST

### Character Animation Specs
- [ ] knight.json (5 states + transitions)
- [ ] witch.json (5 states + physics)
- [ ] rogue.json (5 states + physics)

### Enemy Animation Specs
- [ ] zombie.json (4 states)
- [ ] spectre.json (4 states + physics)
- [ ] cultist.json (4 states)
- [ ] vampire.json (4 states)
- [ ] wraith.json (4 states + physics)
- [ ] corrupted_knight.json (4 states)
- [ ] warden.json (4 states + physics)

### Boss Animation Specs
- [ ] shadow_lord.json (5 states + phase change + screen shake)
- [ ] void_rift.json (5 states + phase change + physics)
- [ ] ancient_one.json (5 states + phase change + physics)

### Effects
- [ ] particles.json (6 particle types with lifetime + physics)

**Total: 14 JSON files**

---

## 🎯 SUCCESS CRITERIA

✅ All JSON files valid syntax
✅ Frame counts match sprite sheets exactly
✅ All durations in milliseconds
✅ All states have clear transitions defined
✅ Physics/easing curves realistic
✅ Boss animations include phase changes @ 50% HP
✅ Particle specs include lifetime + trajectory
✅ Screen shake intensities specified (0-25 scale)
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

- **Durations:** All in milliseconds
- **Loop:** true = restart after last frame, false = play once
- **Easing:** "linear", "ease-in", "ease-out", "ease-in-out"
- **Transitions:** "immediate", "interrupt", "wait_complete"
- **Physics:** Describe gravity, acceleration, rotation, trails
- **Screen Shake:** 0-25 intensity scale
- **Particle Lifetime:** in milliseconds from spawn to despawn

---

## 🚠 WORKFLOW

1. Dali generates sprites (PNG files)
2. Sonic creates animation specs (JSON files) ← **YOU ARE HERE**
3. Cody loads both into game.js
4. Game animates based on sprite + JSON metadata
5. Perfect smooth motion! 🎯

---

**Notes:**
- Your output feeds directly into game.js
- Timing determines how "snappy" or "smooth" game feels
- Boss animations should feel powerful & intimidating
- Particle effects should emphasize impact
- Frame duration = milliseconds between frames
- Shorter duration = snappier animation
- Longer duration = smoother, heavier feel

**Ready to create motion specs? Go! 🎬**