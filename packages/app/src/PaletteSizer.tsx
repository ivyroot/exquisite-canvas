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

  const MyRows = [];
  for (let i = 0; i < height; i++) {
    const myCols = [];
    for (let i2 = 0; i2 < width; i2++) {
      myCols.push(
        <span onClick={(event) => didClickPix(i, i2)}>
          {" "}
          {displayPix(i, i2)}{" "}
        </span>
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
