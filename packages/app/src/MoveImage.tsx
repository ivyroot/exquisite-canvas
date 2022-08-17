import { CanvasSkin } from "./CanvasSkin";
import {
  CanvasStore,
  paletteKey,
  pixelKey,
  pixelKeyVals,
} from "./xqcanvas/CanvasInterfaces";

export const MoveImage = (props: {
  canvas: CanvasStore;
  direction: string;
}) => {
  const canvas = props.canvas;
  const direction = props.direction;

  const didClickMove = (e: any) => {
    console.log("doing move ");
    const deltas = { x: 0, y: 0 };
    if (direction == "up") {
      deltas.y = -1;
    } else if (direction == "down") {
      deltas.y = 1;
    } else if (direction == "left") {
      deltas.x = -1;
    } else if (direction == "right") {
      deltas.x = 1;
    } else {
      return;
    }
    const movedPixels: pixelCanvas = {};
    for (const key in canvas.pixels) {
      if (canvas.pixels.hasOwnProperty(key)) {
        const [x, y] = pixelKeyVals(key);
        const newKey = pixelKey(parseInt(x) + deltas.x, parseInt(y) + deltas.y);
        movedPixels[newKey] = canvas.pixels[key];
      }
    }
    canvas.setPixels(movedPixels);
  };

  const canvasSkinKey = `move-${direction}`;

  return (
    <button onClick={(event) => didClickMove(event)} className="pt-1 px-1">
      <CanvasSkin item={canvasSkinKey}></CanvasSkin>
    </button>
  );
};
