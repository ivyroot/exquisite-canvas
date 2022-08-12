import React, { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "./Button";
import { CanvasLogo } from "./CanvasLogo";
import { CanvasSkin } from "./CanvasSkin";
import { useDownload, useLoadPixelBuffer } from "./useExquisiteFiles";
import { Pixel, PixelColor, PixelMap } from "./xgfx/api";
import { ExquisiteBitmapHeader, PixelBuffer } from "./xgfx/ll_api";
import { pixelCanvas, ExquisiteCanvas, useExquisiteCanvas } from "./xqcanvas/useExquisiteCanvas";

const pixelKey = (x: number, y: number) => {
  return `px_${x}X${y}`;
};

const pixelKeyVals = (pxKey: string) => {
  if (!pxKey || pxKey.slice(0, 3) != "px_") return [];
  return pxKey.replace("px_", "").split("X");
};

const paletteKey = (i: number) => {
  return `pal_${i}`;
};

interface paletteItemCollection { 
  [index: string]: string;
}

export const DemoCanvas = () => {
  const xqCanvas: ExquisiteCanvas = useExquisiteCanvas();
  console.log(`MADE AN EXQUISITE CANVAS: ${xqCanvas.width} X ${xqCanvas.height}`);

  // core canvas state
  const [width, setWidth] = [xqCanvas.width, xqCanvas.setWidth];
  const [height, setHeight] = [xqCanvas.height, xqCanvas.setHeight];
  const [zoom, setZoom] = [xqCanvas.zoom, xqCanvas.setZoom];
  const [palette, setPalette] = [xqCanvas.palette, xqCanvas.setPalette];
  const [paletteSize, setPaletteSize] = [xqCanvas.paletteSize, xqCanvas.setPaletteSize];
  const [pixels, setPixels] = [xqCanvas.pixels, xqCanvas.setPixels];

  // core canvas UI
  const svgCanvasRef = useRef<SVGSVGElement | null>(null);

  // core canvas input handlers
  const lastPixelDownRef = useRef<boolean | null>(null);

  // plugins UI
  const inputRef = useRef<HTMLInputElement | null>(null);

  // plugin state
  const [currPaletteItem, setCurrPaletteItem] = useState(1);
  const [dropperActive, setDropperActive] = useState(false);
  const header = {
    version: 1,
    width: width,
    height: height,
    numColors: paletteSize,
    scaleFactor: 1,
    alpha: false,
    backgroundIncluded: false,
    backgroundIndex: 0,
  };

  const didClickSave = (e: any, format: string) => {
    e.preventDefault();
    const pb = new PixelBuffer(header, xqCanvas.getPaletteItems());
    for (let iy = 0; iy < height; iy++) {
      for (let ix = 0; ix < width; ix++) {
        const palettePos = palettePosForPixel(ix, iy);
        pb.setPixel(ix, iy, palettePos);
      }
    }
    const timestamp = new Date().getTime();
    const filename = `exquisite-graphics-image-${timestamp}`;
    useDownload(pb, format, filename);
  };

  const colorCodeElements = Array.from({ length: 6 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );

  const paletteItemColor = (position: number) => {
    const itemKey = paletteKey(position);
    if (palette.hasOwnProperty(itemKey)) {
      return palette[itemKey];
    }
    const generativeColor = `#${colorCodeElements[position % 6]}${
      colorCodeElements[position % 5]
    }${colorCodeElements[position % 5]}${colorCodeElements[position % 4]}${
      colorCodeElements[position % 5]
    }${colorCodeElements[position % 3]}`;
    return generativeColor;
  };

  const currPaletteItemColor = () => {
    return paletteItemColor(currPaletteItem);
  };

  const didSetPixel = (x: number, y: number, palettePos: number) => {
    console.log(`DID SET PIXL ${x}, ${y}: ${palettePos}`);
    const keyName = pixelKey(x, y);
    const wrappedPos = palettePos >= paletteSize ? paletteSize - 1 : palettePos;
    const ChangeSet: pixelCanvas = {};
    ChangeSet[keyName] = wrappedPos;
    console.log(`SET PIXELS IS ${typeof xqCanvas.width}`);
    // ZZZ TODO 
    // xqCanvas.changePixels({ ...pixels, ...ChangeSet });
  };

  const didClickPixel = (x: number, y: number) => {
    if (!dropperActive) {
      lastPixelDownRef.current = true;
      didSetPixel(x, y, currPaletteItem);
    } else {
      // set current palette item based on pixel clicked
      const newPalettePos = palettePosForPixel(x, y);
      if (currPaletteItem != newPalettePos) {
        setCurrPaletteItem(newPalettePos);
      }
      setDropperActive(false);
      lastPixelDownRef.current = true;
      didSetPixel(x, y, newPalettePos);
    }
  };

  const palettePosForPixel = (x: number, y: number) => {
    const keyName = pixelKey(x, y);
    const pixelPos = pixels[keyName];
    if (pixelPos && pixelPos > 0) {
      const cappedPixelPos =
        pixelPos < paletteSize ? pixelPos : paletteSize - 1;
      return cappedPixelPos;
    }
    return 0;
  };

  const colorForPixel = (x: number, y: number) => {
    return paletteItemColor(palettePosForPixel(x, y));
  };

  const pixelRects = [];
  for (let rowY = 0; rowY < height; rowY++) {
    for (let rowX = 0; rowX < width; rowX++) {
      const pxColor = colorForPixel(rowX, rowY);
      if (pxColor != '#FFFFFF') 
        console.log(`PIX ${rowX}, ${rowY} : ${pxColor}`);
      pixelRects.push(
        <rect
          key={pixelKey(rowX, rowY)}
          id={pixelKey(rowX, rowY)}
          data-is-pixel="true"
          width="1.1"
          height="1.1"
          x={rowX}
          y={rowY}
          fill={pxColor}
        />
      );
    }
  }

  const moveImage = (direction: string) => {
    const deltas = { x: 0, y: 0 };
    if (direction == "up") {
      deltas.y = -1;
    } else if (direction == "down") {
      deltas.y = 1;
    } else if (direction == "left") {
      deltas.x = -1;
    } else if (direction == "right") {
      deltas.x = 1;
    } else {
      return;
    }
    const movedPixels: pixelCanvas = {};
    for (const key in pixels) {
      if (pixels.hasOwnProperty(key)) {
        const [x, y] = pixelKeyVals(key);
        const newKey = pixelKey(parseInt(x) + deltas.x, parseInt(y) + deltas.y);
        movedPixels[newKey] = pixels[key];
      }
    }
    setPixels(movedPixels);
  };

  const canvasSvg = (
    <div className="flex justify-center">
      <svg
        ref={svgCanvasRef}
        width={`${width * (zoom / 100.0)}em`}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {pixelRects}
      </svg>
    </div>
  );

  const PaletteItems = [];
  for (let pi = 0; pi < paletteSize; pi++) {
    const itemKey = paletteKey(pi);
    const itemColor = paletteItemColor(pi);
    const borderText =
      currPaletteItem == pi ? "border-indigo-300" : "border-slate-800";
    const itemClasses = `relative mx-1 sm:mx-4 my-6 p-1 sm:p-4 border-8 ${borderText}`;
    const labelText = pi > 0 ? `Color ${pi}` : `Background`;
    const label = (
      <div className="absolute -bottom-10 w-24">
        <h3 className="text-slate-500 text-center">{labelText}</h3>
      </div>
    );
    PaletteItems.push(
      <div
        key={itemKey}
        className={itemClasses}
        style={{ backgroundColor: itemColor }}
        onClick={(event) => setCurrPaletteItem(pi)}
      >
        <input
          className="p-2 w-24"
          style={{ backgroundColor: itemColor }}
          type="text"
          name="BACKGROUND_COLOR"
          value={itemColor}
          onChange={(event) =>
            handleSetPaletteColor(itemKey, event.target.value)
          }
        />
        {label}
      </div>
    );
  }

  const didClickAddPaletteItem = (e: any) => {
    e.preventDefault();
    setPaletteSize(paletteSize + 1);
  };

  const didClickRemovePaletteItem = (e: any) => {
    e.preventDefault();
    if (paletteSize > 2) {
      setPaletteSize(paletteSize - 1);
    }
  };

  const didClickDropper = (e: any) => {
    setDropperActive(!dropperActive);
  };

  const loadFromPixBuffer = (pixBuffer: any) => {
    setWidth(pixBuffer.header.width);
    setHeight(pixBuffer.header.height);
    const htmlPalette: paletteItemCollection = {};
    for (let pi = 0; pi < pixBuffer.palette.length; pi++) {
      const palColor = pixBuffer.palette[pi];
      const palKey = paletteKey(pi);
      const fmtColor: string = (
        Array.from(palColor)[0] == "#" ? palColor : `#${palColor}`
      ).slice(0, 7);
      htmlPalette[palKey] = fmtColor;
    }
    setPalette(htmlPalette);
    setPaletteSize(pixBuffer.palette.length);
    const pixelMap: pixelCanvas = {};
    for (let y = 0; y < pixBuffer.header.height; y++) {
      for (let x = 0; x < pixBuffer.header.width; x++) {
        const keyName = pixelKey(x, y);
        const pixelPos = pixBuffer.getPixel(x, y);
        pixelMap[keyName] = pixelPos;
      }
    }
    setPixels(pixelMap);
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

  const setCurrPaletteItemColor = (color: string) => {
    const itemKey = paletteKey(currPaletteItem);
    handleSetPaletteColor(itemKey, color);
  };

  const handleSetPaletteColor = (itemKey: string, val: string) => {
    const fmtVal = (Array.from(val)[0] == "#" ? val : `#${val}`).slice(0, 7);
    const ChangeSet: paletteItemCollection = {};
    ChangeSet[itemKey] = fmtVal;
    setPalette({ ...palette, ...ChangeSet });
  };

  const PaletteChooser = (
    <div className="my-12 flex justify-left flex-wrap">
      {PaletteItems}
      <div className="mx-2 p-0 flex flex-col justify-center">
        <button
          onClick={(event) => didClickAddPaletteItem(event)}
          className="pt-1 px-1"
        >
          <CanvasSkin item="add-palette-item"></CanvasSkin>
        </button>

        <button
          onClick={(event) => didClickRemovePaletteItem(event)}
          className="pt-4 px-1"
        >
          <CanvasSkin item="remove-palette-item"></CanvasSkin>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const svg: SVGSVGElement | null = svgCanvasRef.current;
    if (!svg) return;

    const getRectUnderCursor = (event: PointerEvent) => {
      const element = document.elementFromPoint(event.clientX, event.clientY);
      if (!(element instanceof SVGRectElement)) return;
      if (!element.getAttribute("data-is-pixel")) return;
      const [x, y] = pixelKeyVals(element.id);
      return {
        element,
        x: parseInt(x),
        y: parseInt(y),
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (lastPixelDownRef.current == null) return;
      const rect = getRectUnderCursor(event);
      if (!rect) return;
      event.preventDefault();
      didSetPixel(rect.x, rect.y, currPaletteItem);
    };

    const onPointerDown = (event: PointerEvent) => {
      const rect = getRectUnderCursor(event);
      if (!rect) return;
      didClickPixel(rect.x, rect.y);
    };
    const onPointerUp = () => {
      lastPixelDownRef.current = null;
    };
    const onTouchMove = (event: Event) => {
      if (lastPixelDownRef.current == null) return;
      // on touchscreens, allow painting on canvas by preventing
      // touch movements on canvas from scrolling page
      event.preventDefault();
    };

    svg.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    svg.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      svg.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      svg.removeEventListener("touchmove", onTouchMove);
    };
  }, [
    width,
    height,
    currPaletteItem,
    dropperActive,
    palette,
    paletteSize,
    pixels,
  ]);

  const canvasWidth = "100%";

  return (
    <div className="min-h-screen flex flex-col bg-slate-800 pb-12">
      <div id="headerNav" className="flex flex-wrap justify-left">
        <div className="ml-6 my-2 w-20 sm:w-28">
          <CanvasLogo></CanvasLogo>
        </div>

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
          className="my-2 ml-4 sm:ml-12"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.click();
            }
          }}
        >
          <span className="bg-slate-600 py-2 px-2 sm:px-4">Load</span>
        </button>
        <button
          className="my-2 ml-4 sm:ml-12"
          onClick={(event) => didClickSave(event, "binary")}
        >
          <span className="bg-slate-600 py-2 px-2 sm:px-4">Save</span>
        </button>
        <button
          className="my-2 ml-4 sm:ml-12"
          onClick={(event) => didClickSave(event, "hex")}
        >
          <span className="bg-slate-600 py-2 px-2 sm:px-4">Export Hex</span>
        </button>
        <button
          className="my-2 ml-4 sm:ml-12"
          onClick={(event) => didClickSave(event, "svg")}
        >
          <span className="bg-slate-600 py-2 px-2 sm:px-4">Export SVG</span>
        </button>
        <div className="flex flex-column items-center my-2 ml-4 sm:ml-12">
          <div className="bg-slate-600 py-2 px-2 sm:px-4 h-10">
            <input
              type="range"
              min="10"
              max="400"
              value={zoom}
              onChange={(event) => {
                if (event.target) {
                  setZoom(parseInt(event.target.value));
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex flex-wrap justify-center">
          <fieldset className="bg-white mt-2 mx-2 p-1">
            <label className="mx-2 h-8">Width:</label>
            <input
              className="w-16 px-2 h-8"
              type="number"
              name="WIDTH"
              value={width}
              onChange={(event) => {
                if (event.target) {
                  setWidth(parseInt(event.target.value));
                }
              }}
            />
          </fieldset>
          <fieldset className="bg-white mt-2 mx-2 p-1">
            <label className="mx-2 h-8">Height:</label>
            <input
              className="w-16 px-2 h-8"
              type="number"
              name="HEIGHT"
              value={height}
              onChange={(event) => {
                if (event.target) {
                  setHeight(parseInt(event.target.value));
                }
              }}
            />
          </fieldset>
          <div className="bg-white mt-2 mx-2">
            <button
              onClick={(event) => didClickDropper(event)}
              className="pt-1 px-1"
            >
              <CanvasSkin
                item={dropperActive ? "dropper-active" : "dropper"}
              ></CanvasSkin>
            </button>
          </div>

          <div className="bg-white mt-2 mx-2">
            <button onClick={(event) => moveImage("up")} className="pt-1 px-1">
              <CanvasSkin item="move-up"></CanvasSkin>
            </button>
          </div>

          <div className="bg-white mt-2 mx-2">
            <button
              onClick={(event) => moveImage("down")}
              className="pt-1 px-1"
            >
              <CanvasSkin item="move-down"></CanvasSkin>
            </button>
          </div>

          <div className="bg-white mt-2 mx-2">
            <button
              onClick={(event) => moveImage("left")}
              className="pt-1 px-1"
            >
              <CanvasSkin item="move-left"></CanvasSkin>
            </button>
          </div>

          <div className="bg-white mt-2 mx-2">
            <button
              onClick={(event) => moveImage("right")}
              className="pt-1 px-1"
            >
              <CanvasSkin item="move-right"></CanvasSkin>
            </button>
          </div>
        </div>
        <div className="mt-6">
          {canvasSvg}
        </div>
        {PaletteChooser}
        <div className="my-6 mx-24">
          <HexColorPicker
            color={currPaletteItemColor()}
            onChange={setCurrPaletteItemColor}
          />
        </div>
      </div>
    </div>
  );
};
