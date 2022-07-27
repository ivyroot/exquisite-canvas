import { getSVGPixelBuffer, Pixel, PixelColor, PixelMap } from "./xgfx/api";
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

export function useDownload(header, palette, pixels, format) {
  const pb = new PixelBuffer(header, palette);
  pixels.forEach((el) => {
    pb.setPixel(el.x, el.y, el.color);
  });
  const data = pb.getPixelBuffer();
  console.log(`GENERATED FILE HEX STRING: ${data}`);

  let blob = "";
  let fileExtension = "";
  if (format == "binary") {
    console.log(`DOWNLOAD BINARY FILE`);
    fileExtension = `xgfx`;
    const rawData = data.replace("0x", "");
    const bytes = hexStringToByte(rawData);
    blob = new Blob([bytes]);
  }
  if (format == "hex") {
    console.log(`DOWNLOAD AS HEX STRING`);
    fileExtension = `txt`;
    blob = new Blob([data]);
  }
  if (format == "svg") {
    console.log(`EXPORT AS SVG`);
    fileExtension = "svg";
    const svgString = getSVGPixelBuffer(pb);
    blob = new Blob([svgString]);
  }

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  const timestamp = new Date().getTime();
  const filename = `exquisite-graphics-image-${timestamp}.${fileExtension}`;
  link.download = filename;
  link.click();
}
