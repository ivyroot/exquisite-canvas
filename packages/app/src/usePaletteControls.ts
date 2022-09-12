import { useState } from 'react';

export interface CanvasPaletteControls {
    currentItem: number;
    setCurrentItem: (val: number) => void;
}

export function usePaletteControls(): CanvasPaletteControls {
    const [currItem, setCurrItem] = useState(1);
    const controls : CanvasPaletteControls = {
        currentItem: currItem,
        setCurrentItem: (var: number) => {
            setCurrItem(var);
        },
    };
    return controls;
}