import Sprite from "./Sprite";
export default class Projectile extends Sprite {
  constructor({ position = { x: 0, y: 0 }, enemy }) {
    super({
      position,
      imageSrc: '/assets/img/projectile.png',
    });
    this.velocity = { x: 0, y: 0 };
    this.enemy = enemy;
    this.radius = 10;
  }

  update(c) {
    if (!this.enemy || !this.enemy.center) {
      console.log("No target or enemy is missing", this.enemy);
      return; 
    }

    this.draw(c); 

    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x
    );

    const power = 5;
    this.velocity.x = Math.cos(angle) * power;
    this.velocity.y = Math.sin(angle) * power;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    const distance = Math.hypot(
      this.enemy.center.x - this.position.x,
      this.enemy.center.y - this.position.y
    );

    if (distance < this.radius + this.enemy.radius) {
      console.log("Projectile hit target");

      this.enemy.health -= 20;

      if (this.enemy.health <= 0) {

        enemies = enemies.filter((e) => e !== this.enemy);

        setCoins((prev) => prev + 25);
      }

      explosions.push(
        new Sprite({
          position: { x: this.position.x, y: this.position.y },
          imageSrc: "/assets/img/explosion.png",
          frames: { max: 4 },
          offset: { x: 0, y: 0 },
        })
      );

      this.removeProjectile();
    }
  }

  removeProjectile() {
    if (this.enemy && this.enemy.projectiles) {
      const index = this.enemy.projectiles.indexOf(this);
      if (index !== -1) {
        this.enemy.projectiles.splice(index, 1); 
      }
    }
  }
}