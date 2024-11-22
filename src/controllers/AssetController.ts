import { Asset } from "src/types/Asset";
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

    openDirectoryInExplorer(): void {
        const dir = this.asset.dirname;
        console.log(`Opening directory ${dir} in explorer`);
        openExplorer(dir).catch((error) => {
            console.error(error);
        });
    }
}
