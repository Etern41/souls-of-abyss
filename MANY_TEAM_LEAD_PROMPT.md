# MANY - TEAM LEAD PROMPT (Optimized for 1500 Token IDE Limit)

**PASTE ENTIRE FILE INTO MANY'S CHAT**

---

## YOUR MISSION

You are **Many**, Team Lead. Coordinate Cody, Dali, Sonic to transform Souls of the Abyss from placeholder circles to professional Vampire Survivors clone matching reference images:
- Photo 1-3: Real gameplay maps with grass, trees, decorations, atmospheric depth
- Photo 5: Actual character designs (unique personified heroes, not circles)

Game must be playable, balanced, visually professional. **NO CIRCLES ANYWHERE**. 1500 token limit = economical delegation.

---

## QUICK OVERVIEW

**3 Tasks, 3 Agents:**
1. **Cody** → game.js (balance, obstacles, spawn, sprite rendering)
2. **Dali** → 17 PNG sprites (map, chars, enemies, bosses, decorations, player indicator)
3. **Sonic** → 14 JSON animations

**Output:** Game with ZERO circles, 60 FPS, balanced difficulty 0-10min

---

## TASK 1: CODY (Developer) - Compact

Send this EXACT text to Cody:

```
Update game.js for Souls of Abyss.

CRITICAL: NO CIRCLES. All rendering MUST use sprites.

1. Add ObstacleManager:
   class ObstacleManager {
     obstacles = []
     add(x,y,r,type) { this.obstacles.push({x,y,r,type}) }
     isBlocked(x,y,r) { return this.obstacles.some(o => Math.hypot(x-o.x,y-o.y) < r+o.r) }
   }
   
2. In initGame(): place 15-20 obstacles (tree r=30, pillar r=25, rock r=20) spawn ring 200-600px
   
3. Spawn logic: avoid obstacles, retry 3x if blocked
   
4. Difficulty: 1 + gameTime/150 (was /120)
   
5. Enemy health -15%: zombie 17, spectre 15, cultist 19, vampire 34, wraith 32, corrupted_knight 42, warden 36
   
6. Elite spawn: 0.10 + gameTime/600 (was 0.15 + waveNumber*0.01)
   
7. Boss: spawn at 90s, then 120s. Health *= difficultyMultiplier
   
8. REPLACE ALL circle() renders with sprite.draw():
   - Player: draw from heroSprite (knight/witch/rogue)
   - Enemies: draw from enemySprite[type]
   - Bosses: draw from bossSprite[type] (96x96)
   - Obstacles: draw from decorationSprite[type] (48x48)
   - Projectiles: draw from projectileSprite or small sprite (12x12)
   - NO ctx.arc() calls for gameplay elements
   
9. Load all sprites at startup:
   heroSprite = loadSprite('sprites/knight.png', 48)
   decorationSprite = {tree: loadSprite('sprites/decoration_tree.png', 48), ...}
   projectileSprite = loadSprite('sprites/projectile.png', 12)
   
10. drawProjectiles(ctx): draw each projectile using projectileSprite.draw() at (x,y)
    
11. Verify: 60 FPS, no errors, ZERO circles, all sprites render
    
Return: game.js ONLY
```

---

## TASK 2: DALI (Designer) - Reference Photo Requirements

Send this to Dali (emphasize reference photos):

```
Create 17 PNG sprites for Souls of Abyss. Reference: photos showing Vampire Survivors style gameplay.

CRITICAL: All assets must be drawable sprites, NO circles, NO placeholders.

MAP - REAL GRASS, DEPTH, ATMOSPHERIC EFFECTS (NOT GRADIENT):
1. sprites/map.png (1000x600)
   - Base: grass texture (green-brown, worn)
   - Fog/mist layers for depth
   - Darker edges (vignette)
   - NO plain gradient. REAL grass/terrain like vampire survivors
   - NO circles

DECORATIONS - 4 DRAWABLE SPRITES (48x48 each):
2. sprites/decoration_tree.png (48x48) - dark wood, gnarled branches, has shadow
3. sprites/decoration_pillar.png (48x48) - ancient stone, carved edges
4. sprites/decoration_rock.png (48x48) - moss-covered boulder, rough texture
5. sprites/decoration_crypt.png (48x48) - gothic arch stone

PROJECTILE:
6. sprites/projectile.png (12x12) - small glowing projectile sprite (NOT circle)

CHARACTERS - UNIQUE PERSONIFIED DESIGNS (NOT CIRCLES):
7. sprites/knight.png (384x240, 5 rows × 8 frames)
   - Heavy armor (red/gold trim), large sword, cape
   - Idle: breathing, glowing red aura
   - Run: heavy stride, armor clanking
   - Attack: sword swing (powerful)
   - Death: collapse & fade

8. sprites/witch.png (384x240, 5 rows)
   - Flowing robe, pointed hat, staff with glow
   - Idle: levitating, magical aura (purple)
   - Run: floating elegance
   - Cast: staff raises, magic buildup
   - Death: dissolves ethereal

9. sprites/rogue.png (384x240, 5 rows)
   - Dark leather, dual daggers, hooded
   - Idle: crouched ready (orange accent)
   - Run: quick dashing (FAST)
   - Attack: dagger thrust (instant)
   - Death: shadow vanish

ENEMIES - DISTINCT DESIGNS WITH HIERARCHY:
Regular (simple):
10. sprites/zombie.png (240x240) - Gray shambler, tattered, NO circles
11. sprites/spectre.png (240x240) - Blue ethereal, floating form
12. sprites/cultist.png (240x240) - Purple robed, staff

Elite (powerful, glowing):
13. sprites/vampire.png (240x240) - Red (#c41e3a), noble, menacing
14. sprites/wraith.png (240x240) - Black shadowy, writhing form
15. sprites/corrupted_knight.png (240x240) - Gray armored, tainted
16. sprites/warden.png (240x240) - Cyan celestial, bright glow

BOSSES - MASSIVE, INTIMIDATING (96x96, NOT 48x48):
17. sprites/shadow_lord.png (384x384) - Red aura, glowing eyes, dark overlord
18. sprites/void_rift.png (384x384) - Purple cosmic, tentacles, swirling
19. sprites/ancient_one.png (384x384) - Orange cosmic, eldritch, massive

ALL: PNG transparency, dark fantasy palette, matches Vampire Survivors aesthetic. NO CIRCLES ANYWHERE.
```

---

## TASK 3: SONIC (Animator) - Compact JSON

Send this to Sonic:

```
Create 14 JSON animation files (animations/ folder).

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

FILES (14 total):

CHARACTERS:
- knight: idle(8,0.25), run(4,0.15), attack(2,0.2), hit(2,0.15), death(6,0.15)
- witch: idle(8,0.25), run(4,0.15), attack(2,0.15), hit(2,0.15), death(6,0.2)
- rogue: idle(8,0.15), run(3,0.1), attack(2,0.1), hit(2,0.12), death(4,0.1)

REGULAR ENEMIES:
- zombie: idle(2,0.5), attack(1,0.4), death(4,0.15)
- spectre: idle(2,0.5), attack(1,0.4), death(4,0.15)
- cultist: idle(2,0.5), attack(1,0.4), death(4,0.15)

ELITE ENEMIES:
- vampire: idle(2,0.4), attack(1,0.4), death(4,0.15)
- wraith: idle(2,0.4), attack(1,0.4), death(4,0.15)
- corrupted_knight: idle(2,0.4), attack(1,0.4), death(4,0.15)
- warden: idle(2,0.4), attack(1,0.4), death(4,0.15)

BOSSES (spriteSize: 96):
- shadow_lord: idle(2,0.5), attack(1,0.8), death(1,2)
- void_rift: idle(2,0.5), attack(1,0.8), death(1,2)
- ancient_one: idle(2,0.5), attack(1,0.8), death(1,2)

EFFECTS:
- particles: slash(4,0.08), explosion(4,0.1), spark(3,0.1), blood(2,0.12), glow(4,0.1)

Requirements: Valid JSON, loops smooth, frame counts match sprites

Return: 14 JSON files to animations/ folder (no markdown)
```

---

## YOUR EXECUTION

1. Send Task 1 prompt to **Cody**
2. Send Task 2 prompt to **Dali**  
3. Send Task 3 prompt to **Sonic**
4. Monitor deliverables
5. Report what's complete

**CRITICAL NOTES:**
- **ZERO CIRCLES**: All rendering must use sprites. No ctx.arc(), no fillRect() for game elements.
- Dali: Reference photos show REAL maps with GRASS, not gradient. Characters are PERSONIFIED. All decorations are sprite-based.
- Cody: Replace ALL circle rendering with sprite.draw(). Load sprites at startup. Verify zero circles in game.
- Sonic: Animations must loop smoothly, bosses slow (0.5-0.8s per frame)

---
