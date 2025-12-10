class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const len = this.length() || 1;
    this.x /= len;
    this.y /= len;
    return this;
  }

  distance(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  angle(other) {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }

  static fromAngle(angle, magnitude = 1) {
    return new Vector2(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude);
  }
}

let CANVAS_WIDTH = 1000;
let CANVAS_HEIGHT = 600;
const TARGET_DELTA = 1 / 60;
const DEG_TO_RAD = Math.PI / 180;
const DEFAULT_ANIMATION = {
  animations: {
    idle: { frameCount: 1, frameTime: 1, loop: true },
    run: { frameCount: 1, frameTime: 1, loop: true },
    attack: { frameCount: 1, frameTime: 1, loop: false },
    hit: { frameCount: 1, frameTime: 1, loop: false },
    death: { frameCount: 1, frameTime: 1, loop: false }
  }
};
const MAP_IMAGE = new Image();
MAP_IMAGE.src = 'sprites/map.png';
let mapLoaded = false;
MAP_IMAGE.onload = () => {
  mapLoaded = true;
};
const SURVIVAL_TARGET = 600; // seconds to "win"

const CHARACTER_DEFS = {
  knight: {
    maxHealth: 100,
    baseDamage: 12,
    range: 110,
    speed: 200,
    armor: 5,
    spriteSize: 56,
    aura: '#4da3ff',
    playstyle: 'melee'
  },
  witch: {
    maxHealth: 70,
    baseDamage: 8,
    range: 140,
    speed: 180,
    armor: 2,
    spriteSize: 56,
    aura: '#a66bff',
    playstyle: 'ranged'
  },
  rogue: {
    maxHealth: 85,
    baseDamage: 10,
    range: 90,
    speed: 250,
    armor: 3,
    spriteSize: 56,
    dodgeChance: 0.1,
    aura: '#ff7b5f',
    playstyle: 'assassin'
  }
};

const ENEMY_DEFS = {
  zombie: { health: 20, damage: 5, speed: 80, color: '#9da3a4', elite: false, move: 'walk' },
  spectre: { health: 18, damage: 4, speed: 90, color: '#4db1e8', elite: false, move: 'spiral' },
  cultist: { health: 22, damage: 6, speed: 100, color: '#a347d6', elite: false, move: 'walk' },
  vampire: { health: 40, damage: 10, speed: 120, color: '#c41e3a', elite: true, move: 'fly' },
  wraith: { health: 38, damage: 9, speed: 110, color: '#1a1a1f', elite: true, move: 'fly' },
  corrupted_knight: { health: 50, damage: 15, speed: 60, color: '#4e5b6e', elite: true, move: 'walk' },
  warden: { health: 42, damage: 11, speed: 100, color: '#0ad1ff', elite: true, move: 'spiral' }
};

const BOSS_DEFS = {
  shadow_lord: { health: 200, damage: 30, speed: 80, spriteSize: 96, color: '#ff304f' },
  void_rift: { health: 250, damage: 35, speed: 70, spriteSize: 96, color: '#1b0326' },
  ancient_one: { health: 300, damage: 40, speed: 75, spriteSize: 96, color: '#ff9f1c' }
};

const SOUL_TYPES = {
  ethereal: { xp: 10, color: '#f3f6ff' },
  essence: { xp: 0, color: '#ffd95a', essence: 1 },
  corrupted: { xp: 20, color: '#b21f35' },
  cursed: { xp: 50, color: '#0d0d0d' }
};

const LEVEL_WEAPON_UNLOCK = [
  'ShatterburstAxe',
  'SoulreaverDagger',
  'EternalHalberd',
  'ChaosOrb',
  'ReapersScythe',
  'BloodmoonLance',
  'VoidSummoner'
];

const LEVEL_UP_POOL = [
  { id: 'dmg', title: '+15% Damage', desc: 'All weapons hit harder' },
  { id: 'speed', title: '+10% Move Speed', desc: 'Faster movement' },
  { id: 'armor', title: '+1 Armor', desc: 'Reduces incoming damage' },
  { id: 'heal', title: 'Recover 30% HP', desc: 'Instant heal' },
  { id: 'essence', title: '+1 Essence Charge', desc: 'Cast Godsayer sooner' },
  { id: 'firerate', title: '+10% Fire Rate', desc: 'Auto weapons fire quicker' }
];

const spriteCache = {};
const animationCache = {};

function getAnimationPath(name) {
  return `animations/${name}.json`;
}

function getSprite(name, spriteSize = 48) {
  if (spriteCache[name]) {
    return spriteCache[name];
  }
  const sprite = new Sprite(
    name,
    `sprites/${name}.png`,
    spriteSize,
    spriteSize,
    getAnimationPath(name)
  );
  spriteCache[name] = sprite;
  return sprite;
}

function loadAnimationData(name) {
  if (animationCache[name]) {
    return animationCache[name];
  }
  animationCache[name] = DEFAULT_ANIMATION;
  fetch(getAnimationPath(name))
    .then((resp) => resp.json())
    .then((data) => {
      animationCache[name] = data.animations ? data : { animations: data };
    })
    .catch(() => {
      animationCache[name] = DEFAULT_ANIMATION;
    });
  return animationCache[name];
}

class Sprite {
  constructor(name, imageUrl, frameWidth, frameHeight, animationPath) {
    this.name = name;
    this.image = new Image();
    this.image.src = imageUrl;
    this.imageLoaded = false;
    this.imageFailed = false;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
    this.image.onerror = () => {
      this.imageFailed = true;
    };
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.animationData = loadAnimationData(name) || DEFAULT_ANIMATION;
    this.currentState = 'idle';
    this.animationTime = 0;
    this.frameIndex = 0;
    this.colorFallback = '#ffffff';
    this.animationPath = animationPath;
    this.refreshAnimation();
  }

  refreshAnimation() {
    fetch(this.animationPath)
      .then((resp) => resp.json())
      .then((data) => {
        this.animationData = data.animations ? data : { animations: data };
      })
      .catch(() => {
        this.animationData = DEFAULT_ANIMATION;
      });
  }

  update(dt, desiredState = 'idle') {
    if (this.currentState !== desiredState) {
      this.currentState = desiredState;
      this.animationTime = 0;
    } else {
      this.animationTime += dt;
    }
    const animSpec = this.getAnimationSpec(this.currentState);
    const totalDuration = animSpec.frameCount * animSpec.frameTime;
    if (animSpec.loop) {
      this.animationTime = this.animationTime % (totalDuration || 1);
    } else if (this.animationTime > totalDuration) {
      this.animationTime = totalDuration - animSpec.frameTime;
    }
    this.frameIndex = Math.floor(this.animationTime / (animSpec.frameTime || 1)) % animSpec.frameCount;
  }

  getAnimationSpec(state) {
    const data = this.animationData.animations || this.animationData;
    return data[state] || data.idle || DEFAULT_ANIMATION.animations.idle;
  }

  draw(ctx, x, y, scale = 1, flipX = false) {
    // Shadow for depth
    const shadowWidth = this.frameWidth * scale * 0.9;
    const shadowHeight = this.frameHeight * scale * 0.35;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(x + (this.frameWidth * scale) * 0.5, y + this.frameHeight * scale * 0.9, shadowWidth * 0.6, shadowHeight, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (this.imageLoaded && !this.imageFailed) {
      const animSpec = this.getAnimationSpec(this.currentState);
      const framesPerRow = Math.floor(this.image.width / this.frameWidth) || 1;
      const srcX = (this.frameIndex % framesPerRow) * this.frameWidth;
      const srcY = 0;
      const destWidth = this.frameWidth * scale;
      const destHeight = this.frameHeight * scale;
      ctx.save();
      if (flipX) {
        ctx.translate(x + destWidth, y);
        ctx.scale(-1, 1);
        ctx.drawImage(
          this.image,
          srcX,
          srcY,
          this.frameWidth,
          this.frameHeight,
          0,
          0,
          destWidth,
          destHeight
        );
      } else {
        ctx.drawImage(
          this.image,
          srcX,
          srcY,
          this.frameWidth,
          this.frameHeight,
          x,
          y,
          destWidth,
          destHeight
        );
      }
      ctx.restore();
    } else {
      ctx.fillStyle = this.colorFallback;
      ctx.beginPath();
      ctx.arc(x + this.frameWidth * 0.5, y + this.frameHeight * 0.5, this.frameWidth * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

class Particle {
  constructor(x, y, vx, vy, lifetime, color, type = 'spark') {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(vx, vy);
    this.lifetime = lifetime;
    this.remaining = lifetime;
    this.color = color;
    this.type = type;
    this.size = type === 'explosion' ? 10 : 4;
  }

  update(dt) {
    this.remaining -= dt;
    if (this.type === 'blood' || this.type === 'spark') {
      this.velocity.y += 30 * dt;
    }
    this.position.add(this.velocity.clone().scale(dt));
  }

  draw(ctx) {
    if (this.remaining <= 0) {
      return;
    }
    const alpha = Math.max(this.remaining / this.lifetime, 0);
    ctx.save();
    ctx.globalAlpha = alpha;
    if (this.type === 'glow') {
      const gradient = ctx.createRadialGradient(
        this.position.x,
        this.position.y,
        0,
        this.position.x,
        this.position.y,
        this.size * 2
      );
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

class Projectile {
  constructor(config) {
    this.position = config.position.clone();
    this.velocity = config.velocity.clone();
    this.damage = config.damage;
    this.range = config.range;
    this.traveled = 0;
    this.radius = config.radius || 7;
    this.pierce = config.pierce || 1;
    this.owner = config.owner;
    this.lifesteal = config.lifesteal || 0;
    this.color = config.color || '#ffffff';
  }

  update(dt) {
    const movement = this.velocity.clone().scale(dt);
    this.position.add(movement);
    this.traveled += movement.length();
  }

  isExpired() {
    return this.traveled >= this.range;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

class FXArc {
  constructor(x, y, radius, angleStart, angleEnd, color, thickness = 12, lifetime = 0.35) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angleStart = angleStart;
    this.angleEnd = angleEnd;
    this.color = color;
    this.thickness = thickness;
    this.remaining = lifetime;
    this.lifetime = lifetime;
  }

  update(dt) {
    this.remaining -= dt;
  }

  draw(ctx) {
    if (this.remaining <= 0) {
      return;
    }
    ctx.save();
    ctx.lineWidth = this.thickness;
    const alpha = Math.max(this.remaining / this.lifetime, 0);
    ctx.strokeStyle = this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.angleStart, this.angleEnd);
    ctx.stroke();
    ctx.restore();
  }
}

class Soul {
  constructor(x, y, type) {
    this.position = new Vector2(x, y);
    this.type = type;
    this.radius = 8;
    this.floatTimer = 0;
    this.collected = false;
  }

  update(dt, player) {
    this.floatTimer += dt;
    const bob = Math.sin(this.floatTimer * 3) * 2;
    if (player && player.position.distance(this.position) < 25) {
      this.collected = true;
      player.gainExperience(SOUL_TYPES[this.type].xp || 0);
      if (SOUL_TYPES[this.type].essence) {
        grantEssence(SOUL_TYPES[this.type].essence);
      }
    }
    this.renderOffset = bob;
  }

  draw(ctx) {
    ctx.fillStyle = SOUL_TYPES[this.type].color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y + this.renderOffset, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Weapon {
  constructor(name, config) {
    this.name = name;
    this.damage = config.damage;
    this.fireRate = config.fireRate || 1;
    this.range = config.range || 100;
    this.type = config.type;
    this.cost = config.cost || 0;
    this.manual = config.manual || false;
    this.cooldown = 0;
    this.execute = config.execute;
    this.lifesteal = config.lifesteal || 0;
    this.extra = config.extra || {};
  }

  update(dt, player, enemies) {
    if (this.manual) {
      return;
    }
    this.cooldown -= dt;
    if (this.cooldown <= 0) {
      const fired = this.execute(player, enemies, this);
      if (fired) {
        this.cooldown = 1 / this.fireRate;
      }
    }
  }

  trigger(player, enemies) {
    return this.execute(player, enemies, this);
  }
}

class Enemy {
  constructor(type, x, y, isBoss = false) {
    this.type = type;
    this.isBoss = isBoss;
    this.definition = isBoss ? BOSS_DEFS[type] : ENEMY_DEFS[type];
    this.maxHealth = this.definition.health;
    this.health = this.maxHealth;
    this.damage = this.definition.damage;
    this.speed = this.definition.speed;
    this.position = new Vector2(x, y);
    this.velocity = new Vector2();
    this.alive = true;
    this.state = 'idle';
    this.deathTimer = 0;
    this.sprite = getSprite(type, this.definition.spriteSize || 48);
    this.sprite.colorFallback = this.definition.color;
    this.attackDelay = isBoss ? 1 : 0.8;
    this.attackTimer = 0;
    const baseSize = this.definition.spriteSize || 48;
    this.hitRadius = (baseSize * (this.isBoss ? 1.4 : 1)) * 0.35;
  }

  update(dt, player, multiplier) {
    if (!this.alive) {
      this.deathTimer += dt;
      this.sprite.update(dt, 'death');
      return;
    }
    const toPlayer = new Vector2(player.position.x - this.position.x, player.position.y - this.position.y);
    const distance = Math.max(toPlayer.length(), 0.0001);
    let direction = toPlayer.clone().scale(1 / distance);
    const effectiveSpeed = this.speed * multiplier;
    if (this.definition.move === 'spiral') {
      const swirl = new Vector2(-direction.y, direction.x).scale(Math.sin(gameState.gameTime * 3) * 0.6);
      direction.add(swirl).normalize();
    } else if (this.definition.move === 'fly') {
      const jitter = Vector2.fromAngle(Math.random() * Math.PI * 2, 0.2);
      direction.add(jitter).normalize();
    }
    this.velocity = direction.clone().scale(effectiveSpeed);
    this.position.add(this.velocity.clone().scale(dt));
    this.sprite.update(dt, distance > 5 ? 'run' : 'attack');
  }

  takeDamage(amount) {
    if (!this.alive) {
      return false;
    }
    this.health -= amount;
    if (this.health <= 0) {
      this.alive = false;
      this.state = 'death';
      return true;
    }
    this.state = 'hit';
    return false;
  }

  draw(ctx) {
    const size = this.definition.spriteSize || 48;
    const scale = this.isBoss ? 2 : 1.15;
    const drawX = this.position.x - size * 0.5 * scale;
    const drawY = this.position.y - size * 0.5 * scale;
    this.sprite.update(TARGET_DELTA, this.state === 'death' ? 'death' : this.state === 'hit' ? 'hit' : 'run');
    this.sprite.draw(ctx, drawX, drawY, scale);
    if (this.alive) {
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(drawX, drawY - 12, size * scale, 5);
      ctx.fillStyle = '#e63946';
      const hpRatio = Math.max(this.health / this.maxHealth, 0);
      ctx.fillRect(drawX, drawY - 12, size * scale * hpRatio, 5);
    }
  }
}

class Player {
  constructor(character) {
    const def = CHARACTER_DEFS[character];
    this.character = character;
    this.position = new Vector2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.velocity = new Vector2();
    this.speed = def.speed;
    this.range = def.range;
    this.maxHealth = def.maxHealth;
    this.health = def.maxHealth;
    this.baseDamage = def.baseDamage;
    this.level = 1;
    this.experience = 0;
    this.nextLevelExp = 100;
    this.armor = def.armor || 0;
    this.sprite = getSprite(character, def.spriteSize);
    this.sprite.colorFallback = '#f5f3f4';
    this.state = 'idle';
    this.killStreak = 0;
    this.killStreakTimer = 0;
    this.killStreakActive = false;
    this.killStreakDuration = 5;
    this.weapons = [];
    this.manualWeapons = {};
    this.pendingUnlocks = LEVEL_WEAPON_UNLOCK.slice();
    // Start weapons per playstyle
    if (def.playstyle === 'melee') {
      this.unlockWeapon('CursedBlade');
    } else if (def.playstyle === 'ranged') {
      this.unlockWeapon('ChaosOrb');
    } else {
      this.unlockWeapon('SoulreaverDagger');
    }
    this.manualWeapons.GodsayerSword = new Weapon('GodsayerSword', WEAPON_CONFIGS.GodsayerSword);
    this.sprite.refreshAnimation();
    this.radius = (def.spriteSize || 50) * 0.35;
    this.bonusDamageMult = 1;
    this.bonusSpeedMult = 1;
  }

  unlockWeapon(name) {
    if (!WEAPON_CONFIGS[name]) {
      return;
    }
    const weapon = new Weapon(name, WEAPON_CONFIGS[name]);
    if (weapon.manual) {
      this.manualWeapons[name] = weapon;
    } else {
      this.weapons.push(weapon);
    }
  }

  update(dt, state) {
    const keys = state.keys;
    const input = new Vector2(
      (keys.d ? 1 : 0) - (keys.a ? 1 : 0),
      (keys.s ? 1 : 0) - (keys.w ? 1 : 0)
    );
    if (input.length() > 0) {
      input.normalize();
      this.velocity = input.clone().scale(this.speed * this.bonusSpeedMult);
      this.state = 'run';
    } else {
      this.velocity = new Vector2();
      this.state = 'idle';
    }
    this.position.add(this.velocity.clone().scale(dt));
    this.weapons.forEach((weapon) => weapon.update(dt, this, state.enemies));
    if (this.killStreakActive) {
      this.killStreakTimer -= dt;
      if (this.killStreakTimer <= 0) {
        this.killStreakActive = false;
        this.killStreak = 0;
      }
    }
    this.sprite.update(dt, this.state);
  }

  takeDamage(amount) {
    if (this.character === 'rogue' && Math.random() < 0.1) {
      spawnParticleBurst(this.position.x, this.position.y, '#5f1e8f', 'glow', 6);
      return;
    }
    const mitigated = Math.max(amount - this.armor, 1);
    this.health -= mitigated;
    if (this.health <= 0) {
      this.health = 0;
      gameState.alive = false;
    }
  }

  gainExperience(amount) {
    this.experience += amount;
    let leveled = false;
    while (this.experience >= this.nextLevelExp) {
      this.experience -= this.nextLevelExp;
      this.level += 1;
      this.nextLevelExp = Math.floor(this.nextLevelExp * 1.2);
      this.maxHealth += 5;
      this.health = this.maxHealth;
      if (this.character === 'knight') {
        this.armor += 1;
      }
      gameState.pendingLevelUps += 1;
      leveled = true;
    }
    if (leveled && !gameState.paused) {
      triggerLevelUpModal();
    }
  }

  registerKill() {
    this.killStreak += 1;
    if (this.character === 'rogue' && this.killStreak >= 5) {
      this.killStreakActive = true;
      this.killStreakTimer = this.killStreakDuration;
    }
  }

  getDamageMultiplier() {
    let multiplier = (1 + (this.level - 1) * 0.05) * this.bonusDamageMult;
    if (this.killStreakActive) {
      multiplier += 0.15;
    }
    return multiplier;
  }

  draw(ctx) {
    const def = CHARACTER_DEFS[this.character];
    const size = def.spriteSize;
    const drawX = this.position.x - size * 0.5;
    const drawY = this.position.y - size * 0.55;
    // Aura to help identify hero
    ctx.save();
    ctx.fillStyle = def.aura;
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y + 6, size * 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    this.sprite.draw(ctx, drawX, drawY, 1.25, this.velocity.x < 0);
    ctx.fillStyle = '#222';
    ctx.fillRect(drawX, drawY - 12, size, 5);
    ctx.fillStyle = '#7cf5ff';
    ctx.fillRect(drawX, drawY - 12, size * (this.health / this.maxHealth), 5);
  }
}

const WEAPON_CONFIGS = {
  CursedBlade: {
    damage: 10,
    fireRate: 1,
    range: 100,
    type: 'cone',
    execute: (player, enemies, weapon) => {
      let hit = false;
      const facingAngle = Math.atan2(player.velocity.y, player.velocity.x) || 0;
      enemies.forEach((enemy) => {
        if (!enemy.alive) {
          return;
        }
        const distance = player.position.distance(enemy.position);
        if (distance <= weapon.range) {
          const angleToEnemy = Math.atan2(
            enemy.position.y - player.position.y,
            enemy.position.x - player.position.x
          );
          let delta = angleToEnemy - facingAngle;
          while (delta > Math.PI) delta -= Math.PI * 2;
          while (delta < -Math.PI) delta += Math.PI * 2;
          if (Math.abs(delta) <= 50 * DEG_TO_RAD || player.velocity.length() === 0) {
            const killed = enemy.takeDamage(weapon.damage * player.getDamageMultiplier());
            hit = hit || killed;
            if (killed) {
              handleEnemyDeath(enemy);
            }
          }
        }
      });
      if (hit) {
        spawnParticleBurst(player.position.x, player.position.y, '#ff4d6d', 'slash', 8);
        addSlashArc(
          player.position.x,
          player.position.y,
          weapon.range,
          facingAngle,
          120 * DEG_TO_RAD,
          '#ff4d6d',
          16,
          0.35
        );
      }
      return true;
    }
  },
  ShatterburstAxe: {
    damage: 15,
    fireRate: 0.8,
    range: 60,
    type: 'aoe',
    execute: (player, enemies, weapon) => {
      let any = false;
      enemies.forEach((enemy) => {
        if (!enemy.alive) return;
        if (player.position.distance(enemy.position) <= weapon.range) {
          const killed = enemy.takeDamage(weapon.damage * player.getDamageMultiplier());
          any = any || killed;
          if (killed) {
            handleEnemyDeath(enemy);
          } else {
            const push = enemy.position.clone().subtract(player.position).normalize().scale(80);
            enemy.position.add(push);
          }
        }
      });
      spawnParticleBurst(player.position.x, player.position.y, '#ffa600', 'explosion', 12);
      addSlashArc(player.position.x, player.position.y, weapon.range * 1.1, 0, Math.PI * 2, '#ffa600', 18, 0.4);
      return true;
    }
  },
  SoulreaverDagger: {
    damage: 5,
    fireRate: 3.2,
    range: 45,
    type: 'multi-hit',
    execute: (player, enemies, weapon) => {
      let target = null;
      let closest = Infinity;
      enemies.forEach((enemy) => {
        if (!enemy.alive) return;
        const distance = player.position.distance(enemy.position);
        if (distance < closest && distance <= weapon.range) {
          closest = distance;
          target = enemy;
        }
      });
      if (!target) {
        return false;
      }
      for (let i = 0; i < 3; i += 1) {
        const killed = target.takeDamage(weapon.damage * player.getDamageMultiplier());
        if (killed) {
          handleEnemyDeath(target);
          break;
        }
        player.health = Math.min(
          player.maxHealth,
          player.health + weapon.damage * 0.2 * player.getDamageMultiplier()
        );
      }
      spawnParticleBurst(target.position.x, target.position.y, '#ff6f91', 'blood', 6);
      addSlashArc(target.position.x, target.position.y, 42, Math.random() * Math.PI * 2, 100 * DEG_TO_RAD, '#ff6f91', 10, 0.25);
      return true;
    }
  },
  EternalHalberd: {
    damage: 25,
    fireRate: 0.5,
    range: 80,
    type: 'aoe',
    execute: (player, enemies, weapon) => {
      let hitAny = false;
      enemies.forEach((enemy) => {
        if (!enemy.alive) return;
        const distance = player.position.distance(enemy.position);
        if (distance <= weapon.range) {
          const killed = enemy.takeDamage(weapon.damage * player.getDamageMultiplier());
          hitAny = hitAny || killed;
          const pull = player.position.clone().subtract(enemy.position).normalize().scale(120);
          enemy.position.add(pull.scale(0.1));
          if (killed) {
            handleEnemyDeath(enemy);
          }
        }
      });
      spawnParticleBurst(player.position.x, player.position.y, '#c5cbe3', 'glow', 10);
      addSlashArc(player.position.x, player.position.y, weapon.range * 1.2, Math.random() * Math.PI * 2, Math.PI * 1.3, '#c5cbe3', 14, 0.45);
      return true;
    }
  },
  ChaosOrb: {
    damage: 8,
    fireRate: 1.6,
    range: 360,
    type: 'projectile',
    execute: (player) => {
      const orbCount = 3;
      const target =
        gameState.enemies.find((e) => e.alive) ||
        { position: player.position.clone().add(Vector2.fromAngle(Math.random() * Math.PI * 2, 1)) };
      for (let i = 0; i < orbCount; i += 1) {
        const spread = (i - 1) * 0.2;
        const angle = player.position.angle(target.position) + spread;
        const velocity = Vector2.fromAngle(angle, 240);
        gameState.projectiles.push(
          new Projectile({
            position: player.position.clone(),
            velocity,
            damage: 8 * player.getDamageMultiplier(),
            range: 320,
            pierce: 2,
            owner: player,
            color: '#7bed9f'
          })
        );
      }
      addSlashArc(player.position.x, player.position.y, 30, Math.random() * Math.PI * 2, Math.PI * 2, '#7bed9f', 8, 0.25);
      return true;
    }
  },
  ReapersScythe: {
    damage: 20,
    fireRate: 0.8,
    range: 100,
    type: 'spin',
    execute: (player, enemies, weapon) => {
      enemies.forEach((enemy) => {
        if (!enemy.alive) return;
        const distance = player.position.distance(enemy.position);
        if (distance <= weapon.range) {
          const killed = enemy.takeDamage(weapon.damage * player.getDamageMultiplier());
          if (killed) {
            handleEnemyDeath(enemy);
          } else {
            const pull = player.position.clone().subtract(enemy.position).normalize().scale(50);
            enemy.position.add(pull);
          }
        }
      });
      spawnParticleBurst(player.position.x, player.position.y, '#ff4f00', 'slash', 16);
      addSlashArc(player.position.x, player.position.y, weapon.range, Math.PI * 1.5, Math.PI * 1.8, '#ff4f00', 16, 0.4);
      return true;
    }
  },
  BloodmoonLance: {
    damage: 20,
    fireRate: 1,
    range: 400,
    type: 'beam',
    lifesteal: 0.5,
    execute: (player, enemies, weapon) => {
      const direction = player.velocity.length() > 0 ? player.velocity.clone().normalize() : new Vector2(1, 0);
      enemies.forEach((enemy) => {
        if (!enemy.alive) return;
        const toEnemy = enemy.position.clone().subtract(player.position);
        const projection = toEnemy.x * direction.x + toEnemy.y * direction.y;
        if (projection >= 0 && projection <= weapon.range) {
          const perpendicular = Math.abs(toEnemy.x * direction.y - toEnemy.y * direction.x);
          if (perpendicular <= 40) {
            const killed = enemy.takeDamage(weapon.damage * player.getDamageMultiplier());
            if (killed) {
              handleEnemyDeath(enemy);
            }
            player.health = Math.min(
              player.maxHealth,
              player.health + weapon.damage * weapon.lifesteal
            );
          }
        }
      });
      spawnParticleBurst(
        player.position.x + direction.x * 60,
        player.position.y + direction.y * 60,
        '#ff99c8',
        'glow',
        14
      );
      addSlashArc(
        player.position.x,
        player.position.y,
        weapon.range * 0.6,
        Math.atan2(direction.y, direction.x),
        50 * DEG_TO_RAD,
        '#ff99c8',
        12,
        0.35
      );
      return true;
    }
  },
  GodsayerSword: {
    damage: 100,
    fireRate: 1,
    range: 150,
    type: 'manual',
    manual: true,
    cost: 1,
    execute: (player, enemies, weapon) => {
      if (gameState.weaponCharges < weapon.cost) {
        return false;
      }
      gameState.weaponCharges -= weapon.cost;
      enemies.forEach((enemy) => {
        if (!enemy.alive) return;
        if (player.position.distance(enemy.position) <= weapon.range) {
          const killed = enemy.takeDamage(weapon.damage * player.getDamageMultiplier());
          if (killed) {
            handleEnemyDeath(enemy);
          }
        }
      });
      spawnParticleBurst(player.position.x, player.position.y, '#f1c40f', 'explosion', 25);
      addSlashArc(player.position.x, player.position.y, weapon.range * 1.2, Math.random() * Math.PI * 2, Math.PI * 2, '#f1c40f', 24, 0.5);
      triggerScreenShake();
      return true;
    }
  },
  VoidSummoner: {
    damage: 15,
    fireRate: 0.125,
    range: 200,
    cost: 2,
    type: 'summon',
    execute: (player, enemies, weapon) => {
      if (gameState.weaponCharges < weapon.cost) {
        return false;
      }
      gameState.weaponCharges -= weapon.cost;
      for (let i = 0; i < 3; i += 1) {
        const angle = (Math.PI * 2 * i) / 3;
        const summonPos = player.position.clone().add(Vector2.fromAngle(angle, weapon.range));
        enemies.forEach((enemy) => {
          if (!enemy.alive) return;
          if (summonPos.distance(enemy.position) <= 70) {
            const killed = enemy.takeDamage(weapon.damage * player.getDamageMultiplier());
            if (killed) {
              handleEnemyDeath(enemy);
            }
          }
        });
        spawnParticleBurst(summonPos.x, summonPos.y, '#5f0f40', 'glow', 12);
      }
      return true;
    }
  }
};

const gameState = {
  canvas: null,
  ctx: null,
  player: null,
  enemies: [],
  souls: [],
  particles: [],
  fx: [],
  projectiles: [],
  alive: false,
  paused: false,
  keys: { w: false, a: false, s: false, d: false },
  gameTime: 0,
  waveTimer: 0,
  waveNumber: 0,
  bossTimer: 0,
  bossIndex: 0,
  enemiesKilled: 0,
  difficultyMultiplier: 1,
  weaponCharges: 0,
  essenceCollected: 0,
  pendingGodsayer: false,
  screenShake: 0,
  spawnQueue: 0,
  spawnCooldown: 0,
  showOverlay: false,
  camera: new Vector2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2),
  survivalTarget: SURVIVAL_TARGET,
  pendingLevelUps: 0,
  lastTimestamp: performance.now()
};

function ensureCanvas() {
  if (!gameState.canvas) {
    gameState.canvas = document.getElementById('gameCanvas');
    if (gameState.canvas) {
      gameState.ctx = gameState.canvas.getContext('2d');
    }
  }
}

function resizeCanvas() {
  ensureCanvas();
  if (!gameState.canvas) {
    return;
  }
  const width = Math.max(window.innerWidth || CANVAS_WIDTH, 800);
  const height = Math.max(window.innerHeight || CANVAS_HEIGHT, 600);
  CANVAS_WIDTH = width;
  CANVAS_HEIGHT = height;
  gameState.canvas.width = width;
  gameState.canvas.height = height;
}

function initGame(character = 'knight') {
  ensureCanvas();
  resizeCanvas();
  gameState.player = new Player(character);
  gameState.enemies = [];
  gameState.souls = [];
  gameState.particles = [];
  gameState.projectiles = [];
  gameState.gameTime = 0;
  gameState.waveTimer = 0;
  gameState.waveNumber = 0;
  gameState.bossTimer = 0;
  gameState.enemiesKilled = 0;
  gameState.weaponCharges = 0;
  gameState.essenceCollected = 0;
  gameState.alive = true;
  gameState.screenShake = 0;
  gameState.spawnQueue = 0;
  gameState.spawnCooldown = 0;
  gameState.waveNumber = 0;
  gameState.waveTimer = 0;
  gameState.pendingLevelUps = 0;
  gameState.paused = false;
  spawnWave();
}

function spawnWave() {
  if (!gameState.player) {
    return;
  }
  const base = 6;
  const increment = 2 + Math.floor(gameState.waveNumber * 0.8);
  gameState.spawnQueue = base + increment;
  gameState.waveNumber += 1;
  gameState.waveTimer = 0;
}

function spawnBoss() {
  const bossKeys = Object.keys(BOSS_DEFS);
  const bossName = bossKeys[gameState.bossIndex % bossKeys.length];
  gameState.bossIndex += 1;
  const edge = Math.floor(Math.random() * 4);
  const baseX = gameState.player ? gameState.player.position.x : CANVAS_WIDTH / 2;
  const baseY = gameState.player ? gameState.player.position.y : CANVAS_HEIGHT / 2;
  let x = baseX;
  let y = baseY;
  const offset = 450;
  if (edge === 0) {
    x += (Math.random() - 0.5) * 300;
    y -= offset;
  } else if (edge === 1) {
    x += offset;
    y += (Math.random() - 0.5) * 300;
  } else if (edge === 2) {
    x += (Math.random() - 0.5) * 300;
    y += offset;
  } else {
    x -= offset;
    y += (Math.random() - 0.5) * 300;
  }
  const boss = new Enemy(bossName, x, y, true);
  gameState.enemies.push(boss);
  gameState.bossTimer = 0;
  triggerScreenShake(20);
}

function grantEssence(amount) {
  gameState.essenceCollected += amount;
  if (gameState.essenceCollected >= 5) {
    const charges = Math.floor(gameState.essenceCollected / 5);
    gameState.weaponCharges += charges;
    gameState.essenceCollected -= charges * 5;
  }
}

function handleEnemyDeath(enemy) {
  if (!enemy) {
    return;
  }
  gameState.enemiesKilled += 1;
  if (gameState.player) {
    gameState.player.registerKill();
  }
  dropSoul(enemy);
  spawnParticleBurst(enemy.position.x, enemy.position.y, enemy.definition.color, 'blood', 10);
}

function dropSoul(enemy) {
  if (enemy.isBoss) {
    gameState.souls.push(new Soul(enemy.position.x, enemy.position.y, 'cursed'));
    return;
  }
  if (ENEMY_DEFS[enemy.type].elite) {
    gameState.souls.push(new Soul(enemy.position.x, enemy.position.y, 'corrupted'));
    if (Math.random() < 0.4) {
      gameState.souls.push(new Soul(enemy.position.x + 10, enemy.position.y, 'essence'));
    }
  } else {
    if (Math.random() < 0.95) {
      gameState.souls.push(new Soul(enemy.position.x, enemy.position.y, 'ethereal'));
    }
    if (Math.random() < 0.05) {
      gameState.souls.push(new Soul(enemy.position.x + 6, enemy.position.y, 'essence'));
    }
  }
}

function spawnParticleBurst(x, y, color, type, count) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 40 + Math.random() * 120;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const particle = new Particle(x, y, vx, vy, 0.6 + Math.random() * 0.4, color, type);
    gameState.particles.push(particle);
  }
}

function triggerScreenShake(intensity = 10) {
  gameState.screenShake = Math.max(gameState.screenShake, intensity);
}

function addSlashArc(x, y, radius, angle, spread, color, thickness = 12, lifetime = 0.3) {
  const start = angle - spread * 0.5;
  const end = angle + spread * 0.5;
  gameState.fx.push(new FXArc(x, y, radius, start, end, color, thickness, lifetime));
}

function pickLevelUpOptions(player) {
  const options = [];
  const pool = LEVEL_UP_POOL.slice();
  // add weapon unlock option if available
  if (player.pendingUnlocks.length > 0 && player.level >= 3) {
    const weaponName = player.pendingUnlocks[0];
    pool.push({
      id: `weapon:${weaponName}`,
      title: `Unlock ${weaponName}`,
      desc: 'Gain a new weapon'
    });
  }
  while (options.length < 3 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    options.push(pool.splice(idx, 1)[0]);
  }
  return options;
}

function applyUpgradeChoice(id) {
  const player = gameState.player;
  if (!player) return;
  if (id.startsWith('weapon:')) {
    const weapon = id.split(':')[1];
    const index = player.pendingUnlocks.indexOf(weapon);
    if (index >= 0) {
      player.pendingUnlocks.splice(index, 1);
    }
    player.unlockWeapon(weapon);
  } else if (id === 'dmg') {
    player.bonusDamageMult *= 1.15;
  } else if (id === 'speed') {
    player.bonusSpeedMult *= 1.1;
  } else if (id === 'armor') {
    player.armor += 1;
  } else if (id === 'heal') {
    player.health = Math.min(player.maxHealth, player.health + player.maxHealth * 0.3);
  } else if (id === 'essence') {
    gameState.weaponCharges += 1;
  } else if (id === 'firerate') {
    player.weapons.forEach((w) => {
      w.fireRate *= 1.1;
    });
  }
  if (gameState.pendingLevelUps > 0) {
    gameState.pendingLevelUps -= 1;
  }
  if (gameState.pendingLevelUps > 0) {
    triggerLevelUpModal();
    return;
  }
  gameState.paused = false;
  if (typeof window !== 'undefined' && typeof window.hideLevelUp === 'function') {
    window.hideLevelUp();
  }
}

function triggerLevelUpModal() {
  if (!gameState.player) return;
  const options = pickLevelUpOptions(gameState.player);
  gameState.paused = true;
  if (typeof window !== 'undefined' && typeof window.presentLevelUp === 'function') {
    window.presentLevelUp(options);
  }
}

function spawnEnemyAtRing() {
  if (!gameState.player) return;
  const minRadius = 320;
  const maxRadius = 720 + gameState.waveNumber * 8;
  const angle = Math.random() * Math.PI * 2;
  const radius = minRadius + Math.random() * (maxRadius - minRadius);
  const x = gameState.player.position.x + Math.cos(angle) * radius;
  const y = gameState.player.position.y + Math.sin(angle) * radius;
  const waveEliteChance = Math.min(0.15 + gameState.waveNumber * 0.01, 0.35);
  const isElite = Math.random() < waveEliteChance;
  const pool = Object.keys(ENEMY_DEFS).filter((key) => ENEMY_DEFS[key].elite === isElite);
  const type = pool[Math.floor(Math.random() * pool.length)];
  gameState.enemies.push(new Enemy(type, x, y));
}

function tickSpawn(dt) {
  const waveInterval = 18;
  if (gameState.waveTimer >= waveInterval) {
    spawnWave();
  }
  gameState.spawnCooldown -= dt;
  const spawnRate = Math.max(0.2, 0.7 - gameState.waveNumber * 0.03);
  if (gameState.spawnQueue > 0 && gameState.spawnCooldown <= 0) {
    spawnEnemyAtRing();
    gameState.spawnQueue -= 1;
    gameState.spawnCooldown = spawnRate;
  }
}

function updateProjectiles(dt) {
  for (let i = gameState.projectiles.length - 1; i >= 0; i -= 1) {
    const projectile = gameState.projectiles[i];
    projectile.update(dt);
    let removed = false;
    for (let j = gameState.enemies.length - 1; j >= 0; j -= 1) {
      const enemy = gameState.enemies[j];
      if (!enemy.alive) continue;
      if (projectile.position.distance(enemy.position) <= projectile.radius + enemy.hitRadius) {
        const killed = enemy.takeDamage(projectile.damage);
        if (killed) {
          handleEnemyDeath(enemy);
        }
        projectile.pierce -= 1;
        if (projectile.lifesteal && gameState.player) {
          gameState.player.health = Math.min(
            gameState.player.maxHealth,
            gameState.player.health + projectile.damage * projectile.lifesteal
          );
        }
        if (projectile.pierce <= 0) {
          removed = true;
          break;
        }
      }
    }
    if (projectile.isExpired() || removed) {
      gameState.projectiles.splice(i, 1);
    }
  }
}

function updateSouls(dt) {
  for (let i = gameState.souls.length - 1; i >= 0; i -= 1) {
    const soul = gameState.souls[i];
    soul.update(dt, gameState.player);
    if (soul.collected) {
      gameState.souls.splice(i, 1);
    }
  }
}

function updateParticles(dt) {
  for (let i = gameState.particles.length - 1; i >= 0; i -= 1) {
    const particle = gameState.particles[i];
    particle.update(dt);
    if (particle.remaining <= 0) {
      gameState.particles.splice(i, 1);
    }
  }
}

function updateFx(dt) {
  for (let i = gameState.fx.length - 1; i >= 0; i -= 1) {
    const fx = gameState.fx[i];
    fx.update(dt);
    if (fx.remaining <= 0) {
      gameState.fx.splice(i, 1);
    }
  }
}

function updateEnemies(dt) {
  const player = gameState.player;
  for (let i = gameState.enemies.length - 1; i >= 0; i -= 1) {
    const enemy = gameState.enemies[i];
    enemy.update(dt, player, gameState.difficultyMultiplier);
    enemy.attackTimer = Math.max(enemy.attackTimer - dt, -0.01);
    if (!enemy.alive && enemy.deathTimer > 1.5) {
      gameState.enemies.splice(i, 1);
    }
    const hitRange = enemy.hitRadius + (player.radius || 26);
    if (enemy.alive && enemy.position.distance(player.position) <= hitRange && enemy.attackTimer <= 0) {
      const damage = enemy.damage;
      player.takeDamage(damage);
      enemy.attackTimer = enemy.attackDelay;
      spawnParticleBurst(player.position.x, player.position.y, '#ff5d73', 'blood', 5);
    }
  }
}

function triggerGodsayerSword() {
  if (!gameState.player) {
    return false;
  }
  const weapon = gameState.player.manualWeapons.GodsayerSword;
  if (!weapon) {
    return false;
  }
  return weapon.trigger(gameState.player, gameState.enemies);
}

function gameLoop(dt) {
  ensureCanvas();
  if (!gameState.ctx) {
    return;
  }
  if (gameState.paused) {
    drawGame();
    notifyHUD();
    return;
  }
  if (gameState.player && gameState.alive) {
    gameState.gameTime += dt;
    gameState.waveTimer += dt;
    gameState.bossTimer += dt;
    gameState.difficultyMultiplier = Math.min(1 + gameState.gameTime / 120, 4);
    gameState.player.update(dt, gameState);
    tickSpawn(dt);
    updateEnemies(dt);
    updateProjectiles(dt);
    updateSouls(dt);
    updateParticles(dt);
    updateFx(dt);
    if (gameState.waveTimer >= 30) {
      spawnWave();
    }
    if (gameState.bossTimer >= 120) {
      spawnBoss();
    }
    if (gameState.player.health <= 0) {
      gameState.alive = false;
    }
  }
  drawGame();
  notifyHUD();
}

function drawGame() {
  const ctx = gameState.ctx;
  if (!ctx) {
    return;
  }
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const cam = gameState.player
    ? gameState.player.position.clone()
    : gameState.camera || new Vector2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  gameState.camera = cam.clone();
  drawBackground(ctx, cam);
  ctx.translate(CANVAS_WIDTH * 0.5 - cam.x, CANVAS_HEIGHT * 0.5 - cam.y);
  if (gameState.screenShake > 0) {
    ctx.translate(
      (Math.random() - 0.5) * gameState.screenShake,
      (Math.random() - 0.5) * gameState.screenShake
    );
    gameState.screenShake *= 0.9;
  }
  gameState.souls.forEach((soul) => soul.draw(ctx));
  gameState.enemies.forEach((enemy) => enemy.draw(ctx));
  gameState.projectiles.forEach((projectile) => projectile.draw(ctx));
  if (gameState.player) {
    gameState.player.draw(ctx);
  }
  gameState.fx.forEach((fx) => fx.draw(ctx));
  gameState.particles.forEach((particle) => particle.draw(ctx));
  drawHUDOverlay(ctx);
  ctx.restore();
}

function drawBackground(ctx, cam) {
  const width = CANVAS_WIDTH;
  const height = CANVAS_HEIGHT;
  ctx.save();
  // Base gradient so фон всегда виден
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#13111d');
  gradient.addColorStop(0.5, '#0d0c14');
  gradient.addColorStop(1, '#08070d');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Тайл карты поверх, если загрузился
  if (mapLoaded && MAP_IMAGE.width && MAP_IMAGE.height) {
    const tileW = MAP_IMAGE.width;
    const tileH = MAP_IMAGE.height;
    const offsetX = -((cam.x % tileW) + tileW) % tileW;
    const offsetY = -((cam.y % tileH) + tileH) % tileH;
    for (let x = offsetX - tileW; x < width + tileW; x += tileW) {
      for (let y = offsetY - tileH; y < height + tileH; y += tileH) {
        ctx.drawImage(MAP_IMAGE, x, y, tileW, tileH);
      }
    }
  }
  ctx.restore();
}

function drawHUDOverlay(ctx) {
  if (!gameState.player || !gameState.showOverlay) {
    return;
  }
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(15, 15, 220, 110);
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px "Segoe UI", sans-serif';
  ctx.fillText(`Time: ${gameState.gameTime.toFixed(1)}s`, 25, 35);
  ctx.fillText(`Level: ${gameState.player.level}`, 25, 55);
  ctx.fillText(`Wave: ${gameState.waveNumber}`, 25, 75);
  ctx.fillText(`Enemies: ${gameState.enemies.filter((e) => e.alive).length}`, 25, 95);
  ctx.fillText(`Essence: ${gameState.weaponCharges} (+${gameState.essenceCollected}/5)`, 25, 115);
  ctx.fillText(`Boss in: ${(120 - gameState.bossTimer).toFixed(1)}s`, 25, 135);
}

function notifyHUD() {
  if (typeof window !== 'undefined' && typeof window.updateHUD === 'function') {
    window.updateHUD(gameState);
  }
  const shouldShowDeath =
    gameState.player &&
    !gameState.alive &&
    typeof window !== 'undefined' &&
    typeof window.showDeathScreen === 'function';
  if (shouldShowDeath) {
    window.showDeathScreen(gameState);
  }
}

function animationLoop(timestamp) {
  const dt = Math.min((timestamp - gameState.lastTimestamp) / 1000, 0.1);
  gameState.lastTimestamp = timestamp;
  gameLoop(dt || TARGET_DELTA);
  window.requestAnimationFrame(animationLoop);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
window.requestAnimationFrame(animationLoop);

function setKeyState(key, isDown) {
  if (gameState.keys[key] !== undefined) {
    gameState.keys[key] = isDown;
  }
}

window.initGame = initGame;
window.triggerGodsayerSword = triggerGodsayerSword;
window.setKeyState = setKeyState;
window.gameState = gameState;
window.spawnWave = spawnWave;
window.spawnBoss = spawnBoss;
window.grantEssence = grantEssence;
window.handleEnemyDeath = handleEnemyDeath;
window.triggerScreenShake = triggerScreenShake;
window.applyUpgradeChoice = applyUpgradeChoice;
