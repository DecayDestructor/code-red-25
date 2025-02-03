export default class Sprite {
  constructor({
    position = { x: 0, y: 0 },
    imageSrc,
    frames = { max: 1 },
    offset = { x: 0, y: 0 }
  }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.isLoaded = true;  
      console.log(`Image loaded: ${imageSrc}`);
    };
    this.frames = {
      max: frames.max,
      current: 0,
      elapsed: 0,
      hold: 3
    };
    this.offset = offset;
    this.isLoaded = false; 
  }

  draw(c) {
    if (!this.image || !this.isLoaded) {
      console.log('Image not loaded or not initialized!');
      return; 
    }

    const cropWidth = this.image.width / this.frames.max;
    const crop = {
      position: {
        x: cropWidth * this.frames.current, 
        y: 0
      },
      width: cropWidth,
      height: this.image.height
    };

    c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      crop.width,
      crop.height
    );
  }

  update() {
    this.frames.elapsed++;
    if (this.frames.elapsed % this.frames.hold === 0) {
      this.frames.current++;
      if (this.frames.current >= this.frames.max) {
        this.frames.current = 0;
      }
    }
  }
}