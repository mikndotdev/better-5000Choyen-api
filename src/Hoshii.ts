import {
  Image,
  CanvasRenderingContext2D
} from "canvas";

class Hoshii{
  public self: Image = new Image();

  constructor(){
    this.self.src = "src/images/hoshii.png";
  }

  public isLoaded(): boolean{
    if(!this.self.complete) return false;

    if(
      typeof this.self.naturalWidth !== "undefined"&&
      this.self.naturalWidth === 0
    ) return false;

    return true;
  }

  public drawTo(ctx: CanvasRenderingContext2D,posX: number,posY: number): void{
    ctx.setTransform(1,0,0,1,0,0);
    ctx.drawImage(this.self,posX+5,posY+2);
  }
}

export default Hoshii;