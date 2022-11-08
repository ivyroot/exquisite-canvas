import { HexColorPicker } from "react-colorful";

import { CanvasSkin } from "./CanvasSkin";
import { CanvasStore } from "./xqcanvas/CanvasInterfaces";

export const BasicColorPicker = (props: {
  canvas: CanvasStore;
  currentPaletteItem: number;
}) => {
  const setCurrentPaletteItemColor = (color: string) => {
    props.canvas.setPaletteItem(props.currentPaletteItem, color);
  };

  return (
    <div className="flex flex-col justify-center align-middle content-center">
      <input
        className="p-2 w-24 my-2 opacity-75 rounded-md"
        style={{ backgroundColor: "#FFFFF" }}
        type="text"
        value={props.canvas.getPaletteItemColor(props.currentPaletteItem)}
        onChange={(event) => setCurrentPaletteItemColor(event.target.value)}
      />
      <HexColorPicker
        color={props.canvas.getPaletteItemColor(props.currentPaletteItem)}
        onChange={setCurrentPaletteItemColor}
      />
    </div>
  );
};
