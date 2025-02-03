import Sprite from "./Sprite";
import Projectile from "./Projectile";

export default class Building extends Sprite {
  constructor({ position, imageSrc, radius }) {
    super({
      position: position,
      imageSrc: imageSrc,
      frames: { max: 1 },
      offset: { x: 0, y: 0 },
    });

    this.position = position;
    this.imageSrc = imageSrc;
    this.occupied = false;
    this.projectiles = []; 
    this.target = null;
    this.radius = radius || 30; 
    this.center = { x: this.position.x + this.radius, y: this.position.y + this.radius }; 
  }

  update(c) {
    super.update(c);

    if (this.target) {
      console.log("Target found for building:", this.target);
      this.fireProjectile(); 
    }

    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
  }

  fireProjectile(c) {
    console.log("Firing projectile towards:", this.target);

    if (this.target) {
      const projectile = new Projectile({
        position: { x: this.position.x, y: this.position.y },
        enemy: this.target,
      });

      console.log("Projectile created:", projectile);
      this.projectiles.push(projectile);
    }
  }
}