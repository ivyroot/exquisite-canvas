export const paletteKey = (i: number) => {
  return `pal_${i}`;
};

export interface canvasPalette {
  [index: string]: string;
}

export const pixelKey = (x: number, y: number) => {
  return `px_${x}X${y}`;
};

export const getPixelKeyXY: (key: string) => number[] = (pxKey: string) => {
  if (!pxKey || pxKey.slice(0, 3) != "px_") return [];
  return pxKey
    .replace("px_", "")
    .split("X")
    .map((val) => parseInt(val));
};

export interface canvasPixels {
  [index: string]: number;
}

export interface CanvasState {
  width: number;
  height: number;
  zoom: number;
  palette: canvasPalette;
  pixels: canvasPixels;
}

export interface CanvasCoreStore {
  width: number;
  setWidth: (val: number) => void;
  height: number;
  setHeight: (val: number) => void;
  zoom: number;
  setZoom: (val: number) => void;
  palette: canvasPalette;
  setPalette: (vals: canvasPalette) => void;
  setPaletteItem: (item: number, val: string) => void;
  paletteSize: number;
  setPaletteSize: (val: number) => void;
  pixels: canvasPixels;
  setPixel: (x: number, y: number, val: number) => void;
  setPixels: (vals: canvasPixels) => void;
  setFromCanvasState: (canvas: CanvasState) => void;
  updateFromCanvasState: (canvasUpdates: CanvasState) => void;
}

export interface CanvasStore extends CanvasCoreStore {
  getPaletteItemColor: (item: number) => string;
  getPaletteItemColors: () => string[];
  getPaletteItemColorsStr: () => string;
  getPixelVal: (x: number, y: number) => number;
  getPixelColor: (x: number, y: number) => string;
  getCurrentState: () => CanvasState;
  setState: (s: CanvasState) => void;
  updateState: (s: CanvasState) => void;
  clear: () => void;
}

export interface CanvasHistory {
  getCanvasHistory: () => CanvasState[];
  addCanvasStateToHistory: (state: CanvasState) => void;
  resetCanvasHistory: (state: CanvasState) => void;
  canUndo: () => boolean;
  undoLastCanvasUpdate: () => CanvasState;
}
