import React, { useState } from "react";

export const PaletteSizer = (props) => {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const MyRows = [];
  for (let i = 0; i < height; i++) {
    const myCols = [];
    for (let i2 = 0; i2 < width; i2++) {
      myCols.push(<span>-0-</span>);
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
