"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataHexString = void 0;
const b16StringLUT = new Map([
    ['0', '30'],
    ['1', '31'],
    ['2', '32'],
    ['3', '33'],
    ['4', '34'],
    ['5', '35'],
    ['6', '36'],
    ['7', '37'],
    ['8', '38'],
    ['9', '39'],
    ['a', '61'],
    ['b', '62'],
    ['c', '63'],
    ['d', '64'],
    ['e', '65'],
    ['f', '66']
]);
function getDataHexString(color) {
    let s = '';
    color = color.replace('#', '');
    if (color.length == 6) {
        for (let i = 0; i < color.length; i++) {
            s += b16StringLUT.get(color[i]);
        }
        s += '6666';
    }
    else if (color.length == 3) {
        for (let i = 0; i < color.length; i++) {
            s += b16StringLUT.get(color[i]);
            s += b16StringLUT.get(color[i]);
        }
        s += '6666';
    }
    else if (color.length == 4) {
        for (let i = 0; i < color.length; i++) {
            s += b16StringLUT.get(color[i]);
            s += b16StringLUT.get(color[i]);
        }
    }
    else if (color.length == 8) {
        for (let i = 0; i < color.length; i++) {
            s += b16StringLUT.get(color[i]);
        }
    }
    else {
        throw new Error('invalid color length');
    }
    return s;
}
exports.getDataHexString = getDataHexString;
