"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pngToData = exports.pngToPixels = void 0;
const api_1 = require("../api");
const pngjs_1 = require("pngjs");
const fs_1 = __importDefault(require("fs"));
const pngToPixels = async (img) => {
    const pixels = [];
    var png = pngjs_1.PNG.sync.read(fs_1.default.readFileSync(img));
    if (png.width > 64 || png.height > 64)
        return pixels;
    let offset = 0;
    for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
            pixels.push({
                x,
                y,
                color: `#${png.data.readUInt32BE(offset).toString(16).padStart(8, '0')}`
            });
            offset += 4;
        }
    }
    return pixels;
};
exports.pngToPixels = pngToPixels;
const pngToData = async (img) => {
    const pixels = await (0, exports.pngToPixels)(img);
    // create PixelBuffer
    let buffer = (0, api_1.getBinarySVG_Array)(pixels);
    if (isError(buffer)) {
        return;
    }
    else {
        // TODO, return err as a separate object in PixelBuffer
        buffer = buffer;
        return `${buffer.getPixelBuffer()}`;
    }
};
exports.pngToData = pngToData;
const isError = function (e) {
    return (e &&
        e.stack &&
        e.message &&
        typeof e.stack === 'string' &&
        typeof e.message === 'string');
};
