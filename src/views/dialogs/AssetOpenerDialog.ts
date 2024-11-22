import { ActiveAssetController } from "src/controllers/ActiveAssetController";
import { View } from "../View";
import { QFileDialog, QLayout } from "@nodegui/nodegui";

export class AssetOpenerDialog extends View<ActiveAssetController> {
    private opened: boolean = false;

    constructor(controller: ActiveAssetController) {
        super(controller);
    }

    override mount(layout: QLayout): void {
        // empty
    }

    open() {
        if (this.opened) {
            throw new Error("Dialog already opened");
        }

        this.opened = true;
        const fileDialog = new QFileDialog();
        fileDialog.setWindowTitle("Select an Image");
        fileDialog.setNameFilter(
            "Images (*.png *.jpg *.jpeg *.bmp *.gif *.webp)",
        );
        fileDialog.exec();

        const selectedFiles = fileDialog.selectedFiles();
        if (selectedFiles.length > 0) {
            this.controller?.openAsset(selectedFiles[0]);
        }
    }
}
