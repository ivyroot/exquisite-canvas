import React, { useState } from "react";

function range(start, end) {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}

export const PaletteSizer = (props) => {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const MyRows = [];
  for (let i = 0; i < height; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
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
