import Drawer from "./Drawer";

class Canvas{
  public ctx: CanvasRenderingContext2D;
  public offset;
  public fixedX;
  public dragging;
  public dragPosition;
  public hoshii;
  public noalpha;
  public single;
  public debug;
  public drawer;

  constructor(canvas,config){
    this.canvas = canvas;
    
    this.ctx = canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.offset = {
      top:    { x: 0, y: 0 },
      bottom: { x: 250, y: 130 }
    };
  
    this.fixedX = 60;
  
    this.dragging = false;
    this.dragPosition = { x0: 0, y0: 0 };
  
    this.hoshii = config.hoshii;
    this.noalpha = config.noalpha;
    this.single = config.single;
    this.debug = config.debug;
    config.offset = this.offset;
  
    this.drawer = new Drawer(this.ctx, config);
  }

  upperEndPosition(){
    return this.canvas.getBoundingClientRect().top + this.offset.bottom.y;
  }
  
  lowerEndPosition(){
    return this.canvas.getBoundingClientRect().top + (this.canvas.height - 10);
  }

  redrawTop(text: string, isRainbow: boolean){
    let posX = 70;
    let posY = 100;
    let order = this.noalpha ? 'white' : 'transparent';
    if (this.debug) order = 'debug';
    if(this.single){
      posX = this.fixedX;
      posY = 100;
    }
  
    if(isRainbow){
      this.drawer.redrawTop_rainbow(text, posX, posY, order);
    }else{
      this.drawer.redrawTop(text, posX, posY, order);
    }
  
    if(this.hoshii === true){
      this.redrawImage();
    }else{
      //this.redrawBottom(text, isRainbow);
    }
  }
  
  redrawBottom(txt: string,offsetX: number,isRainbow: boolean){
    const text  = txt.replace(/！/, `!`);
    let posX = (offsetX || this.offset.bottom.x) + 70;
    let posY = this.offset.bottom.y + 100;
    let order = this.noalpha ? 'white' : 'transparent';

    if(this.debug) order = 'debug';
    if(this.single){
      posX = this.fixedX;
      posY = 100;
    }

    if(isRainbow){
      this.drawer.redrawBottom_rainbow(text,posX,posY, order);
    }else{
      this.drawer.redrawBottom(text,posX,posY, order);
    }
  }
  
  redrawImage(offsetX?: number){
    const posX = (offsetX || this.offset.bottom.x) + 70;
    const posY = this.offset.bottom.y;
    let order = this.noalpha ? 'white' : 'transparent';
    if (this.debug) order = 'debug';
    this.drawer.redrawImage(posX,posY,order);
  }
  
  save(){
    this.drawer.save();
  }
  
  createBuffer(type: "jpeg" | "png",callback: any,quality: number){
    this.drawer.createBuffer(type, callback, quality);
  }
}

export default Canvas;
