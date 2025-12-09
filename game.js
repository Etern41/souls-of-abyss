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

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
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

const CHARACTER_DEFS = {
  knight: {
    maxHealth: 100,
    baseDamage: 12,
    range: 110,
    speed: 200,
    armor: 5,
    spriteSize: 48
  },
  witch: {
    maxHealth: 70,
    baseDamage: 8,
    range: 140,
    speed: 180,
    armor: 2,
    spriteSize: 48
  },
  rogue: {
    maxHealth: 85,
    baseDamage: 10,
    range: 90,
    speed: 250,
    armor: 3,
    spriteSize: 48,
    dodgeChance: 0.1
  }
};

const ENEMY_DEFS = {
  zombie: { health: 20, damage: 5, speed: 80, color: '#9da3a4', elite: false },
  spectre: { health: 18, damage: 4, speed: 90, color: '#4db1e8', elite: false },
  cultist: { health: 22, damage: 6, speed: 100, color: '#a347d6', elite: false },
  vampire: { health: 40, damage: 10, speed: 120, color: '#c41e3a', elite: true },
  wraith: { health: 38, damage: 9, speed: 110, color: '#1a1a1f', elite: true },
  corrupted_knight: { health: 50, damage: 15, speed: 60, color: '#4e5b6e', elite: true },
  warden: { health: 42, damage: 11, speed: 100, color: '#0ad1ff', elite: true }
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
    this.radius = config.radius || 6;
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
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
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
  }

  update(dt, player, multiplier) {
    if (!this.alive) {
      this.deathTimer += dt;
      this.sprite.update(dt, 'death');
      return;
    }
    const toPlayer = new Vector2(player.position.x - this.position.x, player.position.y - this.position.y);
    const distance = Math.max(toPlayer.length(), 0.0001);
    const direction = toPlayer.clone().scale(1 / distance);
    const effectiveSpeed = this.speed * multiplier;
    if (this.type === 'wraith') {
      const swirl = new Vector2(-direction.y, direction.x).scale(Math.sin(gameState.gameTime * 2) * 40);
      direction.add(swirl).normalize();
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
    const drawX = this.position.x - size * 0.5;
    const drawY = this.position.y - size * 0.5;
    this.sprite.update(TARGET_DELTA, this.state === 'death' ? 'death' : this.state === 'hit' ? 'hit' : 'run');
    this.sprite.draw(ctx, drawX, drawY, this.isBoss ? 2 : 1);
    if (this.alive) {
      ctx.fillStyle = '#222';
      ctx.fillRect(drawX, drawY - 10, size, 4);
      ctx.fillStyle = '#e63946';
      const hpRatio = Math.max(this.health / this.maxHealth, 0);
      ctx.fillRect(drawX, drawY - 10, size * hpRatio, 4);
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
    this.unlockWeapon('CursedBlade');
    this.manualWeapons.GodsayerSword = new Weapon('GodsayerSword', WEAPON_CONFIGS.GodsayerSword);
    this.sprite.refreshAnimation();
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
      this.velocity = input.clone().scale(this.speed);
      this.state = 'run';
    } else {
      this.velocity = new Vector2();
      this.state = 'idle';
    }
    this.position.add(this.velocity.clone().scale(dt));
    this.position.x = Math.max(20, Math.min(CANVAS_WIDTH - 20, this.position.x));
    this.position.y = Math.max(20, Math.min(CANVAS_HEIGHT - 20, this.position.y));
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
    while (this.experience >= this.nextLevelExp) {
      this.experience -= this.nextLevelExp;
      this.level += 1;
      this.nextLevelExp = Math.floor(this.nextLevelExp * 1.2);
      this.maxHealth += 5;
      this.health = this.maxHealth;
      if (this.character === 'knight') {
        this.armor += 1;
      }
      if (this.level >= 3 && this.pendingUnlocks.length > 0) {
        const weaponName = this.pendingUnlocks.shift();
        if (weaponName) {
          this.unlockWeapon(weaponName);
        }
      }
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
    let multiplier = 1 + (this.level - 1) * 0.05;
    if (this.killStreakActive) {
      multiplier += 0.15;
    }
    return multiplier;
  }

  draw(ctx) {
    const size = CHARACTER_DEFS[this.character].spriteSize;
    const drawX = this.position.x - size * 0.5;
    const drawY = this.position.y - size * 0.5;
    this.sprite.draw(ctx, drawX, drawY, 1, this.velocity.x < 0);
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
      return true;
    }
  },
  SoulreaverDagger: {
    damage: 5,
    fireRate: 2,
    range: 30,
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
      return true;
    }
  },
  ChaosOrb: {
    damage: 8,
    fireRate: 1.2,
    range: 300,
    type: 'projectile',
    execute: (player) => {
      const orbCount = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < orbCount; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Vector2.fromAngle(angle, 200);
        gameState.projectiles.push(
          new Projectile({
            position: player.position.clone(),
            velocity,
            damage: 8 * player.getDamageMultiplier(),
            range: 320,
            pierce: 3,
            owner: player,
            color: '#7bed9f'
          })
        );
      }
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
  projectiles: [],
  alive: false,
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

function initGame(character = 'knight') {
  ensureCanvas();
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
}

function spawnWave() {
  if (!gameState.player) {
    return;
  }
  const count = 5 + gameState.waveNumber * 2;
  for (let i = 0; i < count; i += 1) {
    const isElite = Math.random() < 0.2;
    const pool = Object.keys(ENEMY_DEFS).filter((key) => ENEMY_DEFS[key].elite === isElite);
    const type = pool[Math.floor(Math.random() * pool.length)];
    const angle = Math.random() * Math.PI * 2;
    const spawnRadius = 150 + Math.random() * 100;
    const posX = gameState.player.position.x + Math.cos(angle) * spawnRadius;
    const posY = gameState.player.position.y + Math.sin(angle) * spawnRadius;
    gameState.enemies.push(new Enemy(type, posX, posY));
  }
  gameState.waveNumber += 1;
  gameState.waveTimer = 0;
}

function spawnBoss() {
  const bossKeys = Object.keys(BOSS_DEFS);
  const bossName = bossKeys[gameState.bossIndex % bossKeys.length];
  gameState.bossIndex += 1;
  const edge = Math.floor(Math.random() * 4);
  let x = 0;
  let y = 0;
  if (edge === 0) {
    x = Math.random() * CANVAS_WIDTH;
    y = -50;
  } else if (edge === 1) {
    x = CANVAS_WIDTH + 50;
    y = Math.random() * CANVAS_HEIGHT;
  } else if (edge === 2) {
    x = Math.random() * CANVAS_WIDTH;
    y = CANVAS_HEIGHT + 50;
  } else {
    x = -50;
    y = Math.random() * CANVAS_HEIGHT;
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

function updateProjectiles(dt) {
  for (let i = gameState.projectiles.length - 1; i >= 0; i -= 1) {
    const projectile = gameState.projectiles[i];
    projectile.update(dt);
    let removed = false;
    for (let j = gameState.enemies.length - 1; j >= 0; j -= 1) {
      const enemy = gameState.enemies[j];
      if (!enemy.alive) continue;
      if (projectile.position.distance(enemy.position) <= projectile.radius + 20) {
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

function updateEnemies(dt) {
  const player = gameState.player;
  for (let i = gameState.enemies.length - 1; i >= 0; i -= 1) {
    const enemy = gameState.enemies[i];
    enemy.update(dt, player, gameState.difficultyMultiplier);
    if (!enemy.alive && enemy.deathTimer > 1.5) {
      gameState.enemies.splice(i, 1);
    }
    if (enemy.alive && enemy.position.distance(player.position) <= 30) {
      const damage = enemy.damage;
      player.takeDamage(damage);
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
  if (gameState.player && gameState.alive) {
    gameState.gameTime += dt;
    gameState.waveTimer += dt;
    gameState.bossTimer += dt;
    gameState.difficultyMultiplier = 1 + gameState.gameTime / 4;
    gameState.player.update(dt, gameState);
    updateEnemies(dt);
    updateProjectiles(dt);
    updateSouls(dt);
    updateParticles(dt);
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
  if (gameState.screenShake > 0) {
    ctx.translate(
      (Math.random() - 0.5) * gameState.screenShake,
      (Math.random() - 0.5) * gameState.screenShake
    );
    gameState.screenShake *= 0.9;
  }
  drawBackground(ctx);
  gameState.souls.forEach((soul) => soul.draw(ctx));
  gameState.enemies.forEach((enemy) => enemy.draw(ctx));
  gameState.projectiles.forEach((projectile) => projectile.draw(ctx));
  if (gameState.player) {
    gameState.player.draw(ctx);
  }
  gameState.particles.forEach((particle) => particle.draw(ctx));
  drawHUDOverlay(ctx);
  ctx.restore();
}

function drawBackground(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  gradient.addColorStop(0, '#1a0327');
  gradient.addColorStop(0.5, '#1f1f49');
  gradient.addColorStop(1, '#040308');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8;
    const cx = CANVAS_WIDTH / 2 + Math.cos(angle) * 200;
    const cy = CANVAS_HEIGHT / 2 + Math.sin(angle) * 120;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 20, 50, angle, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(196,30,58,0.25)';
  ctx.beginPath();
  ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 120, 0, Math.PI * 2);
  ctx.stroke();
}

function drawHUDOverlay(ctx) {
  if (!gameState.player) {
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
  if (!gameState.alive && typeof window !== 'undefined' && typeof window.showDeathScreen === 'function') {
    window.showDeathScreen(gameState);
  }
}

function animationLoop(timestamp) {
  const dt = Math.min((timestamp - gameState.lastTimestamp) / 1000, 0.1);
  gameState.lastTimestamp = timestamp;
  gameLoop(dt || TARGET_DELTA);
  window.requestAnimationFrame(animationLoop);
}

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
