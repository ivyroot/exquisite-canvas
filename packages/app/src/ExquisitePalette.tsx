import React, { useEffect, useRef, useState } from "react";

import { Button } from "./Button";
import { CanvasLogo } from "./CanvasLogo";
import { useDownload, useLoadPixelBuffer } from "./useExquisiteFiles";
import { Pixel, PixelColor, PixelMap } from "./xgfx/api";
import { ExquisiteBitmapHeader, PixelBuffer } from "./xgfx/ll_api";

// Convert a byte array to a hex string
// TODO use existing implementation
function bytesToHex(bytes: number[]) {
  for (var hex: string[] = [], i = 0; i < bytes.length; i++) {
    const current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join("");
}

const pixelKey = (x, y) => {
  return `px_${x}X${y}`;
};

const paletteKey = (i) => {
  return `pal_${i}`;
};

export const ExquisitePalette = (props) => {
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);
  const [palette, setPalette] = useState({
    pal_0: "#F8FAFC",
    pal_1: "#0EA5E9",
  });
  const [paletteSize, setPaletteSize] = useState(2);
  const [pixels, setPixels] = useState({});
  const header = {
    version: 1,
    width: parseInt(width),
    height: parseInt(height),
    numColors: parseInt(paletteSize),
    scaleFactor: 1,
    alpha: false,
    backgroundIncluded: false,
    backgroundIndex: 0,
  };
  const inputRef = useRef();

  const didClickPix = (x, y) => {
    const keyName = pixelKey(x, y);
    const nextPos = pixels[keyName] ? pixels[keyName] + 1 : 1;
    const wrappedPos = nextPos >= paletteSize ? 0 : nextPos;
    const ChangeSet = {};
    ChangeSet[keyName] = wrappedPos;
    setPixels({ ...pixels, ...ChangeSet });
  };

  const paletteArray = () => {
    return Array.from({ length: paletteSize }, (v, i) => {
      return paletteItemColor(i);
    });
  };

  const generatePixels = () => {
    const pixelList = [];
    for (let iy = 0; iy < height; iy++) {
      for (let ix = 0; ix < width; ix++) {
        const palettePos = palettePosForPixel(ix, iy);
        pixelList.push({
          x: ix,
          y: iy,
          color: palettePos,
        });
      }
    }
    return pixelList;
  };

  const didClickSave = (e, format) => {
    e.preventDefault();
    const pb = new PixelBuffer(header, paletteArray());
    const pixels = generatePixels();
    pixels.forEach((el) => {
      pb.setPixel(el.x, el.y, el.color);
    });
    const timestamp = new Date().getTime();
    const filename = `exquisite-graphics-image-${timestamp}`;
    useDownload(pb, format, filename);
  };

  const colorCodeElements = Array.from({ length: 6 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );

  const paletteItemColor = (position) => {
    const itemKey = paletteKey(position);
    const generativeColor = `#${colorCodeElements[position % 6]}${
      colorCodeElements[position % 5]
    }${colorCodeElements[position % 5]}${colorCodeElements[position % 4]}${
      colorCodeElements[position % 5]
    }${colorCodeElements[position % 3]}`;
    return palette.hasOwnProperty(itemKey) ? palette[itemKey] : generativeColor;
  };

  const palettePosForPixel = (x, y) => {
    const keyName = pixelKey(x, y);
    const pixelPos = pixels[keyName];
    if (pixelPos && pixelPos > 0) {
      const cappedPixelPos =
        pixelPos < paletteSize ? pixelPos : paletteSize - 1;
      return parseInt(cappedPixelPos);
    }
    return 0;
  };

  const colorForPixel = (x, y) => {
    return paletteItemColor(palettePosForPixel(x, y));
  };

  const pixStyles = (x, y) => {
    return { backgroundColor: colorForPixel(x, y) };
  };

  const pixelRects = [];
  for (let rowY = 0; rowY < height; rowY++) {
    for (let rowX = 0; rowX < width; rowX++) {
      const pxColor = colorForPixel(rowX, rowY);
      pixelRects.push(
        <rect
          key={pixelKey(rowX, rowY)}
          width="1"
          height="1"
          x={rowX}
          y={rowY}
          fill={pxColor}
          onClick={(event) => didClickPix(rowX, rowY)}
        />
      );
    }
  }

  const canvasSvg = (
    <div className="flex justify-center">
      <svg
        width={`${width}em`}
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
    PaletteItems.push(
      <div
        key={itemKey}
        className="mx-8 my-4 p-4"
        style={{ backgroundColor: itemColor }}
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
      </div>
    );
  }

  const didClickAddPaletteItem = (e) => {
    e.preventDefault();
    setPaletteSize(paletteSize + 1);
  };

  const didClickRemovePaletteItem = (e) => {
    e.preventDefault();
    if (paletteSize > 2) {
      setPaletteSize(paletteSize - 1);
    }
  };

  const loadFromPixBuffer = (pixBuffer) => {
    setWidth(pixBuffer.header.width);
    setHeight(pixBuffer.header.height);
    const htmlPalette = {};
    for (let pi = 0; pi < pixBuffer.palette.length; pi++) {
      const palColor = pixBuffer.palette[pi];
      const palKey = paletteKey(pi);
      const fmtColor = (
        Array.from(palColor)[0] == "#" ? palColor : `#${palColor}`
      ).slice(0, 7);
      htmlPalette[palKey] = fmtColor;
    }
    setPalette(htmlPalette);
    setPaletteSize(pixBuffer.palette.length);
    const pixelMap = {};
    for (let y = 0; y < pixBuffer.header.height; y++) {
      for (let x = 0; x < pixBuffer.header.width; x++) {
        const keyName = pixelKey(x, y);
        const pixelPos = pixBuffer.getPixel(x, y);
        pixelMap[keyName] = pixelPos;
      }
    }
    setPixels(pixelMap);
  };

  const loadFile = (e) => {
    const files = Array.from(e.target.files);
    const file = files[0];
    if (file) {
      useLoadPixelBuffer(file, loadFromPixBuffer);
    }
  };

  const handleSetPaletteColor = (itemKey, val) => {
    const fmtVal = (Array.from(val)[0] == "#" ? val : `#${val}`).slice(0, 7);
    const ChangeSet = {};
    ChangeSet[itemKey] = fmtVal;
    setPalette({ ...palette, ...ChangeSet });
  };

  const PaletteChooser = (
    <div className="my-12 flex justify-left flex-wrap">
      <div className="mx-8 p-0 flex flex-col justify-center">
        <button
          className="bg-slate-200  p-1"
          onClick={(event) => didClickAddPaletteItem(event)}
        >
          +
        </button>
        <button
          className="bg-slate-200  p-1 mt-2"
          onClick={(event) => didClickRemovePaletteItem(event)}
        >
          -
        </button>
      </div>
      {PaletteItems}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      <div className="flex justify-left">
        <div className="ml-6 mt-2">
          <CanvasLogo></CanvasLogo>
        </div>

        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            loadFile(e);
            inputRef.current.value = null;
          }}
        />
        <button className="mt-2 " onClick={() => inputRef.current.click()}>
          <span className="bg-slate-600 py-2 px-4 ml-12">Load</span>
        </button>
        <button
          className="mt-2"
          onClick={(event) => didClickSave(event, "binary")}
        >
          <span className="bg-slate-600 py-2 px-4 ml-12">Save</span>
        </button>
        <button
          className="mt-2"
          onClick={(event) => didClickSave(event, "hex")}
        >
          <span className="bg-slate-600 py-2 px-4 ml-12 ">Export Hex</span>
        </button>
        <button
          className="mt-2"
          onClick={(event) => didClickSave(event, "svg")}
        >
          <span className="bg-slate-600 py-2 px-4 ml-12 ">Export SVG</span>
        </button>
      </div>
      <div className="containe mt-12">
        <div className="flex justify-center">
          <fieldset className="bg-slate-200 mx-2">
            <label className="mx-2">Width:</label>
            <input
              className="px-2"
              type="number"
              name="WIDTH"
              value={width}
              onChange={(event) => setWidth(event.target.value)}
            />
          </fieldset>
          <fieldset className="bg-slate-200 mx-2">
            <label className="mx-2">Height:</label>
            <input
              className="px-2"
              type="number"
              name="HEIGHT"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </fieldset>
        </div>
        <div className="mt-6">{canvasSvg}</div>
        {PaletteChooser}
      </div>
    </div>
  );
};
