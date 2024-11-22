import { Asset } from "src/types/Asset";
import { AssetController } from "./AssetController";
import { ActiveAssetView } from "src/views/ActiveAssetView";
import { AssetOpenerDialog } from "src/views/dialogs/AssetOpenerDialog";
import { Controller } from "./Controller";

export class ActiveAssetController
    extends Controller<ActiveAssetView, ActiveAssetController> {
    private assetController: AssetController | undefined;

    openAsset(filePath: string) {
        this.view?.updateShownAsset(Asset.create(filePath));
    }

    openAssetDialog() {
        const view = new AssetOpenerDialog(this);
        console.log("Opening asset dialog");
        view.open();
    }

    closeAsset() {
        this.assetController = undefined;
        this.view?.updateNoAssetSelected();
    }

    get activeAsset(): AssetController | undefined {
        return this.assetController;
    }
}
