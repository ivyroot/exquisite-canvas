import React, { useEffect, useRef, useState } from "react";

import { Button } from "./Button";
import { useDownload } from "./useDownload";
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
  return `${x}||${y}`;
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
    for (let i1 = 0; i1 < width; i1++) {
      for (let i2 = 0; i2 < height; i2++) {
        const palettePos = palettePosForPixel(i1, i2);
        pixelList.push({
          x: i1,
          y: i2,
          color: palettePos,
        });
      }
    }
    return pixelList;
  };

  const didClickSave = (e) => {
    e.preventDefault();
    useDownload(header, paletteArray(), generatePixels());
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
      return cappedPixelPos;
    }
    return 0;
  };

  const colorForPixel = (x, y) => {
    return paletteItemColor(palettePosForPixel(x, y));
  };

  const pixStyles = (x, y) => {
    return { backgroundColor: colorForPixel(x, y) };
  };

  const MyRows = [];
  for (let i = 0; i < height; i++) {
    const myCols = [];
    for (let i2 = 0; i2 < width; i2++) {
      myCols.push(
        <div
          key={pixelKey(i, i2)}
          className="text-center w-8 h-8 p-1"
          style={pixStyles(i, i2)}
          onClick={(event) => didClickPix(i, i2)}
        ></div>
      );
    }
    MyRows.push(
      <div className="flex flex-auto justify-center" key={i}>
        {myCols}
      </div>
    );
  }

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
    console.log(`LOADING FROM EXQUISITE GRAPHICS FILE`);
    setWidth(pixBuffer.header.width);
    setHeight(pixBuffer.header.height);
    console.log(`WxH: ${pixBuffer.header.width}x${pixBuffer.header.height}`);
    const htmlPalette = {};
    for (let pi = 0; pi < pixBuffer.palette.length; pi++) {
      const palKey = paletteKey(pi);
      htmlPalette[palKey] = pixBuffer.palette[pi];
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
    console.log("files:", files);
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file, "UTF-8");
      reader.onload = () => {
        console.log(`loading file contents`);
        const fileDataStr = [...new Uint8Array(reader.result)]
          .map((x) => x.toString(16).padStart(2, "0"))
          .join("");
        const fullFileDataStr = `0x${fileDataStr}`;
        console.log(`Loaded file hex: ${fullFileDataStr}`);
        const exquisiteBuffer = new PixelBuffer();
        exquisiteBuffer.from(fullFileDataStr);
        console.log(
          `Loading from Exquisite Graphics file with palette size: ${exquisiteBuffer.palette.length}`
        );
        loadFromPixBuffer(exquisiteBuffer);
      };
      reader.onerror = (e) => {
        console.log(`ERROR LOADING FILE CONTENTS`);
      };
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
        <h1 className="text-2xl py-2 mt-2">
          <span className="bg-slate-200 p-2">Exquisite Canvas</span>
        </h1>

        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            loadFile(e);
            inputRef.current.value = null;
          }}
        />
        <button
          className="bg-slate-200  py-1 px-4 ml-12 mt-2 text-2xl"
          onClick={() => inputRef.current.click()}
        >
          LOAD
        </button>
        <button
          className="bg-slate-200  py-1 px-4 ml-12 mt-2 text-2xl"
          onClick={(event) => didClickSave(event)}
        >
          SAVE
        </button>
      </div>
      <div className="containe mt-12">
        <div className="flex justify-center">
          <fieldset className="bg-slate-200 mx-2">
            <label className="mx-2">WIDTH:</label>
            <input
              className="px-2"
              type="number"
              name="WIDTH"
              value={width}
              onChange={(event) => setWidth(event.target.value)}
            />
          </fieldset>
          <fieldset className="bg-slate-200 mx-2">
            <label className="mx-2">HEIGHT:</label>
            <input
              className="px-2"
              type="number"
              name="HEIGHT"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </fieldset>
        </div>
        <div className="mt-6">
          <div className="flex flex-col flex-auto">{MyRows}</div>
        </div>
        {PaletteChooser}
      </div>
    </div>
  );
};
