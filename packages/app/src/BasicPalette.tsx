import { CanvasSkin } from "./CanvasSkin";
import { PaletteStore } from "./usePaletteStore";
import { CanvasStore, paletteKey } from "./xqcanvas/CanvasInterfaces";

export const BasicPalette = (props: {
  canvas: CanvasStore;
  palette: PaletteStore;
}) => {
  const canvas = props.canvas;

  const didClickAddPaletteItem = () => {
    canvas.setPaletteSize(canvas.paletteSize + 1);
    props.palette.setCurrentItem(canvas.paletteSize);
  };

  const didClickRemovePaletteItem = () => {
    if (canvas.paletteSize > 2) {
      canvas.setPaletteSize(canvas.paletteSize - 1);
      if (props.palette.currentItem >= canvas.paletteSize - 1) {
        props.palette.setCurrentItem(canvas.paletteSize - 2);
      }
    }
  };

  const PaletteItems = [];
  for (let pi = 0; pi < canvas.paletteSize; pi++) {
    const itemKey = paletteKey(pi);
    const itemColor = canvas.getPaletteItemColor(pi);
    const borderText =
      props.palette.currentItem == pi
        ? "border-indigo-300"
        : "border-slate-800";
    const itemClasses = `relative w-24 h-24 mx-1 sm:mx-4 mt-2 mb-8 p-1 sm:p-4 border-8 ${borderText}`;
    const label = pi > 0 ? `Color ${pi}` : `BG Color`;
    PaletteItems.push(
      <div
        key={itemKey}
        className={itemClasses}
        style={{ backgroundColor: itemColor }}
        onClick={(event) => props.palette.setCurrentItem(pi)}
      >
        <div className="absolute -bottom-10 left-2 w-24">
          <h3 className="text-slate-500 text-left">{label}</h3>
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
