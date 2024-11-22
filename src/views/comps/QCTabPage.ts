import { Direction, QBoxLayout, QIcon, QTabWidget, QWidget } from "@nodegui/nodegui";
import { QCIcon } from "./QCIcon";

export class QCTabPage extends QWidget {
    private usedLayout: QBoxLayout;

    constructor(dir: Direction) {
        super();
        this.usedLayout = new QBoxLayout(dir);
        this.setLayout(this.usedLayout);
    }

    addToTabWidget(tabWidget: QTabWidget, title: string, iconPathOrBase64: string = ""): void {
        if (iconPathOrBase64) {
            tabWidget.addTab(this, QCIcon.create(iconPathOrBase64), title);
            return;
        }
        tabWidget.addTab(this, new QIcon(), title);
    }

    getLayout(): QBoxLayout {
        return this.usedLayout;
    }

    static create(dir: Direction): QCTabPage {
        return new QCTabPage(dir);
    }
}
