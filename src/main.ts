import { QMainWindow, QWidget, QLabel, QIcon, QBoxLayout, Direction, QTabWidget } from "@nodegui/nodegui";
import { ActiveAssetView } from "./views/ActiveAssetView";
import { ActiveAssetController } from "./controllers/ActiveAssetController";
import { getWorkingDirectory } from "./utils";

import sourceMapSupport from "source-map-support";
sourceMapSupport.install();

function main(): void {
    console.log("Launched at:", getWorkingDirectory());

    const win = new QMainWindow();
    win.setWindowTitle("Howling Assets Tool");

    const centralWidget = new QWidget();
    const rootLayout = new QBoxLayout(Direction.LeftToRight);
    centralWidget.setObjectName("myroot");
    centralWidget.setLayout(rootLayout);

    const activeAsset = new ActiveAssetView();
    activeAsset.mount(rootLayout);

    const tabWidget = new QTabWidget();
    tabWidget.setObjectName("tabWidget");
    tabWidget.addTab(new QLabel(), new QIcon(), "Nine-patch");
    rootLayout.addWidget(tabWidget);

    win.setCentralWidget(centralWidget);
    win.setMinimumSize(800, 600);
    win.show();

    const activeAssetController = new ActiveAssetController(activeAsset);
    activeAssetController.closeAsset();

    (global as any).win = win;
}
main();
