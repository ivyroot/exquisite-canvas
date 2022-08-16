import { useEffect, useRef, useState } from "react";

import {
  CanvasStore,
  ExquisiteCanvas,
  paletteItemCollection,
  paletteKey,
  pixelArray,
  pixelCanvas,
  pixelKey,
  pixelKeyVals,
} from "./canvasInterfaces";

export const useXqstDisplay = (
  c: CanvasStore,
  didClickPixel: (x: number, y: number) => void
) => {
  const width = c.width;
  const height = c.height;
  const zoom = c.zoom;
  const currPaletteItem = c.currPaletteItem;
  const svgCanvasRef = useRef<SVGSVGElement | null>(null);
  const lastPixelDownRef = useRef<boolean | null>(null);

  const pixelRects = [];
  for (let rowY = 0; rowY < height; rowY++) {
    for (let rowX = 0; rowX < width; rowX++) {
      const pxColor = c.getPixelColor(rowX, rowY);
      pixelRects.push(
        <rect
          key={pixelKey(rowX, rowY)}
          id={pixelKey(rowX, rowY)}
          data-is-pixel="true"
          width="1.1"
          height="1.1"
          x={rowX}
          y={rowY}
          fill={pxColor}
        />
      );
    }
  }

  const canvasSvg = (
    <div className="flex justify-center">
      <svg
        ref={svgCanvasRef}
        width={`${width * (zoom / 100.0)}em`}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {pixelRects}
      </svg>
    </div>
  );

  useEffect(() => {
    const svg: SVGSVGElement | null = svgCanvasRef.current;
    if (!svg) return;

    const getRectUnderCursor = (event: PointerEvent) => {
      const element = document.elementFromPoint(event.clientX, event.clientY);
      if (!(element instanceof SVGRectElement)) return;
      if (!element.getAttribute("data-is-pixel")) return;
      const [x, y] = pixelKeyVals(element.id);
      return {
        element,
        x: parseInt(x),
        y: parseInt(y),
      };
    };

    const onClickPixel = (x: number, y: number) => {
      lastPixelDownRef.current = true;
      didClickPixel(x, y);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (lastPixelDownRef.current == null) return;
      const rect = getRectUnderCursor(event);
      if (!rect) return;
      event.preventDefault();
      onClickPixel(rect.x, rect.y);
    };

    const onPointerDown = (event: PointerEvent) => {
      const rect = getRectUnderCursor(event);
      if (!rect) return;
      onClickPixel(rect.x, rect.y);
    };
    const onPointerUp = () => {
      lastPixelDownRef.current = null;
    };
    const onTouchMove = (event: Event) => {
      if (lastPixelDownRef.current == null) return;
      // on touchscreens, allow painting on canvas by preventing
      // touch movements on canvas from scrolling page
      event.preventDefault();
    };

    svg.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    svg.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      svg.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      svg.removeEventListener("touchmove", onTouchMove);
    };
  }, [width, height, currPaletteItem]);

  return <div>{canvasSvg}</div>;
};
