import Render from "./Render";
import { createCanvas, registerFont } from "canvas";
import { Option } from "./@types";

const generate = (top: string,bottom: string,option: Option): Buffer=>{
  registerFont("./src/font/notobk-subset.otf",{ family: "notobk" });
  registerFont("./src/font/notoserifbk-subset.otf",{ family: "notoserifbk" });
  
  const render = new Render(createCanvas(3840,1080),option);
  
  if(!option.single){
    render.drawTop(top,option.rainbow);
  
    if(!option.hoshii){
      render.drawBottom(bottom,null,option.rainbow);
    }else{
      render.drawImage();
    }
  }else{
    if(top){
      render.drawTop(top,option.rainbow);
    }else{
      render.drawBottom(bottom,null,option.rainbow);
    }
  }
  
  return render.createBuffer(option.imgtype,100);  
}

export default generate;