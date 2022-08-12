
import React, { useEffect, useRef, useState } from "react";

export interface paletteItemCollection {
    [index: string]: string;
}
  
export interface pixelCanvas {
    [index: string]: number;
}

type SetNumberFunction = (val: number) => void;
type SetStringFunction = (val: string) => void;

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
    paletteSize: number;
    setPaletteSize: SetNumberFunction;
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

    const dog = (val: any) => {
        console.log(`DOG  -- ${val}`);

    };

    const cat = (val: any) => {
        console.log(`MEOW  -- ${val}`);

    };

    const foom = (val: string) => {
        console.log(`FOOM SETTING PIXELS: YAY -- ${val}`);
    };

    const foob = (val: string) => {
        console.log(`FOOB SETTING PIXELS: YAY -- ${val}`);
    };

    const canvas: ExquisiteCanvas = {
        bboy: 12,
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
        foo: foom,
        dog: foom,
        setPalette: setPalette,
        setPaletteSize: didSetPixel,
        pixels: pixels,
        cat: cat,
    };

    return(canvas);
}