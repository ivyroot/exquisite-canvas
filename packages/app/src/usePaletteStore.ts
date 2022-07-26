import { useState } from "react";

export interface PaletteStore {
  currentItem: number;
  setCurrentItem: (val: number) => void;
}

export function usePaletteStore(): PaletteStore {
  const [currItem, setCurrItem] = useState(1);
  const store: PaletteStore = {
    currentItem: currItem,
    setCurrentItem: (val: number) => {
      setCurrItem(val);
    },
  };
  return store;
}
