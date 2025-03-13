import Canvas from "./Canvas";
import { createCanvas, registerFont } from "canvas";

const canvas = new Canvas(createCanvas(3840,1080), {hoshii: false, noalpha: false, single: false, debug: false});

if (!false) {
  canvas.redrawTop(args.top, rainbow);

  if (! false) {
    canvas.redrawBottom(args.bottom, null, rainbow);
  } else {
    canvas.redrawImage();
  }
}else{
  if (args.top) {
    canvas.redrawTop(args.top, rainbow);
  }else{
    canvas.redrawBottom(args.bottom, null, rainbow);
  }
}

resp.writeHead(200, {'Content-type': 'image/'+imgtype});
canvas.createBuffer(imgtype, function (data) {
   resp.write(data);
   resp.end();
   fs.writeFileSync(cachename, data); // save cache
   currentTasks--;
}, args.q);