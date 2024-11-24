import { AssetController } from "controllers/AssetController";
import { RootController } from "controllers/RootController";
import { NinePatchExporter } from "services/NinePatchExporter";
import { Asset, NinePatchSides } from "types/Asset";

export class NinePatchAssetController {
    private readonly _controller: AssetController;
    private readonly _rootController: RootController;
    private readonly _asset: Asset;

    constructor(controller: AssetController, asset: Asset) {
        this._controller = controller;
        this._rootController = controller.activeController.rootController;
        this._asset = asset;
    }

    get sides(): NinePatchSides {
        return { ...this._asset.ninePatch };
    }

    setSides(sides: NinePatchSides): void {
        this._asset.setNinePatchSides(sides);
    }

    export() {
        try {
            const exporter = new NinePatchExporter(this._asset.filePath, this._rootController);
            exporter.setup(this.sides);
            exporter.export();
        } catch (error) {
            console.error(error);
        }
    }
}
