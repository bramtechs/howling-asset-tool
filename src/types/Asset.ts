import { basename, dirname } from "path";

export type NinePatchSides = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};

export class Asset {
    private readonly _filePath: string;

    private readonly _ninePatch: NinePatchSides = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    };

    constructor(filePath: string) {
        this._filePath = filePath;
    }

    get dirname(): string {
        return dirname(this._filePath);
    }

    get filename(): string {
        return basename(this._filePath);
    }

    get filePath(): string {
        return this._filePath;
    }

    get ninePatch(): NinePatchSides {
        return { ...this._ninePatch };
    }

    setNinePatchSides(sides: NinePatchSides): void {
        Object.assign(this._ninePatch, sides);
    }

    static create(filePath: string): Asset {
        return new Asset(filePath);
    }
}
