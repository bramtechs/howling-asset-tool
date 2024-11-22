import { Direction, QBoxLayout, QIcon, QTabWidget } from "@nodegui/nodegui";
import { ActiveAssetGroupBox } from "../ActiveAssetGroupBox";
import { ActiveAssetController } from "controllers/ActiveAssetController";
import { NinePatchTabWidget } from "widgets/tabs/individual/nine-patch/NinePatchTabWidget";

export class IndividualTabWidget extends QTabWidget {
    private readonly toolsTabs: QTabWidget;

    constructor(activeAssetController: ActiveAssetController) {
        super();

        const layout = new QBoxLayout(Direction.LeftToRight);
        this.setLayout(layout);
        layout.addWidget(new ActiveAssetGroupBox(activeAssetController));

        this.toolsTabs = new QTabWidget();
        this.toolsTabs.addTab(
            new NinePatchTabWidget(activeAssetController),
            new QIcon(),
            "Nine-patch",
        );

        layout.addWidget(this.toolsTabs);
    }
}
