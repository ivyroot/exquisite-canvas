import { useEffect, useRef, useState } from "react";

import {
  CanvasStore,
  paletteItemCollection,
  paletteKey,
  pixelArray,
  pixelCanvas,
  pixelKey,
  pixelKeyVals,
} from "./CanvasInterfaces";

export const XqstCanvasDisplay = (props: {
  canvas: CanvasStore;
  didClickPixel: (x: number, y: number) => void;
}) => {
  const canvas = props.canvas;
  const width = canvas.width;
  const height = canvas.height;
  const zoom = canvas.zoom;
  const paletteSize = canvas.paletteSize;
  const paletteString = canvas.getPaletteItemColorsStr();
  const dropperActive = canvas.dropperActive;
  const svgCanvasRef = useRef<SVGSVGElement | null>(null);
  const lastPixelDownRef = useRef<boolean | null>(null);

  const pixelRects = [];
  for (let rowY = 0; rowY < height; rowY++) {
    for (let rowX = 0; rowX < width; rowX++) {
      const pxColor = canvas.getPixelColor(rowX, rowY);
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
        x: x,
        y: y,
      };
    };

    const onClickPixel = (x: number, y: number) => {
      lastPixelDownRef.current = true;
      props.didClickPixel(x, y);
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
  }, [
    width,
    height,
    props.didClickPixel,
    dropperActive,
    paletteSize,
    paletteString,
  ]);

  return (
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
};
