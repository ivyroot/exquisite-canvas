import { CanvasSkin } from "./CanvasSkin";
import { CanvasStore } from "./xqcanvas/CanvasInterfaces";

export const ClearButton = (props: { canvas: CanvasStore }) => {
  return (
    <button onClick={() => props.canvas.clear()} className="pt-1 px-1">
      <CanvasSkin item={`clear`}></CanvasSkin>
    </button>
  );
};
