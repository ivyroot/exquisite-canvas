
import React, { useEffect, useRef, useState } from "react";
import { ExquisiteCanvas, paletteItemCollection, pixelCanvas, pixelArray, pixelKey, pixelKeyVals, paletteKey } from "./canvasInterfaces";
import { useXqstDisplay } from './useXqstDisplay';

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

    const getPaletteItem = (item: number) => {
        const itemKey = paletteKey(item);
        return(palette[itemKey]);
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

    const getPixelVal = (x: number, y: number) => {
        const keyName = pixelKey(x, y);
        return(pixels[keyName]);
    };

    const getPixelColor = (x: number, y: number) => {
        return getPaletteItem(getPixelVal(x, y));
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

    const didClickPixel = (x: number, y: number) => {
        handleSetPixel(x, y, 1);
    }  

    const  [svgCanvasRef, canvasSvg] = useXqstDisplay(getPixelColor, didClickPixel, width, height, zoom);

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
        getPaletteItem: getPaletteItem,
        paletteSize: paletteSize,
        setPaletteSize: handleSetPaletteSize,
        pixels: pixels,
        setPixel: handleSetPixel,
        setPixels: handleSetPixels,
        getPixelVal: getPixelVal,
        getPixelColor: getPixelColor,
        displayElement: canvasSvg,
    };

    return(canvas);
}