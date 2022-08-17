import { useRef } from "react";

import { useDownload } from "./useExquisiteFiles";
import { ExquisiteBitmapHeader, PixelBuffer } from "./xgfx/ll_api";
import { CanvasStore, paletteKey, pixelKey } from "./xqcanvas/CanvasInterfaces";

export const SaveFile = (props: { canvas: CanvasStore; format: string }) => {
  const canvas = props.canvas;
  const format = props.format;

  const header = {
    version: 1,
    width: canvas.width,
    height: canvas.height,
    numColors: canvas.paletteSize,
    scaleFactor: 1,
    alpha: false,
    backgroundIncluded: false,
    backgroundIndex: 0,
  };

  const didClickSave = () => {
    const pb = new PixelBuffer(header, canvas.getPaletteItemColors());
    for (let iy = 0; iy < canvas.height; iy++) {
      for (let ix = 0; ix < canvas.width; ix++) {
        const palettePos = canvas.getPixelVal(ix, iy);
        pb.setPixel(ix, iy, palettePos);
      }
    }
    const timestamp = new Date().getTime();
    const filename = `exquisite-graphics-image-${timestamp}`;
    useDownload(pb, format, filename);
  };

  const display =
    format == "binary" ? "Save" : `Export ${format.toUpperCase()}`;

  return (
    <button className="my-2 ml-4 sm:ml-12" onClick={didClickSave}>
      <span className="bg-slate-600 py-2 px-2 sm:px-4">{display}</span>
    </button>
  );
};
