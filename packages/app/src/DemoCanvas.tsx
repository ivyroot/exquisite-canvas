import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import create from "zustand";

import { BasicPalette } from "./BasicPalette";
import { Button } from "./Button";
import { CanvasLogo } from "./CanvasLogo";
import { CanvasSkin } from "./CanvasSkin";
import { LoadFile } from "./loadFile";
import { MoveImage } from "./MoveImage";
import { SaveFile } from "./saveFile";
import { Pixel, PixelColor, PixelMap } from "./xgfx/api";
import {
  CanvasStore,
  paletteItemCollection,
  paletteKey,
  pixelArray,
  pixelCanvas,
  pixelKey,
  pixelKeyVals,
} from "./xqcanvas/CanvasInterfaces";
import { useXqstCanvasStore } from "./xqcanvas/useXqstCanvasStore";
import { XqstCanvasDisplay } from "./xqcanvas/XqstCanvasDisplay";

export const DemoCanvas = () => {
  // core canvas state
  const XqstStore = useXqstCanvasStore();

  const didClickPixel = (x: number, y: number) => {
    if (!XqstStore.dropperActive) {
      XqstStore.setPixel(x, y, XqstStore.currPaletteItem);
    } else {
      // set current palette item based on pixel clicked
      const newPalettePos = XqstStore.getPixelVal(x, y);
      if (XqstStore.currPaletteItem != newPalettePos) {
        XqstStore.setCurrPaletteItem(newPalettePos);
      }
      XqstStore.setDropperActive(false);
      XqstStore.setPixel(x, y, newPalettePos);
    }
  };

  const didClickDropper = (e: any) => {
    XqstStore.setDropperActive(true);
  };

  const currPaletteItemColor = () => {
    return XqstStore.getPaletteItemColor(XqstStore.currPaletteItem);
  };

  const setCurrPaletteItemColor = (color: string) => {
    XqstStore.setPaletteItem(XqstStore.currPaletteItem, color);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-800 pb-12">
      <div id="headerNav" className="flex flex-wrap justify-left">
        <div className="ml-6 my-2 w-20 sm:w-28">
          <CanvasLogo></CanvasLogo>
        </div>
        <LoadFile canvas={XqstStore}></LoadFile>
        <SaveFile canvas={XqstStore} format="binary"></SaveFile>
        <SaveFile canvas={XqstStore} format="hex"></SaveFile>
        <SaveFile canvas={XqstStore} format="svg"></SaveFile>
        <div className="flex flex-column items-center my-2 ml-4 sm:ml-12">
          <div className="bg-slate-600 py-2 px-2 sm:px-4 h-10">
            <input
              type="range"
              min="10"
              max="400"
              value={XqstStore.zoom}
              onChange={(event) => {
                if (event.target) {
                  XqstStore.setZoom(parseInt(event.target.value));
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex flex-wrap justify-center">
          <fieldset className="bg-white mt-2 mx-2 p-1">
            <label className="mx-2 h-8">Width:</label>
            <input
              className="w-16 px-2 h-8"
              type="number"
              name="WIDTH"
              value={XqstStore.width}
              onChange={(event) => {
                if (event.target) {
                  XqstStore.setWidth(parseInt(event.target.value));
                }
              }}
            />
          </fieldset>
          <fieldset className="bg-white mt-2 mx-2 p-1">
            <label className="mx-2 h-8">Height:</label>
            <input
              className="w-16 px-2 h-8"
              type="number"
              name="HEIGHT"
              value={XqstStore.height}
              onChange={(event) => {
                if (event.target) {
                  XqstStore.setHeight(parseInt(event.target.value));
                }
              }}
            />
          </fieldset>
          <div className="bg-white mt-2 mx-2">
            <button
              onClick={(event) => didClickDropper(event)}
              className="pt-1 px-1"
            >
              <CanvasSkin
                item={XqstStore.dropperActive ? "dropper-active" : "dropper"}
              ></CanvasSkin>
            </button>
          </div>
          <div className="bg-white mt-2 mx-2">
            <MoveImage canvas={XqstStore} direction="up"></MoveImage>
          </div>
          <div className="bg-white mt-2 mx-2">
            <MoveImage canvas={XqstStore} direction="down"></MoveImage>
          </div>
          <div className="bg-white mt-2 mx-2">
            <MoveImage canvas={XqstStore} direction="left"></MoveImage>
          </div>
          <div className="bg-white mt-2 mx-2">
            <MoveImage canvas={XqstStore} direction="right"></MoveImage>
          </div>
        </div>

        <div className="mt-6">
          <XqstCanvasDisplay
            canvas={XqstStore}
            didClickPixel={didClickPixel}
          ></XqstCanvasDisplay>
        </div>

        <BasicPalette canvas={XqstStore}></BasicPalette>

        <div className="my-6 mx-24">
          <HexColorPicker
            color={currPaletteItemColor()}
            onChange={setCurrPaletteItemColor}
          />
        </div>
      </div>
    </div>
  );
};
