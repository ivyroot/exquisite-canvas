"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSVG = exports.renderSVGPixels = void 0;
const ll_api_1 = require("./ll_api");
// This file is for constructing SVG's in JS from the binary format.
const renderSVGPixels = (pixels) => { };
exports.renderSVGPixels = renderSVGPixels;
const renderSVG = (data) => {
    const buffer = new ll_api_1.PixelBuffer();
    buffer.from(data);
    const pixels = buffer.toPixel2DArr();
    for (let y = 0; y < pixels.length; y++) {
        for (let x = 0; x < pixels[y].length; x++) {
            const pixel = pixels[y][x];
        }
    }
};
exports.renderSVG = renderSVG;
