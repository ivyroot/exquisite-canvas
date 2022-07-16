import { Pixel, PixelColor, PixelMap } from "./xgfx/api";
import { ExquisiteBitmapHeader, PixelBuffer } from "./xgfx/ll_api";

function hexStringToByte(str) {
  if (!str) {
    return new Uint8Array();
  }

  const a = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}

export function useDownload(header, palette, pixels) {
  console.log(`DOWNLOADING THE PIXELS`);
  const pb = new PixelBuffer(header, palette);
  pixels.forEach((el) => {
    pb.setPixel(el.x, el.y, el.color);
  });
  const data = pb.getPixelBuffer();
  console.log(`GENERATED FILE BINARY: ${data}`);
  const bytes = hexStringToByte(data);
  const timestamp = new Date().getTime();
  const filename = `exquisit-gfx-file-${timestamp}.xgfx`;
  const blob = new Blob(bytes);
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
