import {
    Direction,
    QBoxLayout,
    QDropEvent,
    QGroupBox,
    QLabel,
    QLayout,
    QPushButton,
    WidgetEventTypes,
} from "@nodegui/nodegui";
import { Mountable } from "./Mountable";
import { AssetController } from "src/controllers/AssetController";
import { View } from "./View";
import { ActiveAssetController } from "src/controllers/ActiveAssetController";
import { QCImageLabel } from "./comps/QCImageLabel";
import { AssetDropListener, DroppedAssetCollector } from "./misc/DroppedAssetCollector";

export class ActiveAssetView implements Mountable, View<ActiveAssetController>, AssetDropListener {
    private asset: AssetController | undefined;
    private controller: ActiveAssetController | undefined;

    private group: QGroupBox;
    private titleLabel: QLabel;

    private openInExplorerButton: QPushButton;
    private openAssetButton: QPushButton;
    private previewImage: QCImageLabel;

    constructor() {
        this.group = new QGroupBox();
        const dropSender = new DroppedAssetCollector(this.group);
        dropSender.addListener(this);
        this.group.setObjectName("Active asset");
        this.titleLabel = new QLabel();

        this.openAssetButton = new QPushButton();
        this.openAssetButton.setText("Open asset");

        this.previewImage = new QCImageLabel();

        this.openInExplorerButton = new QPushButton();
        this.openInExplorerButton.setText("Open in explorer");
    }

    onDrop(urls: string[]): void {
        if (urls.length === 0) {
            return;
        }
        this.controller?.openAsset(urls[0]);
    }

    setController(controller: ActiveAssetController): void {
        this.controller = controller;
    }

    mount(layout: QLayout): void {
        this.group.addEventListener(WidgetEventTypes.Drop, (e) => {
            const dropEvent = new QDropEvent(e!);
            const mimeData = dropEvent.mimeData();
            console.log("dropped", dropEvent.type());
            const urls = mimeData.urls();
            this.controller?.openAsset(urls[0].toString());
        });

        layout.addWidget(this.group);
        const vboxLayout = new QBoxLayout(Direction.TopToBottom);
        this.group.setLayout(vboxLayout);

        {
            vboxLayout.addWidget(this.titleLabel);
        }

        {
            vboxLayout.addWidget(this.openInExplorerButton);
            this.openInExplorerButton.addEventListener("clicked", () => {
                this.asset?.openDirectoryInExplorer();
            });
        }

        {
            vboxLayout.addWidget(this.previewImage);
        }

        {
            vboxLayout.addWidget(this.openAssetButton);
            this.openAssetButton.addEventListener("clicked", () => {
                this.controller?.openAssetDialog();
            });
        }
    }

    updateShownAsset(asset: AssetController) {
        this.titleLabel.setText(asset.filename);
        this.asset = asset;
        this.previewImage.setImage(asset.filePath);
        this.openInExplorerButton.setEnabled(true);
    }

    updateNoAssetSelected() {
        this.asset = undefined;
        this.titleLabel.setText("No asset opened");

        this.openInExplorerButton.setEnabled(false);
        this.previewImage.setToPlaceHolder();
    }
}
