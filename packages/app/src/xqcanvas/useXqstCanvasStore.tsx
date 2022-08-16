import React, { useEffect, useRef, useState } from "react";
import { ExquisiteCanvas, CanvasStore, paletteItemCollection, pixelCanvas, pixelArray, pixelKey, pixelKeyVals, paletteKey } from "./canvasInterfaces";
import { useXqstDisplay } from './useXqstDisplay';
import create from 'zustand';

const colorCodeElements = Array.from({ length: 6 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
);

type CanvasState = {
    width: number;
    height: number;
    zoom: number;
    palette: paletteItemCollection;
    paletteSize: number;
    pixels : pixelCanvas;
};

const DefaultPalette: paletteItemCollection = {
    pal_0: "#2FFAFF",
    pal_1: "#0EA5E9",
};
const EmptyPixels : pixelCanvas = {};


const useCanvasStore = create((set) => ({
    width: 8,
    setWidth: (val: number) => set((state) => ({ width: val })),
    height: 8,
    setHeight: (val: number) => set((state) => ({ height: val })),
    zoom: 200,
    setZoom: (val: number) => set((state) => ({ zoom: val })),
    palette: DefaultPalette,
    paletteSize: 2,
    pixels: EmptyPixels,
    setPixel: (x: number, y: number, palettePos: number) => set( state => 
        { 
            const keyName = pixelKey(x, y);
            const wrappedPos = palettePos >= state.paletteSize ? state.paletteSize - 1 : palettePos;
            const ChangeSet: pixelCanvas = {};
            ChangeSet[keyName] = wrappedPos;
            const newPixels = { ...state.pixels, ...ChangeSet };
            return {pixels: newPixels};
        }),
    setPixels: (vals: pixelCanvas) => set( state => ({pixels: {...state.pixels, vals}}) )
}));


export function useXqstCanvasStore(): CanvasStore {
    const store = useCanvasStore(state => {
        const getPixelColor = (x: number, y: number) => {
            const pixelItem = state.pixels[pixelKey(x, y)];
            const color = state.palette[paletteKey(pixelItem)];
            return color ? color : state.palette[paletteKey(0)]; 
        };
        return {...state, getPixelColor};
    })
    
    return store; 
}