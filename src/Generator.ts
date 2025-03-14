import { createCanvas, CanvasRenderingContext2D } from "canvas";
import fs from "fs";

class Generator{
  private readonly ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D){
    this.ctx = ctx;
  }

  public save(width: number,height: number): void{
    const data = this.ctx.getImageData(0,0,width,height);
    const canvasWidth = data.width;
    const canvasHeight = data.height - 10;
    const canvas = createCanvas(canvasWidth,canvasHeight);
    const ctx = canvas.getContext("2d");

    ctx.putImageData(data,0,0);
  
    const out = fs.createWriteStream(__dirname+"/test.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
  }

  public createBuffer(width: number,height: number,type: "jpeg" | "png",callback: any,quality: number){
    const data = this.ctx.getImageData(0,0,width,height);
    const canvasWidth = data.width;
    const canvasHeight = data.height - 10;
    const canvas = createCanvas(canvasWidth,canvasHeight);
    const ctx = canvas.getContext("2d");
    ctx.putImageData(data,0,0);
  
    if(quality < 0){
      quality = 10;
    }else if(quality > 100){
      quality = 100;
    }
  
    if(type === "jpeg"){
      canvas.toBuffer((err,buf)=>{
        if(err){
          console.log(err);
          callback("error");
          return;
        }
        return callback(buf);
      },`image/jpeg`,{ quality: quality ? quality/100 : 0.8});
    }else if(type === "png"){
      //encodeOption.compressionLevel = quality ? Math.floor((quality/100)*10) : 10;

      canvas.toBuffer((err,buf)=>{
        if(err){
          console.log(err);
          callback("error");
          return;
        }
        return callback(buf);
      },`image/png`,{ compressionLevel: 0 });
    }
  }  
}

export default Generator;