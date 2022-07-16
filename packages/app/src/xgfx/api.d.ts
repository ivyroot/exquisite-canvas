import { PixelBuffer } from './ll_api';
declare type rgba = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare type PixelColor = string;
export declare type Point = {
    x: number;
    y: number;
};
export declare type Pixel = {
    x: number;
    y: number;
    color: PixelColor;
};
export declare type PixelMap = Map<Point, PixelColor>;
export declare type Pixel2DArr = PixelColor[][];
export declare function isRGBA(x: any): x is rgba;
export declare function isString(x: any): x is string;
export declare const getSVG: (data: string) => string;
export declare const getRects: (data: string) => string;
export declare const getSVGPixelBuffer: (buffer: PixelBuffer) => string;
export declare const getSVGRectsPixelBuffer: (buffer: PixelBuffer) => string;
export declare const getSVGPixels: (pixels: Pixel[]) => string;
export declare const getSVGRects: (pixels: Pixel[]) => string;
export declare const getBinarySVG_Array: (pixels: Pixel[]) => Error | PixelBuffer | undefined;
export declare const getBinarySVG_2DArr: (pixels: Pixel2DArr) => Error | PixelBuffer | undefined;
export {};
