import { CanvasSkin } from "./CanvasSkin";
import {
  CanvasStore,
  paletteItemCollection,
  paletteKey,
} from "./xqcanvas/CanvasInterfaces";
import { CanvasPaletteControls } from "/.usePaletteControls";

export const BasicPalette = (props: { canvas: CanvasStore; controls: CanvasPaletteControls }) => {
  const canvas = props.canvas;
  const controls = props.controls;

  const didClickAddPaletteItem = () => {
    canvas.setPaletteSize(canvas.paletteSize + 1);
    controls.setCurrentItem(canvas.paletteSize);
  };

  const didClickRemovePaletteItem = () => {
    if (canvas.paletteSize > 2) {
      canvas.setPaletteSize(canvas.paletteSize - 1);
      if (canvas.currPaletteItem >= canvas.paletteSize - 1) {
        controls.setCurrentItem(canvas.paletteSize - 2);
      }
    }
  };

  const PaletteItems = [];
  for (let pi = 0; pi < canvas.paletteSize; pi++) {
    const itemKey = paletteKey(pi);
    const itemColor = canvas.getPaletteItemColor(pi);
    const borderText =
    controls.currentItem == pi ? "border-indigo-300" : "border-slate-800";
    const itemClasses = `relative mx-1 sm:mx-4 my-2 p-1 sm:p-4 border-8 ${borderText}`;
    const label = pi > 0 ? `Color ${pi}` : `Background`;
    PaletteItems.push(
      <div
        key={itemKey}
        className={itemClasses}
        style={{ backgroundColor: itemColor }}
        onClick={(event) => controls.setCurrentItem(pi)}
      >
        <input
          className="p-2 w-24"
          style={{ backgroundColor: itemColor }}
          type="text"
          value={itemColor}
          onChange={(event) => canvas.setPaletteItem(pi, event.target.value)}
        />
        <div className="absolute -bottom-10 w-24">
          <h3 className="text-slate-500 text-center">{label}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 flex justify-left flex-wrap">
      {PaletteItems}
      <div className="mx-2 p-0 flex flex-col justify-center">
        <button
          onClick={(event) => didClickAddPaletteItem()}
          className="pt-1 px-1"
        >
          <CanvasSkin item="add-palette-item"></CanvasSkin>
        </button>

        <button
          onClick={(event) => didClickRemovePaletteItem()}
          className="pt-4 px-1"
        >
          <CanvasSkin item="remove-palette-item"></CanvasSkin>
        </button>
      </div>
    </div>
  );
};
