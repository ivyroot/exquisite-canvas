import { CanvasSkin } from "./CanvasSkin";
import {
  CanvasStore,
  paletteItemCollection,
  paletteKey,
} from "./xqcanvas/CanvasInterfaces";

export const BasicPalette = (props: { canvas: CanvasStore }) => {
  const canvas = props.canvas;

  const didClickAddPaletteItem = () => {
    canvas.setPaletteSize(canvas.paletteSize + 1);
    canvas.setCurrPaletteItem(canvas.paletteSize);
  };

  const didClickRemovePaletteItem = () => {
    if (canvas.paletteSize > 2) {
      canvas.setPaletteSize(canvas.paletteSize - 1);
      if (canvas.currPaletteItem >= canvas.paletteSize - 1) {
        canvas.setCurrPaletteItem(canvas.paletteSize - 2);
      }
    }
  };

  const PaletteItems = [];
  for (let pi = 0; pi < canvas.paletteSize; pi++) {
    const itemKey = paletteKey(pi);
    const itemColor = canvas.getPaletteItemColor(pi);
    const borderText =
      canvas.currPaletteItem == pi ? "border-indigo-300" : "border-slate-800";
    const itemClasses = `relative mx-1 sm:mx-4 my-2 p-1 sm:p-4 border-8 ${borderText}`;
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
        onClick={(event) => canvas.setCurrPaletteItem(pi)}
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
