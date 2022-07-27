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

export function useLoadPixelBuffer(file, didLoad) {
  if (!file) {
    return false;
  }
  const reader = new FileReader();
  reader.readAsArrayBuffer(file, "UTF-8");
  reader.onload = () => {
    const fileBytes = [...new Uint8Array(reader.result)];
    console.log(`Loaded file contents, bytes count: ${fileBytes.byteLength}`);
    const head = new Uint8Array(fileBytes.slice(0, 2));
    console.log(`first 2 bytes: ${head[0]}, ${head[1]}`);
    const isHexString = head[0] == 48 && head[1] == 120;

    const sliceOffset = isHexString ? 2 : 0;
    const fileHexString = fileBytes
      .slice(sliceOffset)
      .map((x) => {
        return isHexString
          ? String.fromCharCode(x)
          : x.toString(16).padStart(2, "0");
      })
      .join("");

    const fullFileDataStr = `0x${fileHexString}`;
    console.log(`Loaded file hex: ${fullFileDataStr}`);
    const exquisiteBuffer = new PixelBuffer();
    exquisiteBuffer.from(fullFileDataStr);
    console.log(
      `Loaded from Exquisite Graphics file with palette size: ${exquisiteBuffer.palette.length}`
    );
    didLoad(exquisiteBuffer);
  };
  reader.onerror = (e) => {
    console.log(`ERROR LOADING FILE CONTENTS`);
  };
}
