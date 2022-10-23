import { useRef } from "react";

import { useLoadPixelBuffer } from "./useExquisiteFiles";
import { PixelBuffer } from "./xgfx/ll_api";
import {
  canvasPalette,
  canvasPixels,
  CanvasStore,
  paletteKey,
  pixelKey,
} from "./xqcanvas/CanvasInterfaces";

export const LoadFile = (props: { canvas: CanvasStore }) => {
  const canvas = props.canvas;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const loadFromPixBuffer = (pixBuffer: PixelBuffer) => {
    canvas.setWidth(pixBuffer.header.width);
    canvas.setHeight(pixBuffer.header.height);
    const htmlPalette: canvasPalette = {};
    for (let pi = 0; pi < pixBuffer.palette.length; pi++) {
      const palColor = pixBuffer.palette[pi];
      const palKey = paletteKey(pi);
      const fmtColor: string = (
        Array.from(palColor)[0] == "#" ? palColor : `#${palColor}`
      ).slice(0, 7);
      htmlPalette[palKey] = fmtColor;
    }
    canvas.setPalette(htmlPalette);
    canvas.setPaletteSize(pixBuffer.palette.length);
    const pixelMap: canvasPixels = {};
    for (let y = 0; y < pixBuffer.header.height; y++) {
      for (let x = 0; x < pixBuffer.header.width; x++) {
        const keyName = pixelKey(x, y);
        const pixelPos = pixBuffer.getPixel(x, y);
        pixelMap[keyName] = pixelPos;
        canvas.setPixel(x, y, pixelPos);
      }
    }
  };

  const loadFile = (e: any) => {
    if (!e || !e.target) return;
    const filesToLoad: any = e.target;
    const files: File[] = Array.from(filesToLoad.files);
    const file: File = files[0];
    if (file) {
      useLoadPixelBuffer(file, loadFromPixBuffer);
    }
  };

  return (
    <div className="my-2 ml-4 sm:ml-12 pt-4">
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          loadFile(e);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }}
      />
      <button
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
      >
        <span className="bg-slate-600 py-2 px-2 sm:px-4">Load</span>
      </button>
    </div>
  );
};
