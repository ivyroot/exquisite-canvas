import { HexColorPicker } from "react-colorful";

import { CanvasSkin } from "./CanvasSkin";
import { CanvasStore } from "./xqcanvas/CanvasInterfaces";


export const BasicColorPicker = (props: { canvas: CanvasStore; currentPaletteItem: number }) => {

  const setCurrPaletteItemColor = (color: string) => {
    props.canvas.setPaletteItem(props.currentPaletteItem, color);
  };

  return (
    <HexColorPicker
      color={props.canvas.getPaletteItemColor(props.currentPaletteItem)}
      onChange={setCurrPaletteItemColor}
    />
  );
};
