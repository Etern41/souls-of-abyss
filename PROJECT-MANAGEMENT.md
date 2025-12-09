# SOULS OF THE ABYSS - PROJECT MANAGEMENT GUIDE (for Many, Team Leader)

**Role:** Team coordination, quality assurance, timeline management, integration testing.

---

## 🎯 YOUR RESPONSIBILITIES AS TEAM LEAD

### 1. PRE-GENERATION PHASE (Before agents work)

#### 1.1 Review Requirements
- [ ] Read `GAME-DESIGN.md` completely
- [ ] Understand 3 characters, 9 weapons, 10 enemy types
- [ ] Know animation states: idle, run, attack, hit, death
- [ ] Confirm sprite sheet format: 48×48 per frame, PNG indexed color
- [ ] Confirm animation JSON structure: frameCount, frameTime, loop flags

#### 1.2 Allocate Agents
- [ ] Assign **Cody** to game.js + index.html (Prompts #1, #2)
- [ ] Assign **Dali** to sprite generation (Prompt #3)
- [ ] Assign **Sonic** to animation specs (Prompt #4)
- [ ] Schedule staggered execution (code first, then visuals, then animations)

#### 1.3 Set Up Project Structure
```bash
# Create folders in Quadcode IDE project
mkdir sprites/
mkdir animations/
touch game.js
touch index.html
touch GAME-DESIGN.md
touch PROMPTS.md
touch README.md
```

#### 1.4 Prepare Backup Plan
- If Dali sprites fail → Use Canvas shape fallback
- If Sonic animations fail → Use placeholder JSON timing
- If Cody code has bugs → Have Jace ready for quick fixes

---

## 2. GENERATION PHASE (Agents working)

### 2.1 Cody Development Track

**Timeline:** 20-40 minutes total

**Step 1: game.js Generation (Cody)**
- Time: 30-60 sec generation + 2 min save = ~3 min
- Monitor:
  - [ ] No "TODO" comments in code
  - [ ] All 9 weapons defined with exact stats
  - [ ] Sprite class created (with fallback)
  - [ ] Animation state machine implemented
  - [ ] drawGame() uses ctx.drawImage() for sprites
  
**Checklist after Cody delivers game.js:**
```
✓ Vector2 class (distance, angle, normalize methods)
✓ Sprite class (update, getFrame, draw, fallback to shapes)
✓ Weapon class (9 weapons with exact mechanics)
✓ Player class (3 characters, animation states)
✓ Enemy class (10 types with animation states)
✓ Soul class (4 types with pickup logic)
✓ Particle class (5 types: slash, explosion, spark, blood, glow)
✓ gameState object (centralized state management)
✓ gameLoop() function (60 FPS update loop)
✓ drawGame() function (Canvas rendering with sprite support)
✓ spawnWave() function (30 sec timer, difficulty scaling)
✓ spawnBoss() function (120 sec timer, rotation)
✓ NO console errors when running game.js alone
```

**Step 2: index.html Generation (Cody)**
- Time: 20-40 sec generation + 2 min save = ~3 min
- Monitor:
  - [ ] Canvas 1000×600
  - [ ] Character select buttons (Knight, Witch, Rogue)
  - [ ] Hidden img tags for sprite preloading
  - [ ] HUD container with real-time updates
  - [ ] Death screen modal
  - [ ] WASD + E input handling
  - [ ] <script src="game.js"></script> before </body>

**Checklist after Cody delivers index.html:**
```
✓ <!DOCTYPE html> proper structure
✓ Canvas with id="gameCanvas" (1000×600)
✓ Character select buttons with onclick handlers
✓ Sprite preload img tags (knight, witch, rogue, enemies, bosses)
✓ HUD div with id="hud" (positioned absolutely)
✓ Death screen div with id="deathScreen" (modal)
✓ updateHUD() function (real-time updates)
✓ showDeathScreen() function (displays stats)
✓ selectChar(char) function (initializes game)
✓ animate() function (requestAnimationFrame loop)
✓ WASD input handling (keys object)
✓ E key handler (Godsayer Sword trigger)
✓ Inline CSS (dark theme, no external files)
✓ Inline JS (no external scripts except game.js)
✓ NO console errors when opening in browser
```

**Your action:** If any checklist items fail → Request Cody regenerate that section

---

### 2.2 Dali Design Track

**Timeline:** 2-5 minutes generation + upload

**Step 1: Sprite Generation (Dali)**
- Time: 2-5 min (depends on image model speed)
- Monitor output:
  - [ ] 3 character sprites (knight, witch, rogue)
  - [ ] 7 enemy sprites (zombie, spectre, cultist, vampire, wraith, corrupted_knight, warden)
  - [ ] 3 boss sprites (shadow_lord, void_rift, ancient_one)
  - [ ] 1 particle sprite sheet (slash, explosion, spark, blood, glow)
  - [ ] 1 map background sprite
  - **Total: 15 PNG files**

**Quality checks on sprites:**
```
✓ All PNGs have transparency (indexed color)
✓ File size reasonable (< 500KB total)
✓ Animation frames aligned horizontally
✓ Each sprite has all animation states (idle, run, attack, death minimum)
✓ No corruption, all images open without errors
✓ Colors match dark fantasy theme
✓ Character sprites easily distinguishable
✓ Boss sprites clearly larger (96×96 vs 48×48)
```

**Your action:**
1. Save all 15 PNG files to `sprites/` folder
2. Verify file list matches expected
3. Spot-check a few images for quality
4. If any corrupted → Ask Dali to regenerate that sprite

---

### 2.3 Sonic Animation Track

**Timeline:** 30-60 seconds generation + upload

**Step 1: Animation JSON Generation (Sonic)**
- Time: 30-60 sec generation
- Monitor output:
  - [ ] 3 character animation JSON (knight, witch, rogue)
  - [ ] 7 enemy animation JSON (zombie, spectre, cultist, vampire, wraith, corrupted_knight, warden)
  - [ ] 3 boss animation JSON (shadow_lord, void_rift, ancient_one)
  - [ ] 1 particle animation JSON
  - **Total: 14 JSON files**

**Quality checks on animations:**
```
✓ All JSON files valid syntax (no parse errors)
✓ Each animation state has frameCount, frameTime, loop flag
✓ Frame counts match sprite sheets (knight idle = 8 frames, etc.)
✓ Frame times logical (0.1-0.5 seconds per frame)
✓ Loop flags correct (idle/run = true, attack/death = false)
✓ Transition rules make sense (attack → idle, not attack → run)
✓ Boss animations slower than regular enemies
✓ NO animation state lasts < 0.1s or > 3s
```

**Your action:**
1. Save all 14 JSON files to `animations/` folder
2. Open a few JSON files, verify valid syntax
3. Spot-check frame counts match GAME-DESIGN
4. If any syntax errors → Ask Sonic to regenerate

---

## 3. INTEGRATION PHASE (All files ready)

### 3.1 File Structure Verification

```bash
# After all agents finish, verify this structure exists:
souls-of-abyss/
├── game.js                    ✓ 1200 lines, no TODOs
├── index.html                 ✓ 600 lines, Canvas setup
├── GAME-DESIGN.md     ✓ Design doc
├── PROMPTS.md         ✓ All 4 prompts
├── README.md          ✓ User guide
├── sprites/
│   ├── knight.png             ✓ Character
│   ├── witch.png              ✓ Character
│   ├── rogue.png              ✓ Character
│   ├── zombie.png             ✓ Regular enemy
│   ├── spectre.png            ✓ Regular enemy
│   ├── cultist.png            ✓ Regular enemy
│   ├── vampire.png            ✓ Elite enemy
│   ├── wraith.png             ✓ Elite enemy
│   ├── corrupted_knight.png   ✓ Elite enemy
│   ├── warden.png             ✓ Elite enemy
│   ├── shadow_lord.png        ✓ Boss
│   ├── void_rift.png          ✓ Boss
│   ├── ancient_one.png        ✓ Boss
│   ├── particles.png          ✓ Effects
│   └── map.png                ✓ Background
└── animations/
    ├── knight.json            ✓ Character animations
    ├── witch.json             ✓ Character animations
    ├── rogue.json             ✓ Character animations
    ├── zombie.json            ✓ Enemy animations
    ├── spectre.json           ✓ Enemy animations
    ├── cultist.json           ✓ Enemy animations
    ├── vampire.json           ✓ Elite animations
    ├── wraith.json            ✓ Elite animations
    ├── corrupted_knight.json  ✓ Elite animations
    ├── warden.json            ✓ Elite animations
    ├── shadow_lord.json       ✓ Boss animations
    ├── void_rift.json         ✓ Boss animations
    ├── ancient_one.json       ✓ Boss animations
    └── particles.json         ✓ Effect animations
```

**Verification command (in Quadcode IDE Console):**
```bash
ls -la sprites/ | wc -l  # Should be 15 files
ls -la animations/ | wc -l  # Should be 14 files
wc -l game.js  # Should be ~1200 lines
wc -l index.html  # Should be ~600 lines
```

**Your action:** Confirm all 42 files present before testing

---

### 3.2 Browser Testing

**Open index.html in Web browser:**

```
1. Open Quadcode IDE → Web browsers tab
2. Load index.html
3. Open DevTools (F12) → Console tab
4. Check for:
   ✓ "Souls of the Abyss loaded!" (green)
   ✓ No red error messages
   ✓ No 404 sprite not found errors
```

**If no errors → Continue to Step 2**

**If errors appear → Document and escalate:**
- Sprite loading error → Check sprites/ folder
- Animation JSON parse error → Ask Sonic to recheck JSON
- game.js undefined function → Ask Cody to fix bug
- image path wrong → Update img src in index.html

---

### 3.3 Gameplay Testing (5 minutes)

**Test sequence:**

```
1. Click "Knight" button
   ✓ Game should start
   ✓ Player visible on canvas
   ✓ HUD shows HP, Level, Time

2. Press WASD keys
   ✓ Player moves smoothly
   ✓ Animation plays (run vs idle)
   ✓ No jank or lag

3. Wait 30 seconds
   ✓ First wave of enemies spawns
   ✓ Enemies animate (walk/attack)
   ✓ Enemies move toward player

4. Kill 5-10 enemies
   ✓ Souls appear (collectible)
   ✓ Player collects souls automatically
   ✓ XP/Level increases

5. Wait 120 seconds
   ✓ First boss spawns
   ✓ Boss sprite visible
   ✓ Boss animation plays

6. Press E key
   ✓ Godsayer Sword activates (if have essence)
   ✓ Large AOE damage visible
   ✓ Particles spawn (explosions)

7. Let player die
   ✓ Death animation plays
   ✓ Death screen modal appears
   ✓ Stats shown (survive time, kills, level, best weapon)
   ✓ "Restart" button visible

8. Click "Restart"
   ✓ New game starts
   ✓ Stats reset
   ✓ Everything works again
```

**Your action:** If any step fails → Document and send to respective agent for fix

---

## 4. QUALITY ASSURANCE CHECKLIST

### 4.1 Performance Testing

**Test with DevTools open:**

```
Open DevTools → Performance tab → Record 30 seconds → Check:
✓ Average FPS ≥ 55 (target 60)
✓ Frame time ≤ 16.7ms (1000ms / 60 FPS)
✓ No dropped frames during wave spawn
✓ No memory leak (RAM stable after 5 min)
✓ CPU usage < 80%
```

**If FPS < 55:**
- [ ] Ask Cody to optimize particle cleanup
- [ ] Ask Cody to reduce enemy spawn count
- [ ] Ask Cody to use spatial partitioning for collisions

### 4.2 Visual Quality Testing

**Check each entity:**

```
Characters:
✓ Knight: Red armor, clear idle/run/attack animation
✓ Witch: Purple robes, levitation movement, casting animation
✓ Rogue: Dark silhouette, quick movements, dodge animation

Enemies:
✓ Zombie: Gray, shambling walk, clear death
✓ Boss: Much larger, intimidating, smooth animations
✓ Particles: Smooth fade-out, not popping

Map:
✓ Gradient background visible
✓ Pillars placed around arena
✓ No clipping or visual glitches
```

**If visual issues:**
- [ ] Ask Dali to regenerate sprite
- [ ] Ask Sonic to fix animation timing
- [ ] Ask Cody to verify sprite loading code

### 4.3 Audio/Feedback Testing

```
✓ Particle effects spawn on damage
✓ HUD updates real-time (HP, Level, Time)
✓ Boss timer countdown visible
✓ Essence charge counter works
✓ Death screen stats accurate
```

---

## 5. BUG TRACKING & FIXES

### Common Bugs & Escalation

| Bug | Symptom | Escalate To | Fix Time |
|-----|---------|-------------|----------|
| Sprites not loading | Black shapes | Cody | 5 min |
| Animation stuck | Sprite not moving | Sonic | 10 min |
| Enemies spawn wrong | Too many/few | Cody | 15 min |
| Weapon damage wrong | Kills too slow/fast | Cody | 10 min |
| Death screen error | Stats show 0 | Cody | 10 min |
| FPS drops | Game slows at 50 enemies | Cody | 20 min |
| Sprite corruption | Image won't load | Dali | 5 min |
| Animation JSON syntax | Console error | Sonic | 5 min |

### Escalation Template

**If bug found, use this format:**

```
BUG REPORT
-----------
Title: [Bug name]
Status: OPEN
Severity: [Critical/High/Medium/Low]

Symptoms:
- [What happens]
- [When it happens]
- [How to reproduce]

Expected:
- [What should happen]

Console Error:
- [Exact error message]

Screenshots:
- [Describe visual issue]

Escalate To: [Cody/Dali/Sonic/Jace]
Estimated Fix: [Time]
```

---

## 6. TIMELINE & MILESTONES

### Full Project Timeline

```
Phase 1: Pre-Generation (5 min)
  - [ ] Review requirements
  - [ ] Allocate agents
  - [ ] Set up folder structure

Phase 2: Agent Generation (15 min)
  - [ ] Cody: game.js (3 min)
  - [ ] Cody: index.html (3 min)
  - [ ] Dali: Sprites (5 min) [parallel]
  - [ ] Sonic: Animation JSON (2 min) [parallel]

Phase 3: Integration (5 min)
  - [ ] Verify file structure
  - [ ] Check file counts
  - [ ] Verify no corruptions

Phase 4: Testing (10 min)
  - [ ] Browser load test
  - [ ] 5-min gameplay test
  - [ ] Performance check
  - [ ] Quality review

Phase 5: Bug Fixes (10-30 min)
  - [ ] Identify bugs
  - [ ] Escalate to agents
  - [ ] Retest

TOTAL: 45-90 minutes for full game

Contingency: If bugs found, add 30 min
Final delivery: ~75-120 minutes total
```

### Milestone Checklist

```
✅ M1: All 4 prompts executed (agent outputs received)
✅ M2: 42 files in correct folders
✅ M3: Browser loads without errors
✅ M4: Gameplay works (Knight character playable)
✅ M5: All 3 characters playable
✅ M6: All 9 weapons functional
✅ M7: All 10 enemies spawn correctly
✅ M8: Bosses appear every 120 seconds
✅ M9: Performance ≥ 55 FPS
✅ M10: Death screen works
✅ M11: Ready for GitHub push
```

---

## 7. SIGN-OFF & DELIVERY

### Final Verification Checklist (Before Release)

**Gameplay:**
- [ ] 3 characters fully playable
- [ ] 9 weapons all work
- [ ] 10 enemies spawn with correct stats
- [ ] 3 bosses appear every 120 sec
- [ ] Leveling system works
- [ ] Death screen accurate
- [ ] Restart works

**Technical:**
- [ ] 60 FPS maintained (min 55)
- [ ] No console errors
- [ ] All sprites load correctly
- [ ] All animations play smoothly
- [ ] No memory leaks
- [ ] Game playable for 10+ minutes

**Visual:**
- [ ] Dark fantasy aesthetic consistent
- [ ] Characters distinguishable
- [ ] Bosses clearly threatening
- [ ] Particles visible and smooth
- [ ] HUD readable

**Documentation:**
- [ ] README.md complete
- [ ] PROMPTS.md accurate
- [ ] GAME-DESIGN.md matches implementation
- [ ] Comments in code clear

**When all ✓:** APPROVED FOR RELEASE

---

## 8. POST-RELEASE MAINTENANCE

### Monitor After Release

```
Week 1:
- [ ] Check user feedback (if public)
- [ ] Monitor performance reports
- [ ] Collect balance suggestions (too easy/hard)
- [ ] Track any crash reports

Optimization Candidates:
- [ ] Reduce particle count if FPS drops
- [ ] Adjust difficulty multiplier if too hard/easy
- [ ] Optimize sprite loading if slow
- [ ] Add more weapon variety if requested
```

---

## 9. TEAM COMMUNICATION

### Daily Standup Template

```
📊 Status Update
Date: [Date]
Lead: Many (Team Lead)

✅ Completed:
- Cody finished game.js
- Dali generated sprites
- Integration testing passed

🔄 In Progress:
- Sonic finalizing animations
- Jace reviewing code

⚠️ Blockers:
- [If any]

📅 Next Steps:
- [For tomorrow]

📞 Team Contacts:
- Cody: game logic, bugs
- Dali: sprite issues
- Sonic: animation timing
- Jace: performance, QA
```

---

## 10. REFERENCE DOCUMENTS

- **GAME-DESIGN.md** — Design specifications
- **PROMPTS.md** — Agent prompts
- **README.md** — User guide

---

**As Team Lead, your job is to:**
1. Keep agents focused on scope
2. Verify quality at each stage
3. Flag bugs immediately
4. Coordinate timeline
5. Deliver polished product

**Good luck! 🚀**
