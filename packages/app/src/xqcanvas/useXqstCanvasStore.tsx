import React, { useEffect, useRef, useState } from "react";
import create from "zustand";

import {
  CanvasStore,
  paletteItemCollection,
  paletteKey,
  pixelArray,
  pixelCanvas,
  pixelKey,
  pixelKeyVals,
} from "./canvasInterfaces";
import { useXqstDisplay } from "./useXqstDisplay";

const colorCodeElements = Array.from({ length: 6 }, (_, i) =>
  String.fromCharCode("A".charCodeAt(0) + i)
);

const DefaultPalette: paletteItemCollection = {
  pal_0: "#2FFAFF",
  pal_1: "#0EA5E9",
};
const EmptyPixels: pixelCanvas = {};

const useCanvasStore = create((set) => ({
  width: 8,
  setWidth: (val: number) => set((state) => ({ width: val })),
  height: 8,
  setHeight: (val: number) => set((state) => ({ height: val })),
  zoom: 200,
  setZoom: (val: number) => set((state) => ({ zoom: val })),
  palette: DefaultPalette,
  paletteSize: 2,
  setPaletteSize: (val: number) => set((state) => ({ paletteSize: val })),
  setPalette: (vals: paletteItemCollection) =>
    set((state) => ({ palette: vals })),
  setPaletteItem: (item: number, val: string) =>
    set((state) => {
      const itemKey = paletteKey(item);
      const fmtVal = (Array.from(val)[0] == "#" ? val : `#${val}`).slice(0, 7);
      const ChangeSet: paletteItemCollection = {};
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
  setPixels: (vals: pixelCanvas) =>
    set((state) => ({ pixels: { ...state.pixels, vals } })),
}));

export function useXqstCanvasStore(): CanvasStore {
  const store = useCanvasStore((state) => {
    const getPaletteItem = (item: number) => {
      return state.palette[paletteKey(item)];
    };
    const getPaletteItems = () => {
      return Array.from({ length: state.paletteSize }, (v, i) => {
        return getPaletteItem(i);
      });
    };
    const getPixelVal = (x: number, y: number) => {
      return state.pixels[pixelKey(x, y)];
    };
    const getPixelColor = (x: number, y: number) => {
      const pixelItem = getPixelVal(x, y);
      const color = state.palette[paletteKey(pixelItem)];
      return color ? color : state.palette[paletteKey(0)];
    };
    return {
      ...state,
      getPaletteItem,
      getPaletteItems,
      getPixelVal,
      getPixelColor,
    };
  });

  return store;
}
