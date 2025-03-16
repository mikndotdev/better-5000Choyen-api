import Render from "./Render";
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { Option } from "./@types";
import { Hono } from "hono";

GlobalFonts.registerFromPath("./src/font/notobk-subset.otf", "notobk");
GlobalFonts.registerFromPath(
    "./src/font/notoserifbk-subset.otf",
    "notoserifbk",
);

const top = "ああああああ";
const bottom = "いいいいい";

const option: Option = {
    hoshii: false,
    noalpha: true,
    rainbow: false,
    imgtype: "png",
    single: false,
    debug: false,
};

const app = new Hono();
const render = new Render(createCanvas(3840, 1080), option);

app.get("/image", (c) => {
    const topText = c.req.query("top");
    const bottomText = c.req.query("bottom");
    const type = c.req.query("type") === "jpeg" ? "jpeg" : "png";
    const rainbow = c.req.query("rainbow") === "true";
    const hoshii = c.req.query("hoshii") === "true";
    const noalpha = c.req.query("noalpha") === "true";
    const single = c.req.query("single") === "true";

    if (!topText && !bottomText) {
        return c.json(
            {
                error: "at least one of top or bottom query parameters is required",
            },
            400,
        );
    }

    const option: Option = {
        hoshii,
        noalpha,
        rainbow,
        imgtype: type,
        single,
        debug: false,
    };

    const render = new Render(createCanvas(3840, 1080), option);

    if (!option.single) {
        render.drawTop(topText || "", option.rainbow);

        if (!option.hoshii) {
            render.drawBottom(bottomText || "", null, option.rainbow);
        } else {
            render.drawImage();
        }
    } else {
        if (topText) {
            render.drawTop(topText, option.rainbow);
        } else {
            render.drawBottom(bottomText || "", null, option.rainbow);
        }
    }

    const data = render.createBuffer(option.imgtype, 100);
    return c.body(data, 200, { "Content-Type": `image/${option.imgtype}` });
});

export default {
    port: process.env.PORT,
    fetch: app.fetch,
};
