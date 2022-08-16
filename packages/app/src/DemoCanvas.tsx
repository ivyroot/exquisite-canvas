import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import create from "zustand";

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
import { useXqstCanvasDisplay } from "./xqcanvas/useXqstCanvasDisplay";
import { useXqstCanvasStore } from "./xqcanvas/useXqstCanvasStore";

export const DemoCanvas = () => {
  // core canvas state
  const XqstStore = useXqstCanvasStore();

  const currPaletteItemColor = () => {
    const currItem = XqstStore.currPaletteItem;
    const itemColor = XqstStore.getPaletteItem(currItem);
    return itemColor;
  };

  const handleSetCurrPaletteItem = (newPaletteItem: number) => {
    XqstStore.setCurrPaletteItem(newPaletteItem);
  };

  const didClickPixel = (x: number, y: number) => {
    if (!XqstStore.dropperActive) {
      XqstStore.setPixel(x, y, XqstStore.currPaletteItem);
    } else {
      // set current palette item based on pixel clicked
      const newPalettePos = XqstStore.getPixelVal(x, y);
      if (XqstStore.currPaletteItem != newPalettePos) {
        handleSetCurrPaletteItem(newPalettePos);
      }
      XqstStore.setDropperActive(false);
      XqstStore.setPixel(x, y, newPalettePos);
    }
  };

  const PaletteItems = [];
  for (let pi = 0; pi < XqstStore.paletteSize; pi++) {
    const itemKey = paletteKey(pi);
    const itemColor = XqstStore.getPaletteItem(pi);
    const borderText =
      XqstStore.currPaletteItem == pi
        ? "border-indigo-300"
        : "border-slate-800";
    const itemClasses = `relative mx-1 sm:mx-4 my-6 p-1 sm:p-4 border-8 ${borderText}`;
    const labelText = pi > 0 ? `Color ${pi}` : `Background`;
    const label = (
      <div className="absolute -bottom-10 w-24">
        <h3 className="text-slate-500 text-center">{labelText}</h3>
      </div>
    );
    PaletteItems.push(
      <div
        key={itemKey}
        className={itemClasses}
        style={{ backgroundColor: itemColor }}
        onClick={(event) => handleSetCurrPaletteItem(pi)}
      >
        <input
          className="p-2 w-24"
          style={{ backgroundColor: itemColor }}
          type="text"
          name="BACKGROUND_COLOR"
          value={itemColor}
          onChange={(event) =>
            handleSetPaletteColor(itemKey, event.target.value)
          }
        />
        {label}
      </div>
    );
  }

  const didClickAddPaletteItem = (e: any) => {
    e.preventDefault();
    XqstStore.setPaletteSize(XqstStore.paletteSize + 1);
  };

  const didClickRemovePaletteItem = (e: any) => {
    e.preventDefault();
    if (paletteSize > 2) {
      XqstStore.setPaletteSize(XqstStore.paletteSize - 1);
    }
  };

  const didClickDropper = (e: any) => {
    XqstStore.setDropperActive(true);
  };

  const setCurrPaletteItemColor = (color: string) => {
    XqstStore.setPaletteItem(XqstStore.currPaletteItem, color);
  };

  const xqstDisplay = useXqstCanvasDisplay(XqstStore, didClickPixel);

  const PaletteChooser = (
    <div className="my-12 flex justify-left flex-wrap">
      {PaletteItems}
      <div className="mx-2 p-0 flex flex-col justify-center">
        <button
          onClick={(event) => didClickAddPaletteItem(event)}
          className="pt-1 px-1"
        >
          <CanvasSkin item="add-palette-item"></CanvasSkin>
        </button>

        <button
          onClick={(event) => didClickRemovePaletteItem(event)}
          className="pt-4 px-1"
        >
          <CanvasSkin item="remove-palette-item"></CanvasSkin>
        </button>
      </div>
    </div>
  );

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
        <div className="mt-6">{xqstDisplay}</div>
        {PaletteChooser}
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
