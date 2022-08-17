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

  const didClickMove = () => {
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
      const [x, y] = pixelKeyVals(key);
      const newKey = pixelKey(x + deltas.x, y + deltas.y);
      movedPixels[newKey] = canvas.pixels[key];
    }
    canvas.setPixels(movedPixels);
  };

  const canvasSkinItem = `move-${direction}`;

  return (
    <button onClick={didClickMove} className="pt-1 px-1">
      <CanvasSkin item={canvasSkinItem}></CanvasSkin>
    </button>
  );
};
