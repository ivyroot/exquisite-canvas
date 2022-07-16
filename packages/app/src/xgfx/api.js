"use strict";
// TODO figure out how this thing should be organized
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBinarySVG_2DArr = exports.getBinarySVG_Array = exports.getSVGRects = exports.getSVGPixels = exports.getSVGRectsPixelBuffer = exports.getSVGPixelBuffer = exports.getRects = exports.getSVG = exports.isString = exports.isRGBA = void 0;
const ll_api_1 = require("./ll_api");
function isRGBA(x) {
    return typeof x === 'object';
}
exports.isRGBA = isRGBA;
function isString(x) {
    return typeof x === 'string';
}
exports.isString = isString;
// Functions to reconstruct SVG from binary pixel format
const getSVG = (data) => {
    const buffer = new ll_api_1.PixelBuffer();
    buffer.from(data);
    return (0, exports.getSVGPixelBuffer)(buffer);
};
exports.getSVG = getSVG;
const getRects = (data) => {
    const buffer = new ll_api_1.PixelBuffer();
    buffer.from(data);
    return (0, exports.getSVGRectsPixelBuffer)(buffer);
};
exports.getRects = getRects;
// TODO this should definitely be in the LLAPI
const getSVGPixelBuffer = (buffer) => {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" version="1.1" viewBox="0 0 ${buffer.header.width * 16} ${buffer.header.height * 16}" height="${buffer.header.height * 16}" width="${buffer.header.width * 16}"><g transform="scale(16 16)">`;
    buffer.toPixels().map((pixel) => {
        svg += `<rect fill="#${pixel.color}" x="${pixel.x}" y="${pixel.y}" height="1" width="1"/>`;
    });
    svg += '</g></svg>';
    return svg;
};
exports.getSVGPixelBuffer = getSVGPixelBuffer;
const getSVGRectsPixelBuffer = (buffer) => {
    return buffer
        .toPixels()
        .map((pixel) => `<rect fill="#${pixel.color}" x="${pixel.x}" y="${pixel.y}" height="1" width="1"/>`)
        .join('');
};
exports.getSVGRectsPixelBuffer = getSVGRectsPixelBuffer;
const getSVGPixels = (pixels) => {
    const buffer = (0, exports.getBinarySVG_Array)(pixels);
    return (0, exports.getSVGPixelBuffer)(buffer);
};
exports.getSVGPixels = getSVGPixels;
const getSVGRects = (pixels) => {
    const buffer = (0, exports.getBinarySVG_Array)(pixels);
    return (0, exports.getSVGRectsPixelBuffer)(buffer);
};
exports.getSVGRects = getSVGRects;
// const getPixels
// in the same format you are using in your struct for js rendering
// from an svg as well?
// Functions for most builders, working with simple pixel formats
/* Function that takes an array of pixel objects and returns the binary format for the renderer */
const getBinarySVG_Array = (pixels) => {
    let width = null;
    let height = null;
    let pixelNums = [];
    let numColors = 0;
    let palette = new Map();
    // determine dimensions
    // determine palette
    // get count of palette
    pixels.map((pixel) => {
        if (width == null)
            width = pixel.x;
        if (height == null)
            height = pixel.y;
        if (pixel.x > width)
            width = pixel.x;
        if (pixel.y > height)
            height = pixel.y;
        const pixelColor = pixel.color;
        const paletteColor = palette.get(pixelColor); // TODO need to get pixel.color as rgba or string
        if (paletteColor == undefined) {
            palette.set(pixelColor, {
                color: pixelColor,
                index: numColors,
                count: 1
            });
            numColors++;
        }
        else {
            palette.set(pixelColor, {
                color: pixelColor,
                index: paletteColor.index,
                count: paletteColor.count + 1
            });
        }
    });
    if (width == null || height == null)
        return;
    width = width + 1;
    height = height + 1;
    pixels.map((pixel) => {
        pixelNums.push(pixel.x + pixel.y * width);
    });
    // validate if contigious
    pixelNums = pixelNums.sort((a, b) => a - b);
    for (let i = 0; i < pixelNums.length - 1; i++) {
        if (i == 0 && pixelNums[i] != 0)
            return Error('The smallest pixel is not 0');
        if (pixelNums[i + 1] != pixelNums[i] + 1)
            return Error('Pixels are not contigous.');
    }
    // add pixelnum to array, require 0->max size
    // determine best background color
    let paletteArr = [];
    let bestColor = {
        color: '',
        index: -1,
        count: -1
    };
    palette.forEach((value) => {
        if (value.count > bestColor.count)
            bestColor = value;
        paletteArr[value.index] = value.color;
    });
    let alpha = false;
    if (paletteArr.length > 1) {
        const firstColorLen = paletteArr[0].replace('#', '').length;
        if (firstColorLen == 4 || firstColorLen == 8) {
            alpha = true;
        }
    }
    const header = {
        version: 1,
        width: width,
        height: height,
        numColors: palette.size,
        scaleFactor: 0,
        alpha,
        backgroundIncluded: true,
        backgroundIndex: bestColor.index
    };
    // initialize buffer
    const buffer = new ll_api_1.PixelBuffer(header, paletteArr);
    pixels.map((pixel) => {
        const color = palette.get(pixel.color);
        if (color == undefined)
            return Error();
        const colorIndex = color.index;
        buffer.setPixel(pixel.x, pixel.y, colorIndex);
    });
    return buffer;
};
exports.getBinarySVG_Array = getBinarySVG_Array;
/* Function that takes a map from {x, y} -> color and returns the binary format for the renderer */
const getBinarySVG_Map = (pixels) => { };
/* Function that takes a 2d array of pixels. Something like where the outer array represents y
   and the inner array represents x and returns the binary format for the renderer */
const getBinarySVG_2DArr = (pixels) => {
    let pixelArr = [];
    for (let row = 0; row < pixels.length; row++) {
        for (let col = 0; col < pixels[row].length; col++) {
            pixelArr.push({ x: col, y: row, color: pixels[row][col] });
        }
    }
    return (0, exports.getBinarySVG_Array)(pixelArr);
};
exports.getBinarySVG_2DArr = getBinarySVG_2DArr;
// TODO add support for the ndarray concept that scott pointed out
