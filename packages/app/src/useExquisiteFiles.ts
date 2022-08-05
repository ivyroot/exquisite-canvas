import { getSVGPixelBuffer, Pixel, PixelColor, PixelMap } from "./xgfx/api";
import { ExquisiteBitmapHeader, PixelBuffer } from "./xgfx/ll_api";

function hexStringToByte(str: string) {
  if (!str) {
    return new Uint8Array();
  }

  const a = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}

// trigger download of Exquisite Graphics js lib pixelBuffer
// format options:
// 'binary' => .xqst native file format
// 'hex' => text string of hex code for native file format (useful to paste into source code)
// 'svg' => rendered svg image file
export function useDownload(
  pixelBuffer: PixelBuffer,
  format: string,
  filename: string
) {
  const data = pixelBuffer.getPixelBuffer();
  let blob: Blob | MediaSource;
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
    const svgString = getSVGPixelBuffer(pixelBuffer);
    blob = new Blob([svgString]);
  }

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${filename}.${fileExtension}`;
  link.click();
}

// load a file containing an Exquisite Graphics image
// file must be an HTML File object https://developer.mozilla.org/en-US/docs/Web/API/File
export function useLoadPixelBuffer(file: File, didLoad: any): void {
  if (!file) {
    return;
  }
  const reader: any = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const fileBytes = [...new Uint8Array(reader.result)];
    console.log(`Loaded file contents, bytes count: ${fileBytes.length}`);
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
  reader.onerror = (e: any) => {
    console.log(`ERROR LOADING FILE CONTENTS`);
  };
}
