import { Asset, NinePatchSides } from "types/Asset";
import { AssetController } from "./AssetController";
import { AssetOpenerDialog } from "widgets/dialogs/AssetOpenerDialog";
import { existsSync } from "fs";
import { ControllerException } from "controllers/exceptions/ControllerException";
import { RootController } from "controllers/RootController";

export interface IActiveAssetControllerListener {
    openedAsset(asset: Asset): void;
    closedAsset(): void;
}

export class ActiveAssetController {
    private readonly _listeners: IActiveAssetControllerListener[] = [];
    private readonly _rootController: RootController;
    private _assetController: AssetController | undefined;

    constructor(rootController: RootController) {
        this._rootController = rootController;
    }

    addListener(listener: IActiveAssetControllerListener) {
        this._listeners.push(listener);
    }

    openAsset(filePath: string) {
        if (!existsSync(filePath)) {
            throw new ControllerException(`File does not exist: ${filePath}`);
        }
        const asset = Asset.create(filePath);
        this._assetController = new AssetController(asset, this);
        this._listeners.forEach((listener) => listener.openedAsset(asset));
    }

    openAssetDialog() {
        const view = new AssetOpenerDialog(this);
        console.log("Opening asset dialog");
        view.open();
    }

    closeAsset() {
        this._assetController = undefined;
        this._listeners.forEach((listener) => listener.closedAsset());
    }

    setNinePatchSide(side: keyof NinePatchSides, value: number) {
        if (this._assetController) {
            const sides = this._assetController.ninePatch.sides;
            sides[side] = value;
            this._assetController.ninePatch.setSides(sides);
        }
    }

    getNinePatchSides(): NinePatchSides | undefined {
        if (this._assetController) {
            return this._assetController.ninePatch.sides;
        }
    }

    exportNinePatch() {
        if (this._assetController) {
            this._assetController.ninePatch.export();
        }
    }

    get activeAsset(): AssetController | undefined {
        return this._assetController;
    }

    get rootController(): RootController {
        return this._rootController;
    }
}
