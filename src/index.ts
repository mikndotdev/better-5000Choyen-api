import Canvas from "./Canvas";
import { createCanvas, registerFont } from "canvas";
const fs = require("fs")

type Option = {
  top: string;
  bottom: string;
  hoshii: boolean;
  noalpha: boolean;
  rainbow: boolean;
  imgtype: "png" | "jpeg";
  single: boolean;
  debug: boolean;
}

const option: Option = {
  top: "ああああああ",
  bottom: "いいいいい",
  hoshii: false,
  noalpha: true,
  rainbow: false,
  imgtype: "jpeg",
  single: false,
  debug: false
}

registerFont("./src/notobk-subset.otf", {family: "notobk"});
registerFont("./src/notoserifbk-subset.otf", {family: "notoserifbk"});

const canvas = new Canvas(createCanvas(3840,1080),{hoshii: option.hoshii,noalpha: option.noalpha,single: option.single,debug: option.debug});

if(!option.single){
  canvas.redrawTop(option.top,option.rainbow);

  if(!option.hoshii){
    canvas.redrawBottom(option.bottom,null,option.rainbow);
  }else{
    canvas.redrawImage();
  }
}else{
  if(option.top){
    canvas.redrawTop(option.top,option.rainbow);
  }else{
    canvas.redrawBottom(option.bottom,null,option.rainbow);
  }
}

canvas.createBuffer(option.imgtype,(data)=>{
   fs.writeFile(`output.${option.imgtype}`,data,(err)=>{
    if(err){
      console.error("画像保存中にエラーが発生しました:",err);
    }else{
      console.log("画像が正常に保存されました");
    }
  });
},80);