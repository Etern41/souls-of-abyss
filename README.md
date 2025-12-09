# SOULS OF THE ABYSS - README

**A Dark Fantasy Vampire Survivors-like game built with Quadcode AI IDE agents.**

---

## 🎮 WHAT IS THIS?

Souls of the Abyss is a wave-based survival game where you:
- **Survive** waves of enemies for as long as possible
- **Collect** souls to level up weapons
- **Choose** from 3 unique characters with different playstyles
- **Defeat** bosses that spawn every 2 minutes
- **Master** 9 weapons with unique mechanics

**Built in Quadcode IDE using:**
- **Cody** (Developer) → Game logic & HTML structure
- **Dali** (Designer) → Character & enemy sprites
- **Sonic** (Motion) → Smooth animations
- **Jace** (QA) → Testing & optimization

---

## 🚀 QUICK START

### Prerequisites
- Quadcode AI IDE
- Agents: Cody, Dali, Sonic, Jace enabled
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup in Quadcode IDE

#### Step 1: Copy Game Code Prompts (Cody)
1. Open `PROMPTS.md` → Copy **PROMPT #1: GAME.JS**
2. Open **Cody** chat in Quadcode IDE
3. Paste the prompt
4. Wait for response (~30-60 seconds)
5. Copy entire response
6. Create file `game.js` in project root
7. Paste response into `game.js`
8. Repeat for **PROMPT #2: INDEX.HTML**

#### Step 2: Generate Sprites (Dali)
1. Open `PROMPTS.md` → Copy **PROMPT #3: SPRITE SHEETS**
2. Open **Dali** chat in Quadcode IDE
3. Paste the prompt
4. Wait for response (sprite generation takes 2-5 minutes)
5. Create folder `sprites/` in project root
6. Save all generated PNG files into `sprites/`

Expected files:
- `sprites/knight.png`, `witch.png`, `rogue.png` (characters)
- `sprites/zombie.png`, `spectre.png`, `cultist.png` (regular enemies)
- `sprites/vampire.png`, `wraith.png`, `corrupted_knight.png`, `warden.png` (elites)
- `sprites/shadow_lord.png`, `void_rift.png`, `ancient_one.png` (bosses)
- `sprites/particles.png`, `sprites/map.png` (effects & background)

#### Step 3: Generate Animation Specs (Sonic)
1. Open `PROMPTS.md` → Copy **PROMPT #4: ANIMATION SPECS**
2. Open **Sonic** chat in Quadcode IDE
3. Paste the prompt
4. Wait for response (JSON generation ~30 seconds)
5. Create folder `animations/` in project root
6. Save all generated JSON files into `animations/`

Expected files: 14 JSON files with animation timing specs

#### Step 4: Test in Browser
1. In Quadcode IDE, open **Web browsers** tab
2. Open `index.html`
3. Check browser console (F12) for "Souls of the Abyss loaded!" (green)
4. Click **Knight** button to start game
5. Use **WASD** to move, **E** to cast Godsayer Sword
6. Kill enemies, collect souls, survive waves
7. If any bugs, Jace will help debug

---

## 🎮 HOW TO PLAY

### Controls
- **WASD** — Move player
- **E** — Cast Godsayer Sword (costs 1 Essence charge, 100 dmg AOE)
- **Mouse** — Not used (auto-attack only)

### Game Mechanics

#### Characters
- **Knight:** Tanky, high armor, slow but strong
- **Witch:** Ranged, leveling scales better, magic-based
- **Rogue:** Fast, dodges, kill streak bonus (+15% DMG after 5 kills)

#### Enemies Spawn Every 30 Seconds
- **Difficulty scales** with time (enemies get stronger)
- **80% regular** (Zombie, Spectre, Cultist)
- **20% elite** (Vampire, Wraith, Corrupted Knight, Warden)

#### Bosses Spawn Every 120 Seconds
- **Shadow Lord** → **Void Rift** → **Ancient One** (rotation)
- Each boss is much stronger (200+ HP, 30+ DMG)
- Reward: Large soul drops for defeating boss

#### Weapons
- **Start:** Cursed Blade (basic attack)
- **Level 3+:** Unlock weapon evolution (choose from 9 total)
- **Each weapon unique:** AOE, lifesteal, projectiles, summons, etc.

#### Souls
- **Ethereal (white):** +10 XP (common)
- **Essence (gold):** +1 weapon charge (rare, 5 collected = 1 charge)
- **Corrupted (red):** +20 XP (from elite kills)
- **Cursed (black):** +50 XP (from boss kills)

#### Leveling
- **+1 level per 100 XP**
- **Knight:** +1 armor per level
- **Higher level:** Increases damage with all weapons

---

## 📊 GAME BALANCE

### 9 Weapons Overview

| Weapon | Type | Best For | Cost |
|--------|------|----------|------|
| Cursed Blade | Cone | Starting weapon | 0 |
| Shatterburst Axe | AOE | Group clearing | 0 |
| Soulreaver Dagger | Multi-hit | Lifesteal healing | 0 |
| Eternal Halberd | AOE+CC | Control & damage | 0 |
| Chaos Orb | Projectile | Range & pierce | 0 |
| Reaper's Scythe | AOE+Pull | Crowd control | 0 |
| Bloodmoon Lance | Beam | Sustained healing | 0 |
| Godsayer Sword | Massive | Burst damage | 1 Essence |
| Void Summoner | Summon | Passive damage | 2 Essence |

### Difficulty Curve
- **0-30 sec:** Easy (learn controls)
- **30-120 sec:** Moderate (enemies strengthen)
- **2-5 min:** Hard (waves get dense)
- **5+ min:** Extreme (many bosses + waves)

### Victory Conditions
There's no "winning" in this game — survival time and kill count are your score.

---

## 🛠️ PROJECT FILES

```
souls-of-abyss/
├── index.html                    ← Start here
├── game.js                       ← Game logic (from Cody)
├── GAME-DESIGN.md        ← Detailed specs
├── PROMPTS.md            ← Copy-paste prompts for agents
├── README.md                     ← This file
├── sprites/                      ← All visuals (from Dali)
│   ├── knight.png
│   ├── witch.png
│   ├── rogue.png
│   ├── zombie.png
│   ├── spectre.png
│   ├── cultist.png
│   ├── vampire.png
│   ├── wraith.png
│   ├── corrupted_knight.png
│   ├── warden.png
│   ├── shadow_lord.png
│   ├── void_rift.png
│   ├── ancient_one.png
│   ├── particles.png
│   └── map.png
└── animations/                   ← Animation specs (from Sonic)
    ├── knight.json
    ├── witch.json
    ├── rogue.json
    ├── zombie.json
    ├── ... (11 more)
    └── particles.json
```

---

## ✅ SUCCESS CHECKLIST

After setup, verify:

- [ ] `game.js` created and no console errors
- [ ] `index.html` opens in browser without errors
- [ ] All sprites visible in `sprites/` folder (15 PNG files)
- [ ] All animations loaded in `animations/` folder (14 JSON files)
- [ ] Click "Knight" button → Game starts
- [ ] WASD movement works
- [ ] Enemies spawn every ~30 seconds
- [ ] Collect souls and level up
- [ ] Boss appears at 120 seconds
- [ ] Press E to cast Godsayer Sword
- [ ] Death screen shows stats (survival time, kills, level)
- [ ] Game runs at ~60 FPS (smooth, not choppy)
- [ ] All sprites animate smoothly (no jank)

---

## 🐛 TROUBLESHOOTING

### "Souls of the Abyss loaded!" doesn't appear in console

**Problem:** game.js not loading
- Check that `game.js` is in project root
- Check HTML has `<script src="game.js"></script>` before `</body>`
- Open DevTools (F12) → Console tab for error messages

### Canvas is black / nothing visible

**Problem:** Rendering issue or sprites not loading
- Check that `sprites/` folder exists with all PNG files
- Check browser console for image loading errors
- Verify `map.png` is in `sprites/` folder

### Enemies don't spawn

**Problem:** gameLoop not running or spawnWave has bugs
- Check console for errors
- Verify `gameLoop()` is being called every frame
- Check `waveTimer` logic in game.js

### Sprites not showing (only circles)

**Problem:** Fallback mode active (sprites didn't load)
- This is normal! Game still works with shape fallback
- Verify sprite files are in `sprites/` folder
- Check image paths in HTML are correct

### Game is slow / low FPS

**Problem:** Too many particles or inefficient rendering
- Reduce particle count (edit `spawnParticles()` in game.js)
- Reduce max enemy count (edit `spawnWave()` limit)
- Close other browser tabs

### Death screen doesn't show

**Problem:** `showDeathScreen()` not called or modal CSS hidden
- Check game actually reaches `alive = false` state
- Press F12 → Console and check for errors when dying
- Verify `id="deathScreen"` exists in HTML

---

## 🎨 CUSTOMIZATION

### Adjust Difficulty
Edit in `game.js`:
```js
// Increase difficulty multiplier (higher = harder)
const difficultyMultiplier = 1 + (gameTime / 3); // was /4, now /3 = harder
```

### Change Weapon Balance
Edit weapon stats in `game.js`:
```js
new Weapon('CursedBlade', {
  damage: 12, // was 10
  fireRate: 1.1, // was 1
  range: 110
})
```

### Adjust Wave Spawning
Edit in `game.js`:
```js
// Spawn more enemies per wave
const count = 8 + (waveNumber * 3); // was 5 + (waveNumber * 2)
```

---

## 📈 PERFORMANCE SPECS

- **Target:** 60 FPS
- **Canvas:** 1000×600 resolution
- **Max entities:** 200 (enemies + particles)
- **Max particle pool:** 500
- **File size:** ~500KB total (sprites + code)

---

## 🏆 TIPS FOR HIGH SCORES

1. **Pick Knight** for survivability (easier to learn)
2. **Focus on Bloodmoon Lance** (50% lifesteal keeps you alive)
3. **Collect Essence souls** (save for Godsayer Sword burst)
4. **Keep moving** (don't get surrounded)
5. **Level up armor** (Knight passive defense)
6. **Use E ability** when facing bosses (big burst damage)
7. **Manage dodge cooldown** if playing Rogue
8. **Watch minimap** (HUD shows enemy count, plan position)

---

## 🔄 VERSION HISTORY

- **v1.0** (2025-12-09): Initial release
  - 3 characters, 9 weapons, 10 enemy types
  - Sprite animations from Dali
  - Motion specs from Sonic
  - Full Quadcode IDE integration

---

## ❓ FAQ

**Q: Do I need internet to play?**
A: No, game runs entirely in browser. Only during sprite/animation generation you need internet.

**Q: Can I modify the game?**
A: Yes! Edit `game.js` directly in Quadcode IDE. Changes apply immediately.

**Q: How long can I survive?**
A: Current record: ~10 minutes. After that, difficulty becomes extreme (50+ enemies on screen).

**Q: Are there power-ups?**
A: Souls are your only "power-up" (XP and weapon charges).

**Q: Why only Canvas, no WebGL?**
A: Canvas 2D is sufficient for this game and more compatible. WebGL overkill.

**Q: Can I add more weapons?**
A: Yes! Add new Weapon class in `game.js` and update weapon selection logic.

---

## 📞 SUPPORT

If issues arise:
1. Check **TROUBLESHOOTING** section above
2. Open DevTools (F12) → Console, look for error messages
3. Verify all files are in correct folders (`game.js`, `sprites/`, `animations/`)
4. Use **Jace** in Quadcode IDE to debug code issues

---

## 📜 LICENSE

This game was created as a test project for Quadcode AI IDE.
Feel free to modify, distribute, and learn from the code.

---

**Enjoy the game! 🎮✨**

Made with Quadcode AI IDE (Cody + Dali + Sonic + Jace)
