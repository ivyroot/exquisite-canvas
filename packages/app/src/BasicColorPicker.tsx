import { HexColorPicker } from "react-colorful";

import { CanvasSkin } from "./CanvasSkin";
import { CanvasStore } from "./xqcanvas/CanvasInterfaces";

export const BasicColorPicker = (props: { canvas: CanvasStore }) => {
  const canvas = props.canvas;

  const setCurrPaletteItemColor = (color: string) => {
    canvas.setPaletteItem(canvas.currPaletteItem, color);
  };

  return (
    <HexColorPicker
      color={canvas.getPaletteItemColor(canvas.currPaletteItem)}
      onChange={setCurrPaletteItemColor}
    />
  );
};
