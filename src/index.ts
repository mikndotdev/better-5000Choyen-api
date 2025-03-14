import Canvas from "./Canvas";
import { createCanvas, registerFont } from "canvas";
const fs = require("fs")

registerFont("./src/notobk-subset.otf", {family: "notobk"});
registerFont("./src/notoserifbk-subset.otf", {family: "notoserifbk"});

const canvas = new Canvas(createCanvas(3840,1080), {hoshii: false, noalpha: false, single: false, debug: false});

canvas.redrawTop("あああああ", false);
canvas.redrawBottom("あああああ", null, false);

canvas.createBuffer("jpeg",(data)=>{
   fs.writeFile("output.jpeg", data, (err) => {
    if(err){
      console.error("画像保存中にエラーが発生しました:", err);
    }else{
      console.log("画像が正常に保存されました");
    }
  });
},80);