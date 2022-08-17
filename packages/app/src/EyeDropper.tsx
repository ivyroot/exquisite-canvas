import { CanvasSkin } from "./CanvasSkin";
import { CanvasStore } from "./xqcanvas/CanvasInterfaces";

export const EyeDropper = (props: { canvas: CanvasStore }) => {
  const canvas = props.canvas;

  const didClickDropper = () => {
    canvas.setDropperActive(!canvas.dropperActive);
  };

  return (
    <button onClick={(event) => didClickDropper()} className="pt-1 px-1">
      <CanvasSkin
        item={canvas.dropperActive ? "dropper-active" : "dropper"}
      ></CanvasSkin>
    </button>
  );
};
