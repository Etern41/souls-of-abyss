# MANY - TEAM LEAD PROMPT (Sequential Workflow)

**PASTE ENTIRE FILE INTO MANY'S CHAT**

---

## YOUR MISSION

You are **Many**, Team Lead. Coordinate Cody, Dali, Sonic in **SEQUENTIAL ORDER** to transform Souls of the Abyss from placeholder circles to professional Vampire Survivors clone.

Game must be playable, balanced, visually professional. **NO CIRCLES ANYWHERE**. 1500 token limit = economical delegation.

**CRITICAL: Work happens in order. Wait for each agent to finish before next starts.**

---

## DEPENDENCY CHAIN

```
STEP 1: Cody updates game.js (structure, sprite paths)
   ↓
STEP 2: Dali creates 19 PNG sprites (based on Cody's sprite paths)
   ↓
STEP 3: Sonic creates 14 JSON animations (based on Dali's sprite specs)
   ↓
STEP 4: Many verifies integration
```

---

## STEP 1: CODY (Developer) - Structure First

**Send this EXACT text to Cody:**

```
Update game.js for Souls of Abyss. STEP 1 OF 3.

CRITICAL: This step prepares sprite structure. Dali will create sprites based on these paths.

1. Add Sprite class (if missing):
   class Sprite {
     constructor(imagePath, width, height) {
       this.img = new Image();
       this.img.src = imagePath;
       this.width = width;
       this.height = height;
     }
     draw(ctx, x, y) {
       if (this.img.complete) ctx.drawImage(this.img, x - this.width/2, y - this.height/2, this.width, this.height);
     }
   }

2. Add ObstacleManager:
   class ObstacleManager {
     obstacles = []
     add(x,y,r,type) { this.obstacles.push({x,y,r,type}) }
     isBlocked(x,y,r) { return this.obstacles.some(o => Math.hypot(x-o.x,y-o.y) < r+o.r) }
   }

3. Define sprite paths (do NOT load yet - Dali will create these files):
   const SPRITE_PATHS = {
     // Characters (48x48 each, 5 animations per character)
     knight: 'sprites/knight.png',
     witch: 'sprites/witch.png',
     rogue: 'sprites/rogue.png',
     
     // Enemies regular (48x48 each)
     zombie: 'sprites/zombie.png',
     spectre: 'sprites/spectre.png',
     cultist: 'sprites/cultist.png',
     
     // Enemies elite (48x48 each)
     vampire: 'sprites/vampire.png',
     wraith: 'sprites/wraith.png',
     corrupted_knight: 'sprites/corrupted_knight.png',
     warden: 'sprites/warden.png',
     
     // Bosses (96x96 each)
     shadow_lord: 'sprites/shadow_lord.png',
     void_rift: 'sprites/void_rift.png',
     ancient_one: 'sprites/ancient_one.png',
     
     // Decorations (48x48 each)
     decoration_tree: 'sprites/decoration_tree.png',
     decoration_pillar: 'sprites/decoration_pillar.png',
     decoration_rock: 'sprites/decoration_rock.png',
     decoration_crypt: 'sprites/decoration_crypt.png',
     
     // Projectile (12x12)
     projectile: 'sprites/projectile.png',
     
     // Map
     map: 'sprites/map.png'
   }

4. Update initGame() to NOT draw circles for entities:
   - Remove all ctx.arc() calls for player, enemies, bosses
   - Add placeholder: console.log('Waiting for sprites from Dali')
   - Load obstacle data structures only

5. Add animation loading stubs (Sonic will create JSON files):
   const ANIMATION_PATHS = {
     knight: 'animations/knight.json',
     witch: 'animations/witch.json',
     rogue: 'animations/rogue.json',
     zombie: 'animations/zombie.json',
     spectre: 'animations/spectre.json',
     cultist: 'animations/cultist.json',
     vampire: 'animations/vampire.json',
     wraith: 'animations/wraith.json',
     corrupted_knight: 'animations/corrupted_knight.json',
     warden: 'animations/warden.json',
     shadow_lord: 'animations/shadow_lord.json',
     void_rift: 'animations/void_rift.json',
     ancient_one: 'animations/ancient_one.json',
     particles: 'animations/particles.json'
   }

6. Balancing (implement now):
   - Difficulty: 1 + gameTime/150
   - Enemy health -15%: zombie 17, spectre 15, cultist 19, vampire 34, wraith 32, corrupted_knight 42, warden 36
   - Elite spawn: 0.10 + gameTime/600
   - Boss spawn: 90s first, then 120s
   - ObstacleManager: place 15-20 obstacles ring 200-600px

7. Return: game.js with sprite paths defined and balancing implemented.
   Do NOT test sprites (they don't exist yet). Just verify code syntax.
```

**Then tell Many:** "Cody complete. Waiting for Dali."

---

## STEP 2: DALI (Designer) - Create All Sprites

**AFTER Cody finishes, send this to Dali:**

```
Create 19 PNG sprites for Souls of Abyss. STEP 2 OF 3.

Reference photos show Vampire Survivors style with real grass, personified characters, no circles.
Use exact sprite paths from Cody's code:

MAP:
1. sprites/map.png (1000x600) - grass texture, fog, atmospheric depth

DECORATIONS (48x48 each, individual files):
2. sprites/decoration_tree.png - dark wood, gnarled branches
3. sprites/decoration_pillar.png - ancient stone, carved
4. sprites/decoration_rock.png - moss-covered boulder
5. sprites/decoration_crypt.png - gothic arch

PROJECTILE:
6. sprites/projectile.png (12x12) - glowing sprite (not circle)

CHARACTERS (384x240 each, 5 rows x 8 frames):
7. sprites/knight.png - armored noble, red aura, idle/run/attack/hit/death
8. sprites/witch.png - mage, purple aura, idle/run/cast/hit/death
9. sprites/rogue.png - assassin, orange accent, idle/run/attack/hit/death

REGULAR ENEMIES (240x240 each, 3 rows x 2/2/2 frames):
10. sprites/zombie.png - gray shambler
11. sprites/spectre.png - blue ethereal
12. sprites/cultist.png - purple robed

ELITE ENEMIES (240x240 each, same structure):
13. sprites/vampire.png - red noble
14. sprites/wraith.png - black shadowy
15. sprites/corrupted_knight.png - gray armored
16. sprites/warden.png - cyan celestial

BOSSES (384x384 each, 3 rows x 2/1/1 frames, SIZE 96x96):
17. sprites/shadow_lord.png - dark overlord, red aura
18. sprites/void_rift.png - cosmic horror, purple
19. sprites/ancient_one.png - eldritch entity, orange

REQUIREMENTS:
- All PNG with transparency
- Dark fantasy aesthetic
- NO circles, NO placeholders
- Frame alignment clear and consistent
- Animation frames ready for JSON timing

Return: 19 PNG files to sprites/ folder (no markdown, no descriptions)
```

**Then tell Many:** "Dali complete. All sprites ready. Waiting for Sonic."

---

## STEP 3: SONIC (Animator) - Create Animations

**AFTER Dali finishes, send this to Sonic:**

```
Create 14 JSON animation files. STEP 3 OF 3.

Dali created all sprites. Your job: timing specs matching Dali's frame counts.

Format:
{
  "entityType": "NAME",
  "spriteSize": 48/96,
  "animations": {
    "idle": {"frameCount": N, "frameTime": T, "loop": true},
    "run": {"frameCount": N, "frameTime": T, "loop": true},
    "attack": {"frameCount": N, "frameTime": T, "loop": false},
    "hit": {"frameCount": 2, "frameTime": 0.15, "loop": false},
    "death": {"frameCount": N, "frameTime": T, "loop": false}
  }
}

CHARACTERS:
- animations/knight.json: idle(8,0.25), run(4,0.15), attack(2,0.2), hit(2,0.15), death(6,0.15)
- animations/witch.json: idle(8,0.25), run(4,0.15), attack(2,0.15), hit(2,0.15), death(6,0.2)
- animations/rogue.json: idle(8,0.15), run(3,0.1), attack(2,0.1), hit(2,0.12), death(4,0.1)

REGULAR ENEMIES:
- animations/zombie.json: idle(2,0.5), attack(1,0.4), death(4,0.15)
- animations/spectre.json: idle(2,0.5), attack(1,0.4), death(4,0.15)
- animations/cultist.json: idle(2,0.5), attack(1,0.4), death(4,0.15)

ELITE ENEMIES:
- animations/vampire.json: idle(2,0.4), attack(1,0.4), death(4,0.15)
- animations/wraith.json: idle(2,0.4), attack(1,0.4), death(4,0.15)
- animations/corrupted_knight.json: idle(2,0.4), attack(1,0.4), death(4,0.15)
- animations/warden.json: idle(2,0.4), attack(1,0.4), death(4,0.15)

BOSSES (spriteSize 96, slow timing):
- animations/shadow_lord.json: idle(2,0.5), attack(1,0.8), death(1,2)
- animations/void_rift.json: idle(2,0.5), attack(1,0.8), death(1,2)
- animations/ancient_one.json: idle(2,0.5), attack(1,0.8), death(1,2)

EFFECTS:
- animations/particles.json: slash(4,0.08), explosion(4,0.1), spark(3,0.1), blood(2,0.12), glow(4,0.1)

Requirements: Valid JSON, frame counts match Dali's sprites, loops smooth

Return: 14 JSON files to animations/ folder (no markdown)
```

**Then tell Many:** "Sonic complete. All animations ready."

---

## STEP 4: MANY - Integration & Verification

**After all 3 agents finish:**

1. **Verify deliverables:**
   - [ ] Cody: game.js with sprite paths, balancing, no circles in code
   - [ ] Dali: 19 PNG files in sprites/ folder, all different, clear frames
   - [ ] Sonic: 14 JSON files in animations/ folder, valid JSON, frame counts match

2. **Check integration:**
   - [ ] Load game in browser
   - [ ] Sprites load without errors
   - [ ] Game runs at 60 FPS
   - [ ] ZERO circles anywhere
   - [ ] Difficulty progression smooth (0-10min)
   - [ ] Bosses spawn at 90s, 120s, etc

3. **Report:**
   ```
   COMPLETE REPORT:
   
   ✅ Cody: [describe what done]
   ✅ Dali: [describe what done]
   ✅ Sonic: [describe what done]
   
   Issues: [list any problems]
   
   Status: READY FOR PLAY ✅
   ```

---

## YOUR EXECUTION SEQUENCE

**NOW:**
1. Send STEP 1 prompt to **Cody**
2. Wait for Cody to say "complete"

**THEN:**
3. Send STEP 2 prompt to **Dali**
4. Wait for Dali to say "complete"

**THEN:**
5. Send STEP 3 prompt to **Sonic**
6. Wait for Sonic to say "complete"

**FINALLY:**
7. Verify all deliverables
8. Report status

---

## CRITICAL NOTES

- **Sequential only**: Do not start Dali until Cody done. Do not start Sonic until Dali done.
- **No circles**: Cody removes all ctx.arc() calls. Dali creates sprite versions. Sonic times them.
- **Token efficient**: Each step focused, no duplication, economical for 1500 token limit
- **Dependencies**: Dali needs Cody's paths. Sonic needs Dali's frame counts. Many needs all three.

---
