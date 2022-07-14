import React, { useState } from "react";

const pixelKey = (x, y) => {
  return `${x}||${y}`;
};

export const PaletteSizer = (props) => {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const [pixels, setPixels] = useState({});

  const didClickPix = (x, y) => {
    const keyName = pixelKey(x, y);
    const ChangeSet = {};
    ChangeSet[keyName] = pixels[keyName] == "ON" ? "" : "ON";
    setPixels({ ...pixels, ...ChangeSet });
  };

  const displayPix = (x, y) => {
    const keyName = pixelKey(x, y);
    return pixels[keyName] == "ON" ? "X" : "0";
  };

  const pixClasses = (x, y) => {
    const keyName = pixelKey(x, y);
    return pixels[keyName] == "ON" ? "bg-sky-500" : "bg-slate-50";
  };

  const MyRows = [];
  for (let i = 0; i < height; i++) {
    const myCols = [];
    for (let i2 = 0; i2 < width; i2++) {
      const ClassNameList = `text-center w-8 h-8 p-1 ${pixClasses(i, i2)}`;
      myCols.push(
        <div
          className={ClassNameList}
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

  return (
    <div className="container">
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
    </div>
  );
};
