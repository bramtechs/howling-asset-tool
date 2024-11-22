import { basename, dirname } from "path";

export class Asset {
    filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    get dirname(): string {
        return dirname(this.filePath);
    }

    get filename(): string {
        return basename(this.filePath);
    }

    static create(filePath: string): Asset {
        return new Asset(filePath);
    }
}
