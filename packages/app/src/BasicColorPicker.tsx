import { HexColorPicker } from "react-colorful";

import { CanvasSkin } from "./CanvasSkin";
import { CanvasStore } from "./xqcanvas/CanvasInterfaces";

export const BasicColorPicker = (props: { canvas: CanvasStore }) => {
  const canvas = props.canvas;

  const currPaletteItemColor = () => {
    return canvas.getPaletteItemColor(canvas.currPaletteItem);
  };

  const setCurrPaletteItemColor = (color: string) => {
    canvas.setPaletteItem(canvas.currPaletteItem, color);
  };

  return (
    <HexColorPicker
      color={currPaletteItemColor()}
      onChange={setCurrPaletteItemColor}
    />
  );
};
