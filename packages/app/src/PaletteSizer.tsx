import React, { useEffect, useState } from "react";

import { Button } from "./Button";
import { useDownload } from "./useDownload";
import { Pixel, PixelColor, PixelMap } from "./xgfx/api";
import { ExquisiteBitmapHeader, PixelBuffer } from "./xgfx/ll_api";

const pixelKey = (x, y) => {
  return `${x}||${y}`;
};

export const PaletteSizer = (props) => {
  const [bg, setBackgroundColor] = useState("#F8FAFC");
  const [fg, setForegroundColor] = useState("#0EA5E9");
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);
  const [pixels, setPixels] = useState({});
  const [palette, setPalette] = useState(["#F8FAFC", "#0EA5E9"]);
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

  const didClickAddPaletteItem = (e) => {
    e.preventDefault();
  };

  const didClickRemovePaletteItem = (e) => {
    e.preventDefault();
  };

  const displayPix = (x, y) => {
    const keyName = pixelKey(x, y);
    return pixels[keyName] == "ON" ? "X" : "0";
  };

  const pixClasses = (x, y) => {
    const keyName = pixelKey(x, y);
    return pixels[keyName] == "ON" ? "bg-sky-500" : "bg-slate-50";
  };

  const pixStyles = (x, y) => {
    const keyName = pixelKey(x, y);
    if (pixels[keyName] == "ON") {
      return { backgroundColor: fg };
    } else {
      return { backgroundColor: bg };
    }
  };

  const MyRows = [];
  for (let i = 0; i < height; i++) {
    const myCols = [];
    for (let i2 = 0; i2 < width; i2++) {
      const ClassNameList = `text-center w-8 h-8 p-1`;
      myCols.push(
        <div
          key={pixelKey(i, i2)}
          className={ClassNameList}
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

  const didChangePalette = (pos, color) => {
    const ChangeSet = palette;
    palette[pos] = color;
    setPalette(palette);
  };

  const handleSetPaletteColor = (pos, val) => {
    const fmtVal = Array.from(val)[0] == "#" ? val : `#${val}`;
    const ChangeSet = Array.from(palette, function mapFn(element, index) {
      return pos == index ? fmtVal : element;
    });
    setPalette(ChangeSet);
  };

  const PaletteChooser = (
    <div className="my-12 flex justify-center">
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

      <div className="mx-8 p-4" style={{ backgroundColor: palette[0] }}>
        <input
          className="p-2 w-24"
          style={{ backgroundColor: palette[0] }}
          type="text"
          name="BACKGROUND_COLOR"
          value={palette[0]}
          onChange={(event) => handleSetPaletteColor(0, event.target.value)}
        />
      </div>

      <div className="mx-8 p-4" style={{ backgroundColor: palette[1] }}>
        <input
          className="p-2 w-24"
          style={{ backgroundColor: palette[1] }}
          type="text"
          name="COLOR_1"
          value={palette[1]}
          onChange={(event) => handleSetPaletteColor(1, event.target.value)}
        />
      </div>
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