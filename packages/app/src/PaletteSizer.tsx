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
    console.log(`HEY YEAH E CLICKED ${keyName}`);
    const ChangeSet = {};
    ChangeSet[keyName] = pixels[keyName] == "ON" ? "" : "ON";
    setPixels({ ...pixels, ...ChangeSet });
  };

  const MyRows = [];
  for (let i = 0; i < height; i++) {
    const myCols = [];
    for (let i2 = 0; i2 < width; i2++) {
      const displayVal = `--0--${
        pixels[pixelKey(i, i2)] ? pixels[pixelKey(i, i2)] : ""
      }`;
      myCols.push(
        <div onClick={(event) => didClickPix(i, i2)}> {displayVal} </div>
      );
    }
    MyRows.push(<li key={i}>{myCols}</li>);
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
        <ul>{MyRows}</ul>
      </div>
    </div>
  );
};
