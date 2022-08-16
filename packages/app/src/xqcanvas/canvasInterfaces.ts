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
  

export default interface ExquisiteCanvas {
    version: number;
    width: number;
    setWidth: (val: number) => void;
    height: number;
    setHeight: (val: number) => void;
    zoom: number;
    setZoom: (val: number) => void;
    palette: paletteItemCollection;
    setPalette: (palette: paletteItemCollection) => void;
    setPaletteItem: (item: number, val: string) => void;
    getPaletteItem: (item: number) => string;
    getPaletteItems: () => string[];
    paletteSize: number;
    setPaletteSize: (val: number) => void;
    paletteArray: () => string[];
    pixels: pixelCanvas;
    setPixels: (val: pixelCanvas) => void;
    setPixel: (x: number, y: number, val: number) => void;
    getPixelVal: (x: number, y: number) => number;
    getPixelColor: (x: number, y: number) => string;
    displayElement: HTMLElement;
};

interface CanvasStore {
    width: number;
    setWidth: (val: number) => void;
    height: number;
    setHeight: (val: number) => void;
    zoom: number;
    setZoom: (val: number) => void;
    palette: paletteItemCollection;
    paletteItemsStr: () => string;
    paletteSize: number;
    pixels: pixelCanvas;
    setPixel: (x: number, y: number, val: number) => void;
    setPixels: (val: pixelCanvas) => void;
    getPixelColor: (x: number, y: number) => string;

};