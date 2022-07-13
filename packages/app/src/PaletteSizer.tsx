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
    return pixels[keyName] == "ON" ? "bg-sky-500" : "bg-white";
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
      <div className="flex" key={i}>
        {myCols}
      </div>
    );
  }

  return (
    <div>
      <p>INSPECT:</p>
      <fieldset>
        <label>
          WIDTH
          <input
            type="number"
            name="WIDTH"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
          />
        </label>
      </fieldset>
      <fieldset>
        <label>
          HEIGHT
          <input
            type="number"
            name="HEIGHT"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </label>
      </fieldset>
      <div>
        <div className="flex flex-col border-solid border-2 border-indigo-60">
          {MyRows}
        </div>
      </div>
    </div>
  );
};
