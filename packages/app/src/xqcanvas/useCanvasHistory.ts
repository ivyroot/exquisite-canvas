import { useDebouncedCallback } from "use-debounce";
import { useLocalStorage } from "usehooks-ts";

import { CanvasHistory, CanvasState } from "./CanvasInterfaces";

// history & undo using local storage, inspired by Daily Canvas -- https://www.dailycanvasStore.com/
export const useCanvasHistory = (props: {
  canvasName: string;
  blankState: CanvasState;
}): CanvasHistory => {
  const [canvasHistory, setCanvasHistory] = useLocalStorage<CanvasState[]>(
    props.canvasName,
    [props.blankState]
  );

  const addCanvasStateToHistory = useDebouncedCallback(
    (newState: CanvasState) => {
      setCanvasHistory([newState, ...(canvasHistory || [props.blankState])]);
    },
    500
  );

  const resetCanvasHistory = (initialState: CanvasState) => {
    setCanvasHistory([initialState]);
  };

  const canUndo = () => {
    return canvasHistory && canvasHistory.length > 0;
  };

  const undoLastCanvasUpdate = () => {
    // eslint-disable-next-line
        const [_canvas, ...prevCanvasHistory] = canvasHistory || [props.blankState];
    setCanvasHistory(prevCanvasHistory);
    return prevCanvasHistory[0] || props.blankState;
  };

  return {
    addCanvasStateToHistory,
    resetCanvasHistory,
    canUndo,
    undoLastCanvasUpdate,
  };
};
