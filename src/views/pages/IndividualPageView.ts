import { QIcon, QLabel, QLayout, QTabWidget } from "@nodegui/nodegui";
import { ActiveAssetView } from "../ActiveAssetView";
import { ActiveAssetController } from "src/controllers/ActiveAssetController";
import { View } from "../View";

export class IndividualPageView extends View<ActiveAssetController> {
    private readonly activeAssetView: ActiveAssetView;
    private readonly tabWidget: QTabWidget;

    constructor(activeAssetController: ActiveAssetController) {
        super(activeAssetController);
        this.tabWidget = new QTabWidget();
        this.tabWidget.setObjectName("tabWidget");
        this.tabWidget.addTab(new QLabel(), new QIcon(), "Nine-patch");
        this.activeAssetView = new ActiveAssetView(activeAssetController);
    }

    mount(layout: QLayout): void {
        this.activeAssetView.mount(layout);
        layout.addWidget(this.tabWidget);
    }
}
