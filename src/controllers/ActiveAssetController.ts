import { Asset } from "src/types/Asset";
import { AssetController } from "./AssetController";
import { ActiveAssetView } from "src/views/ActiveAssetView";
import { AssetOpenerDialog } from "src/views/dialogs/AssetOpenerDialog";

export class ActiveAssetController {
    private assetController: AssetController | undefined;

    private readonly activeAssetView: ActiveAssetView;

    constructor(activeAssetView: ActiveAssetView) {
        this.activeAssetView = activeAssetView;
        this.activeAssetView.setController(this);
    }

    openAsset(filePath: string) {
        const asset = new Asset(filePath);
        this.assetController = new AssetController(asset);
        this.activeAssetView.updateShownAsset(this.assetController);
    }

    openAssetDialog() {
        const view = new AssetOpenerDialog();
        view.setController(this);
        view.open();
    }

    closeAsset() {
        this.assetController = undefined;
        this.activeAssetView.updateNoAssetSelected();
    }
}
