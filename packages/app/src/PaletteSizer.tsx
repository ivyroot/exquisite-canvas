import React, { useState } from "react";

export const PaletteSizer = (props) => {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);

  return (
    <div>
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
    </div>
  );
};
