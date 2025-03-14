import Render from "./Render";
import {
  createCanvas,
  registerFont
} from "canvas";
import { Option } from "./@types";
import { join } from "path";

const generate = (top: string,bottom: string,option: Option): Buffer=>{
  registerFont(join(__dirname,"./font/notobk-subset.otf"),{ family: "notobk" });
  registerFont(join(__dirname,"./font/notoserifbk-subset.otf"),{ family: "notoserifbk" });
  
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