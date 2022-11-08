import { useState } from "react";

import { CanvasSkin } from "./CanvasSkin";
import { CanvasStore } from "./xqcanvas/CanvasInterfaces";

export const EyeDropper = (props: {
  canvas: CanvasStore;
  dropperStore: EyeDropperStore;
}) => {
  function didClickDropper() {
    props.dropperStore.setActive(!props.dropperStore.active);
  }

  return (
    <button onClick={didClickDropper} className="pt-1 px-1">
      <CanvasSkin
        item={props.dropperStore.active ? "dropper-active" : "dropper"}
      ></CanvasSkin>
    </button>
  );
};

export interface EyeDropperStore {
  active: boolean;
  setActive: (val: boolean) => void;
}

export function useEyeDropperStore(): EyeDropperStore {
  const [active, setActive] = useState(false);
  const dropStore: EyeDropperStore = {
    active,
    setActive: (val: boolean) => {
      setActive(val);
    },
  };
  return dropStore;
}
