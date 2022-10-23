// Demo of importing various canvas components as UI elements
// Note that some canvas components have their own state:
//  BasicPalette uses a separate state handler, usePaletteStore
//  EyeDropper defines a state handler, useEyeDropperStore, directly in the component
import { BasicColorPicker } from "./BasicColorPicker";
import { BasicPalette } from "./BasicPalette";
import { CanvasLogo } from "./CanvasLogo";
import { EyeDropper, useEyeDropperStore } from "./EyeDropper";
import { LoadFile } from "./LoadFile";
import { MoveImage } from "./MoveImage";
import { SaveFile } from "./SaveFile";
import { UndoButton } from "./UndoButton";
import { usePaletteStore } from "./usePaletteStore";
import { CanvasState } from "./xqcanvas/CanvasInterfaces";
import { useCanvasHistory } from "./xqcanvas/useCanvasHistory";
import { useXqstCanvasStore } from "./xqcanvas/useXqstCanvasStore";
import { XqstCanvasDisplay } from "./xqcanvas/XqstCanvasDisplay";

export const DemoCanvas = () => {
  const name = `exquisite-canvas:square-8X8`;
  const BlankCanvas: CanvasState = {
    width: 8,
    height: 8,
    zoom: 200,
    // paletteSize: 2, // TODO fixme
    palette: {
      pal_0: "#2FFAFF",
      pal_1: "#0EA5E9",
    },
    pixels: {},
  };
  const DemoCanvasHistory = useCanvasHistory({
    canvasName: name,
    blankState: BlankCanvas,
  });
  const DemoCanvasStore = useXqstCanvasStore(DemoCanvasHistory);
  const DemoPaletteStore = usePaletteStore();
  const DemoDropperStore = useEyeDropperStore();

  const didClickPixel = (x: number, y: number) => {
    if (!DemoDropperStore.active) {
      DemoCanvasStore.setPixel(x, y, DemoPaletteStore.currentItem);
    } else {
      DemoPaletteStore.setCurrentItem(DemoCanvasStore.getPixelVal(x, y));
      DemoDropperStore.setActive(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-800 pb-12">
      <div id="headerNav" className="flex flex-wrap justify-left">
        <div className="ml-6 my-2 w-20 sm:w-28">
          <CanvasLogo></CanvasLogo>
        </div>
        <LoadFile canvas={DemoCanvasStore}></LoadFile>
        <SaveFile canvas={DemoCanvasStore} format="binary"></SaveFile>
        <SaveFile canvas={DemoCanvasStore} format="hex"></SaveFile>
        <SaveFile canvas={DemoCanvasStore} format="svg"></SaveFile>
        <div className="flex flex-column items-center my-2 ml-4 sm:ml-12">
          <div className="bg-slate-600 py-2 px-2 sm:px-4 h-10">
            <input
              type="range"
              min="10"
              max="400"
              value={DemoCanvasStore.zoom}
              onChange={(event) => {
                if (event.target) {
                  DemoCanvasStore.setZoom(parseInt(event.target.value));
                }
              }}
            />
          </div>
        </div>
      </div>

      <div id="toolbarRow" className="mt-8 flex flex-wrap justify-center">
        <fieldset className="bg-white mt-2 mx-2 p-1">
          <label className="mx-2 h-8">Width:</label>
          <input
            className="w-16 px-2 h-8"
            type="number"
            name="WIDTH"
            value={DemoCanvasStore.width}
            onChange={(event) => {
              if (event.target) {
                DemoCanvasStore.setWidth(parseInt(event.target.value));
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
            value={DemoCanvasStore.height}
            onChange={(event) => {
              if (event.target) {
                DemoCanvasStore.setHeight(parseInt(event.target.value));
              }
            }}
          />
        </fieldset>
        <div className="bg-white mt-2 mx-2">
          <EyeDropper
            canvas={DemoCanvasStore}
            dropperStore={DemoDropperStore}
          ></EyeDropper>
        </div>
        <div className="bg-white mt-2 mx-2">
          <MoveImage canvas={DemoCanvasStore} direction="up"></MoveImage>
        </div>
        <div className="bg-white mt-2 mx-2">
          <MoveImage canvas={DemoCanvasStore} direction="down"></MoveImage>
        </div>
        <div className="bg-white mt-2 mx-2">
          <MoveImage canvas={DemoCanvasStore} direction="left"></MoveImage>
        </div>
        <div className="bg-white mt-2 mx-2">
          <MoveImage canvas={DemoCanvasStore} direction="right"></MoveImage>
        </div>
        <div className="bg-white mt-2 mx-2">
          <UndoButton
            canvas={DemoCanvasStore}
            history={DemoCanvasHistory}
          ></UndoButton>
        </div>
      </div>

      <div className="mt-6">
        <XqstCanvasDisplay
          canvas={DemoCanvasStore}
          didClickPixel={didClickPixel}
        ></XqstCanvasDisplay>
      </div>

      <div className="mt-2">
        <BasicPalette
          canvas={DemoCanvasStore}
          palette={DemoPaletteStore}
        ></BasicPalette>
      </div>

      <div className="my-6 mx-24">
        <BasicColorPicker
          canvas={DemoCanvasStore}
          currentPaletteItem={DemoPaletteStore.currentItem}
        ></BasicColorPicker>
      </div>
    </div>
  );
};
