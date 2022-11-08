import { CanvasSkin } from "./CanvasSkin";
import {
  canvasPixels,
  CanvasStore,
  getPixelKeyXY,
  pixelKey,
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
    const movedPixels: canvasPixels = {};
    for (const key in canvas.pixels) {
      const [x, y] = getPixelKeyXY(key);
      const newKey = pixelKey(x + deltas.x, y + deltas.y);
      movedPixels[newKey] = canvas.pixels[key];
    }
    canvas.setPixels(movedPixels);
  };

  return (
    <button onClick={didClickMove} className="pt-1 px-1">
      <CanvasSkin item={`move-${direction}`}></CanvasSkin>
    </button>
  );
};
