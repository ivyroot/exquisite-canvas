
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

type SetNumberFunction = (val: number) => void;
type SetStringFunction = (val: string) => void;
type getStringsFunction = () => string[];

const pixelKey = (x: number, y: number) => {
    return `px_${x}X${y}`;
};

const pixelKeyVals = (pxKey: string) => {
    if (!pxKey || pxKey.slice(0, 3) != "px_") return [];
    return pxKey.replace("px_", "").split("X");
};

const paletteKey = (i: number) => {
    return `pal_${i}`;
};
  

interface ExquisiteCanvas {
    width: number;
    bboy: number;
    setWidth: SetNumberFunction;
    height: number;
    setHeight: SetNumberFunction;
    zoom: number;
    setZoom: SetNumberFunction;
    palette: paletteItemCollection;
    setPalette: (palette: paletteItemCollection) => void;
    setPaletteItem: (item: number, val: string) => void;
    getPaletteItems: () => string[];
    paletteSize: number;
    setPaletteSize: SetNumberFunction;
    paletteArray: paletteArray;
    pixels: pixelCanvas;
    dog: (val: any) => void;
    cat: (val: number) => void;
    foo: SetStringFunction;
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

    const handleSetPaletteColor = (item: number, val: string) => {
        const itemKey = paletteKey(item);
        const fmtVal = (Array.from(val)[0] == "#" ? val : `#${val}`).slice(0, 7);
        const ChangeSet: paletteItemCollection = {};
        ChangeSet[itemKey] = fmtVal;
        setPalette({ ...palette, ...ChangeSet });
    };

    const didSetPixel = (x: number, y: number, palettePos: number) => {
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
        setPalette: setPalette,
        setPaletteItem: handleSetPaletteColor,
        paletteSize: paletteSize,
        setPaletteSize: didSetPixel,
        pixels: pixels,
    };

    return(canvas);
}