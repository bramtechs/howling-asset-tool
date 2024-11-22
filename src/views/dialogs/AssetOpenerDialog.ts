import { ActiveAssetController } from "src/controllers/ActiveAssetController";
import { View } from "../View";
import { QFileDialog } from "@nodegui/nodegui";

export class AssetOpenerDialog implements View<ActiveAssetController> {
    private controller: ActiveAssetController | undefined;
    private opened: boolean = false;

    setController(controller: ActiveAssetController): void {
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
