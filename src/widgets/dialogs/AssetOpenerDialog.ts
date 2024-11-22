import { QFileDialog } from "@nodegui/nodegui";
import { ActiveAssetController } from "controllers/ActiveAssetController";

export class AssetOpenerDialog {
    private readonly controller: ActiveAssetController;
    private opened: boolean = false;

    constructor(controller: ActiveAssetController) {
        this.controller = controller;
    }

    open() {
        if (this.opened) {
            throw new Error("Dialog already opened");
        }

        this.opened = true;
        const fileDialog = new QFileDialog();
        fileDialog.setWindowTitle("Select an Image");
        fileDialog.setNameFilter("Images (*.png *.jpg *.jpeg *.bmp *.gif *.webp)");
        fileDialog.exec();

        const selectedFiles = fileDialog.selectedFiles();
        if (selectedFiles.length > 0) {
            this.controller?.openAsset(selectedFiles[0]);
        }
    }
}
