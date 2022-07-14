import React, { useEffect, useState } from "react";

const pixelKey = (x, y) => {
  return `${x}||${y}`;
};

export const PaletteSizer = (props) => {
  const [bg, setBackgroundColor] = useState("#F8FAFC");
  const [fg, setForegroundColor] = useState("#0EA5E9");
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);
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

  const PaletteChooser = (
    <div className="my-12 flex justify-center">
      <div className="mx-8 p-4" style={{ backgroundColor: bg }}>
        <input
          className="p-2 w-24"
          style={{ backgroundColor: bg }}
          type="text"
          name="BACKGROUND_COLOR"
          value={bg}
          onChange={(event) => setBackgroundColor(event.target.value)}
        />
      </div>

      <div className="mx-8 p-4" style={{ backgroundColor: fg }}>
        <input
          className="p-2 w-24"
          style={{ backgroundColor: fg }}
          type="text"
          name="COLOR_1"
          value={fg}
          onChange={(event) => setForegroundColor(event.target.value)}
        />
      </div>
      <div className="bg-slate-500 mx-8 p-4">
        <div className="p-2">ADD COLOR</div>
      </div>
    </div>
  );

  return (
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
  );
};
