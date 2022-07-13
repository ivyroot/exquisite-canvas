import React, { useState } from "react";

export const NumberInput = (props) => {
  const [width, setWidth] = useState(8);

  return (
    <fieldset>
      <label>
        {props.name}:
        <input
          type="number"
          name={props.name}
          value={width}
          onChange={(event) => setWidth(event.target.value)}
        />
      </label>
    </fieldset>
  );
};
