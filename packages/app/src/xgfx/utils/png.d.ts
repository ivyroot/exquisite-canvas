export declare const pngToPixels: (img: string) => Promise<{
    x: number;
    y: number;
    color: string;
}[]>;
export declare const pngToData: (img: string) => Promise<string | undefined>;
