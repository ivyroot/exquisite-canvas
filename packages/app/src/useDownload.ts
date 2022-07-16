import { Pixel, PixelColor, PixelMap } from "./xgfx/api";
import { ExquisiteBitmapHeader, PixelBuffer } from "./xgfx/ll_api";

export function useDownload(header, palette, pixels) {
  console.log(`DOWNLOADING THE PIXELS`);
  const pb = new PixelBuffer(header, palette);
  pixels.forEach((el) => {
    pb.setPixel(el.x, el.y, el.color);
  });
  const data = pb.getPixelBuffer();
  console.log(`GENERATED FILE BINARY: ${data}`);
}
