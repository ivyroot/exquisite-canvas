import { CanvasSkin } from "./CanvasSkin";
import { CanvasHistory, CanvasStore } from "./xqcanvas/CanvasInterfaces";

export const UndoButton = (props: {
  canvas: CanvasStore;
  history: CanvasHistory;
}) => {
  const didClickUndo = () => {
    if (!props.history.canUndo()) {
      return;
    }
    props.canvas.setState(props.history.undoLastCanvasUpdate());
  };
  return (
    <button onClick={didClickUndo} className="pt-1 px-1">
      <CanvasSkin item={`undo`}></CanvasSkin>
    </button>
  );
};
