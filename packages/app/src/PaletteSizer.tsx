import React, { useEffect, useState } from "react";

import { Button } from "./Button";
import { useDownload } from "./useDownload";
import { Pixel, PixelColor, PixelMap } from "./xgfx/api";
import { ExquisiteBitmapHeader, PixelBuffer } from "./xgfx/ll_api";

const pixelKey = (x, y) => {
  return `${x}||${y}`;
};

const paletteKey = (i) => {
  return `pal_${i}`;
};

export const PaletteSizer = (props) => {
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);
  const [pixels, setPixels] = useState({});
  const [palette, setPalette] = useState({
    pal_0: "#F8FAFC",
    pal_1: "#0EA5E9",
  });
  const [paletteSize, setPaletteSize] = useState(2);
  const header = {
    version: 1,
    width: width,
    height: height,
    numColors: 2,
    scaleFactor: 1,
    alpha: 1,
    backgroundIncluded: true,
    backgroundIndex: 0,
  };

  const didClickPix = (x, y) => {
    const keyName = pixelKey(x, y);
    const ChangeSet = {};
    ChangeSet[keyName] = pixels[keyName] == "ON" ? "" : "ON";
    setPixels({ ...pixels, ...ChangeSet });
  };

  const generatePixels = () => {
    const pixelList = [];
    for (let i1 = 0; i1 < width; i1++) {
      for (let i2 = 0; i2 < height; i2++) {
        const keyName = pixelKey(i1, i2);
        const colorPos = pixels[keyName] == "ON" ? 1 : 0;
        pixelList.push({
          x: i1,
          y: i2,
          color: colorPos,
        });
      }
    }
    return pixelList;
  };

  const didClickSave = (e) => {
    e.preventDefault();
    useDownload(header, palette, generatePixels());
  };

  const displayPix = (x, y) => {
    const keyName = pixelKey(x, y);
    return pixels[keyName] == "ON" ? "X" : "0";
  };

  const pixStyles = (x, y) => {
    const keyName = pixelKey(x, y);
    if (pixels[keyName] == "ON") {
      return { backgroundColor: palette[paletteKey(1)] };
    } else {
      return { backgroundColor: palette[paletteKey(0)] };
    }
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
    console.log(`adding item ${paletteKey(paletteSize)} -- ${paletteSize}`);
    setPaletteSize(paletteSize + 1);
  };

  const didClickRemovePaletteItem = (e) => {
    e.preventDefault();
    if (paletteSize > 2) {
      setPaletteSize(paletteSize - 1);
    }
  };

  const handleSetPaletteColor = (itemKey, val) => {
    const fmtVal = Array.from(val)[0] == "#" ? val : `#${val}`;
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
        <h1 className="text-4xl py-2">
          <span className="bg-slate-200 p-2">px grid</span>
        </h1>
        <button
          className="bg-slate-200  p-2 m-2"
          onClick={(event) => didClickSave(event)}
        >
          LOAD
        </button>
        <button
          className="bg-slate-200  p-2 m-2"
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
