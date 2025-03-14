import { createCanvas, loadImage, CanvasRenderingContext2D } from "canvas";
import { join } from "path";

class Hosii {
  private self: any;

  constructor() {
    const imagePath = join(__dirname, "images", "hosii.png");
    this.self = loadImage(imagePath);
  }

  public async isLoaded(): Promise<boolean> {
    try {
      await this.self;
      return true;
    } catch {
      return false;
    }
  }

  public async drawTo(ctx: CanvasRenderingContext2D, posX: number, posY: number): Promise<void> {
    const image = await this.self;
    ctx.drawImage(image, posX + 5, posY + 2);
  }
}

export default Hosii;
