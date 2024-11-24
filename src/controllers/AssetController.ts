import { Asset } from "types/Asset";
import openExplorer from "open-explorer-cross-platform";
import { NinePatchAssetController } from "controllers/NinePatchAssetController";
import { ActiveAssetController } from "controllers/ActiveAssetController";

export class AssetController {
    private readonly _asset: Asset;
    private readonly _ninePatchController: NinePatchAssetController;
    private readonly _activeAssetController: ActiveAssetController;

    constructor(asset: Asset, activeAssetController: ActiveAssetController) {
        this._asset = asset;
        this._activeAssetController = activeAssetController;
        this._ninePatchController = new NinePatchAssetController(this, asset);
    }

    get filePath(): string {
        return this._asset.filePath;
    }

    get filename(): string {
        return this._asset.filename;
    }

    get ninePatch(): NinePatchAssetController {
        return this._ninePatchController;
    }

    get activeController(): ActiveAssetController {
        return this._activeAssetController;
    }

    openDirectoryInExplorer(): void {
        const dir = this._asset.dirname;
        console.log(`Opening directory ${dir} in explorer`);
        openExplorer(dir).catch((error) => {
            console.error(error);
        });
    }
}
