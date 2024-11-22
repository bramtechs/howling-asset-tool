import { Direction, QBoxLayout, QGroupBox, QTabWidget } from "@nodegui/nodegui";
import { ActiveAssetController } from "controllers/ActiveAssetController";

export class NinePatchTabWidget extends QTabWidget {
    private readonly controller: ActiveAssetController;

    constructor(activeAssetController: ActiveAssetController) {
        super();
        this.controller = activeAssetController;

        const layout = new QBoxLayout(Direction.LeftToRight);
        this.setLayout(layout);

        // TODO: draw the nine-patch grid preview

        const groupBox = new QGroupBox();
        groupBox.setTitle("Cells");

        layout.addWidget(groupBox);
    }
}
