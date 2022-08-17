export interface paletteItemCollection {
  [index: string]: string;
}
export interface pixelCanvas {
  [index: string]: number;
}
export interface pixelArray {
  pixels: number[];
}
export const pixelKey = (x: number, y: number) => {
  return `px_${x}X${y}`;
};

export const pixelKeyVals = (pxKey: string) => {
  if (!pxKey || pxKey.slice(0, 3) != "px_") return [];
  return pxKey.replace("px_", "").split("X");
};

export const paletteKey = (i: number) => {
  return `pal_${i}`;
};

interface CanvasStore {
  width: number;
  setWidth: (val: number) => void;
  height: number;
  setHeight: (val: number) => void;
  zoom: number;
  setZoom: (val: number) => void;
  palette: paletteItemCollection;
  getPaletteItemColor: (item: number) => string;
  getPaletteItemColors: () => string[];
  getPaletteItemColorsStr: () => string;
  setPalette: (vals: paletteItemCollection) => void;
  setPaletteItem: (item: number, val: string) => void;
  paletteSize: number;
  setPaletteSize: (val: number) => void;
  pixels: pixelCanvas;
  setPixel: (x: number, y: number, val: number) => void;
  setPixels: (vals: pixelCanvas) => void;
  getPixelVal: (x: number, y: number) => number;
  getPixelColor: (x: number, y: number) => string;
  currPaletteItem: 1;
  setCurrPaletteItem: (val: number) => void;
  dropperActive: boolean;
  setDropperActive: (val: boolean) => void;
}
