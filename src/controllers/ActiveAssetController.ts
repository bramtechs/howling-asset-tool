import { Asset } from "types/Asset";
import { AssetController } from "./AssetController";
import { AssetOpenerDialog } from "views/dialogs/AssetOpenerDialog";
import { existsSync } from "fs";
import { ControllerException } from "controllers/exceptions/ControllerException";

export interface IActiveAssetControllerListener {
    openedAsset(asset: Asset): void;
    closedAsset(): void;
}

export class ActiveAssetController {
    private readonly listeners: IActiveAssetControllerListener[] = [];
    private assetController: AssetController | undefined;

    addListener(listener: IActiveAssetControllerListener) {
        this.listeners.push(listener);
    }

    openAsset(filePath: string) {
        if (!existsSync(filePath)) {
            throw new ControllerException(`File does not exist: ${filePath}`);
        }
        const asset = Asset.create(filePath);
        this.assetController = new AssetController(asset);
        this.listeners.forEach((listener) => listener.openedAsset(asset));
    }

    openAssetDialog() {
        const view = new AssetOpenerDialog(this);
        console.log("Opening asset dialog");
        view.open();
    }

    closeAsset() {
        this.assetController = undefined;
        this.listeners.forEach((listener) => listener.closedAsset());
    }

    get activeAsset(): AssetController | undefined {
        return this.assetController;
    }
}
