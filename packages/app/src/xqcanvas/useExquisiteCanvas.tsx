
import React, { useEffect, useRef, useState } from "react";

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
  

interface ExquisiteCanvas {
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
    getPaletteItems: () => string[];
    paletteSize: number;
    setPaletteSize: (val: number) => void;
    paletteArray: () => string[];
    pixels: pixelCanvas;
    setPixels: (val: pixelCanvas) => void;
    setPixel: (x: number, y: number, val: number) => void;
}

export function useExquisiteCanvas(): ExquisiteCanvas {
    const [width, setWidth] = useState(16);
    const [height, setHeight] = useState(16);
    const [zoom, setZoom] = useState(200);
    const defaultPallet: paletteItemCollection = {
      pal_0: "#FFFFFF",
      pal_1: "#0EA5E9",
    };
    const [palette, setPalette] = useState(defaultPallet);
    const [paletteSize, setPaletteSize] = useState(2);
    const emptyPixels: pixelCanvas = {};
    const [pixels, setPixels] = useState(emptyPixels);

    const getPaletteItems = () => {
        return Array.from({ length: paletteSize }, (v, i) => {
            return paletteItemColor(i);
        });
    }

    const handleSetPaletteItem = (item: number, val: string) => {
        const itemKey = paletteKey(item);
        const fmtVal = (Array.from(val)[0] == "#" ? val : `#${val}`).slice(0, 7);
        const ChangeSet: paletteItemCollection = {};
        ChangeSet[itemKey] = fmtVal;
        setPalette({ ...palette, ...ChangeSet });
    };

    const handleSetPaletteSize = (size: number) => {
        const newSize = Math.max(2, size);
        setPaletteSize(newSize);
    };

    const handleSetPixels = (val: pixelCanvas) => {
        console.log(`Setting pixels`);
        // setPixels({ ...pixels, ...ChangeSet });
    };

    const handleSetPixel = (x: number, y: number, palettePos: number) => {
        console.log(`Setting single pixel`);

        const keyName = pixelKey(x, y);
        const wrappedPos = palettePos >= paletteSize ? paletteSize - 1 : palettePos;
        const ChangeSet: pixelCanvas = {};
        ChangeSet[keyName] = wrappedPos;
        setPixels({ ...pixels, ...ChangeSet });
    };

    const colorCodeElements = Array.from({ length: 6 }, (_, i) =>
        String.fromCharCode("A".charCodeAt(0) + i)
    );

    const paletteItemColor = (position: number) => {
        const itemKey = paletteKey(position);
        if (palette.hasOwnProperty(itemKey)) {
        return palette[itemKey];
        }
        const generativeColor = `#${colorCodeElements[position % 6]}${
        colorCodeElements[position % 5]
        }${colorCodeElements[position % 5]}${colorCodeElements[position % 4]}${
        colorCodeElements[position % 5]
        }${colorCodeElements[position % 3]}`;
        return generativeColor;
    };

    const currPaletteItemColor = () => {
        return paletteItemColor(currPaletteItem);
    };

    const canvas: ExquisiteCanvas = {
        version: '1.0',
        width: width,
        setWidth: setWidth,
        height: height,
        setHeight: setHeight,
        zoom: zoom,
        setZoom: setZoom,
        palette: palette,
        getPaletteItems: getPaletteItems,
        setPalette: setPalette,
        setPaletteItem: handleSetPaletteItem,
        paletteSize: paletteSize,
        setPaletteSize: handleSetPaletteSize,
        pixels: pixels,
        setPixel: handleSetPixel,
        setPixels: handleSetPixels,
    };

    return(canvas);
}