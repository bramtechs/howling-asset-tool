import { Asset, NinePatchSides } from "types/Asset";
import openExplorer from "open-explorer-cross-platform";

export class AssetController {
    private readonly asset: Asset;

    constructor(asset: Asset) {
        this.asset = asset;
    }

    get filePath(): string {
        return this.asset.filePath;
    }

    get filename(): string {
        return this.asset.filename;
    }

    getNinePatchSides(): NinePatchSides {
        return { ...this.asset.ninePatch };
    }

    setNinePatchSides(sides: NinePatchSides): void {
        this.asset.setNinePatchSides(sides);
    }

    openDirectoryInExplorer(): void {
        const dir = this.asset.dirname;
        console.log(`Opening directory ${dir} in explorer`);
        openExplorer(dir).catch((error) => {
            console.error(error);
        });
    }
}
