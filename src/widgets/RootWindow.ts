import { Direction, QBoxLayout, QIcon, QMainWindow, QTabWidget, QWidget } from "@nodegui/nodegui";
import { IndividualTabWidget } from "./tabs/IndividualTabWidget";
import { RootController } from "controllers/RootController";
import { IActiveAssetControllerListener } from "controllers/ActiveAssetController";
import { Asset } from "types/Asset";

export class RootWindow extends QMainWindow implements IActiveAssetControllerListener {
    private readonly tabWidget: QTabWidget;
    private readonly individualTabIndex: number;

    constructor(controller: RootController) {
        super();

        controller.activeAssetController.addListener(this);

        this.setWindowTitle("Howling Assets Tool");

        const central = new QWidget();
        this.setCentralWidget(central);

        const rootLayout = new QBoxLayout(Direction.TopToBottom);
        central.setLayout(rootLayout);

        this.tabWidget = new QTabWidget();
        const individualPageView = new IndividualTabWidget(controller.activeAssetController);
        this.individualTabIndex = this.tabWidget.addTab(individualPageView, new QIcon(), "Individual");

        rootLayout.addWidget(this.tabWidget);
        this.setMinimumSize(800, 600);
        this.show();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).win = this;
    }

    openedAsset(asset: Asset): void {
        this.tabWidget.setTabIcon(this.individualTabIndex, new QIcon(asset.filePath));
    }
    closedAsset(): void {
        this.tabWidget.setTabIcon(this.individualTabIndex, new QIcon());
    }
}
