import create from "zustand";

import {
  CanvasCoreStore,
  CanvasHistory,
  canvasPalette,
  CanvasState,
  CanvasStore,
  paletteKey,
  pixelCanvas,
  pixelKey,
} from "./CanvasInterfaces";

const colorCodeElements = Array.from({ length: 6 }, (_, i) =>
  String.fromCharCode("A".charCodeAt(0) + i)
);

const DefaultPalette: canvasPalette = {
  pal_0: "#2FFAFF",
  pal_1: "#0EA5E9",
};
const EmptyPixels: pixelCanvas = {};

const useCanvasStore = create<CanvasCoreStore>((set) => ({
  width: 8,
  setWidth: (val: number) => set((state) => ({ width: val })),
  height: 8,
  setHeight: (val: number) => set((state) => ({ height: val })),
  zoom: 200,
  setZoom: (val: number) => set((state) => ({ zoom: val })),
  palette: DefaultPalette,
  paletteSize: 2,
  setPaletteSize: (val: number) => set((state) => ({ paletteSize: val })),
  setPalette: (vals: canvasPalette) => set((state) => ({ palette: vals })),
  setPaletteItem: (item: number, val: string) =>
    set((state) => {
      const itemKey = paletteKey(item);
      const fmtVal = (Array.from(val)[0] == "#" ? val : `#${val}`).slice(0, 7);
      const ChangeSet: canvasPalette = {};
      ChangeSet[itemKey] = fmtVal;
      return { palette: { ...state.palette, ...ChangeSet } };
    }),
  pixels: EmptyPixels,
  setPixel: (x: number, y: number, palettePos: number) =>
    set((state) => {
      const keyName = pixelKey(x, y);
      const wrappedPos =
        palettePos >= state.paletteSize ? state.paletteSize - 1 : palettePos;
      const ChangeSet: pixelCanvas = {};
      ChangeSet[keyName] = wrappedPos;
      const newPixels = { ...state.pixels, ...ChangeSet };
      return { pixels: newPixels };
    }),
  setPixels: (vals: pixelCanvas) => set((state) => ({ pixels: vals })),
  setFromCanvasState: (canvas: CanvasState) =>
    set((state) => ({
      height: canvas.height,
      width: canvas.width,
      zoom: canvas.zoom,
      palette: canvas.palette,
      pixels: canvas.pixels,
    })),
  updateFromCanvasState: (canvasUpdates: CanvasState): void =>
    set((state) => ({
      height: canvasUpdates.height,
      width: canvasUpdates.width,
      zoom: canvasUpdates.zoom,
      palette: { ...state.palette, ...canvasUpdates.palette },
      pixels: { ...state.pixels, ...canvasUpdates.pixels },
    })),
}));

export function useXqstCanvasStore(history: CanvasHistory | null): CanvasStore {
  const store = useCanvasStore((state) => {
    const getPaletteItemColor = (item: number) => {
      const liveColor = state.palette[paletteKey(item)];
      if (liveColor) {
        return liveColor;
      }
      const generativeColor = `#${colorCodeElements[item % 6]}${
        colorCodeElements[item % 5]
      }${colorCodeElements[item % 5]}${colorCodeElements[item % 4]}${
        colorCodeElements[item % 5]
      }${colorCodeElements[item % 3]}`;
      return generativeColor;
    };
    const getPaletteItemColors = () => {
      return Array.from({ length: state.paletteSize }, (v, i) => {
        return getPaletteItemColor(i);
      });
    };
    const getPaletteItemColorsStr = () => {
      return getPaletteItemColors().join("_");
    };
    const getPixelVal = (x: number, y: number) => {
      const storePixVal = state.pixels[pixelKey(x, y)];
      if (storePixVal == null) {
        return 0;
      } else if (storePixVal >= state.paletteSize) {
        return state.paletteSize - 1;
      } else {
        return storePixVal;
      }
    };
    const getPixelColor = (x: number, y: number) => {
      return getPaletteItemColor(getPixelVal(x, y));
    };
    const getCurrentState = () => {
      return {
        width: state.width,
        height: state.height,
        zoom: state.zoom,
        palette: state.palette,
        pixels: state.pixels,
      };
    };
    const addToHistory = () => {
      if (history) {
        history.addCanvasStateToHistory(getCurrentState());
      }
    };
    const setState = (newCanvasState: CanvasState) => {
      state.setFromCanvasState(newCanvasState);
    };
    const updateState = (canvasUpdates: CanvasState) => {
      state.updateFromCanvasState(canvasUpdates);
      addToHistory();
    };
    const resetState = (newCanvasState: CanvasState) => {
      if (history) {
        history.resetCanvasHistory(newCanvasState);
      }
      setState(newCanvasState);
    };
    const setPixel = (x: number, y: number, val: number): void => {
      state.setPixel(x, y, val);
      addToHistory();
    };
    const setPixels = (vals: pixelCanvas) => {
      state.setPixels(vals);
      addToHistory();
    };

    return {
      ...state,
      getPaletteItemColor,
      getPaletteItemColors,
      getPaletteItemColorsStr,
      setPixel,
      setPixels,
      getPixelVal,
      getPixelColor,
      getCurrentState,
      setState,
      updateState,
      resetState,
    };
  });

  return store;
}
