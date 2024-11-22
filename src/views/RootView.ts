import {
    Direction,
    QBoxLayout,
    QLayout,
    QMainWindow,
    QTabWidget,
    QWidget,
} from "@nodegui/nodegui";
import { QCTabPage } from "./comps/QCTabPage";
import { IndividualPageView } from "./pages/IndividualPageView";
import { RootController } from "src/controllers/RootController";
import { View } from "./View";

export class RootView extends View<RootController> {
    private readonly individualPageView: IndividualPageView;
    private readonly tabWidget: QTabWidget;
    private readonly individualPage: QCTabPage;
    private readonly window: QMainWindow;
    private readonly centralWidget: QWidget;
    private readonly rootLayout: QBoxLayout;

    constructor(rootController: RootController) {
        super(rootController);

        this.window = new QMainWindow();
        this.window.setWindowTitle("Howling Assets Tool");
        this.centralWidget = new QWidget();

        this.rootLayout = new QBoxLayout(Direction.TopToBottom);
        this.centralWidget.setObjectName("myroot");
        this.centralWidget.setLayout(this.rootLayout);

        this.tabWidget = new QTabWidget();
        this.individualPage = new QCTabPage(Direction.LeftToRight);
        this.individualPage.addToTabWidget(
            this.tabWidget,
            "Individual",
        );
        this.individualPageView = new IndividualPageView(
            rootController.activeAssetController,
        );

        this.mount(this.rootLayout);
    }

    mount(layout: QLayout): void {
        layout.addWidget(this.tabWidget);
        this.individualPageView.mount(this.individualPage.getLayout());
        this.mountWindow();
    }

    private mountWindow() {
        this.window.setCentralWidget(this.centralWidget);
        this.window.setMinimumSize(800, 600);
        this.window.show();

        (global as any).win = this.window;
    }
}
