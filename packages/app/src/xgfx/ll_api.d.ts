/// <reference types="node" />
import { Pixel, PixelColor, PixelMap } from './api';
export declare type ExquisiteBitmapHeader = {
    version: number;
    width: number;
    height: number;
    numColors: number;
    scaleFactor: number;
    alpha: boolean;
    backgroundIncluded: boolean;
    backgroundIndex: number;
};
declare type PixelDataInfo = {
    ppb: number;
    bpp: number;
    mask: number;
};
export declare class PixelBuffer {
    header: ExquisiteBitmapHeader;
    palette: PixelColor[];
    pixelInfo: PixelDataInfo;
    headerBuffer: Buffer;
    paletteBuffer: Buffer;
    dataBuffer: Buffer;
    constructor(header?: ExquisiteBitmapHeader, palette?: PixelColor[]);
    from(data: string): void;
    _initData(): void;
    _setHeader(): void;
    _setPalette(): void;
    setPixel(x: number, y: number, color: number): void;
    getPixel(x: number, y: number): number;
    getPixelColor(x: number, y: number): PixelColor;
    getPixelBuffer(): string;
    getHeader(): string;
    getPalette(): string;
    getData(): string;
    toPixels(): Pixel[];
    toPixel2DArr(): PixelColor[][];
    toPixelMap(): PixelMap;
}
export {};
