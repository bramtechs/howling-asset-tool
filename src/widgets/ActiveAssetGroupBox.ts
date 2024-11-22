import {
    AspectRatioMode,
    Direction,
    QBoxLayout,
    QGroupBox,
    QLabel,
    QPixmap,
    QPushButton,
    QWidget,
} from "@nodegui/nodegui";
import {
    ActiveAssetController,
    IActiveAssetControllerListener,
} from "controllers/ActiveAssetController";
import {
    DroppedAssetCollector,
    IAssetDropListener,
} from "./misc/DroppedAssetCollector";
import { Asset } from "types/Asset";
import { ImageLoader } from "images/ImageLoader";

export class ActiveAssetGroupBox extends QGroupBox
    implements IAssetDropListener, IActiveAssetControllerListener {
    private asset: Asset | undefined;

    private readonly titleLabel: QLabel;

    private readonly openInExplorerButton: QPushButton;
    private readonly openAssetButton: QPushButton;
    private readonly previewLabel: QLabel;
    private readonly controller: ActiveAssetController;

    constructor(controller: ActiveAssetController) {
        super();
        this.controller = controller;
        this.controller.addListener(this);

        const dropSender = new DroppedAssetCollector(this);
        dropSender.addListener(this);
        this.setObjectName("Active asset");
        this.titleLabel = new QLabel();

        this.openAssetButton = new QPushButton();
        this.openAssetButton.setText("Open asset");

        this.previewLabel = new QLabel();
        this.previewLabel.setAutoFillBackground(true);

        this.openInExplorerButton = new QPushButton();
        this.openInExplorerButton.setEnabled(false);
        this.openInExplorerButton.setText("Open in explorer");

        const vboxLayout = new QBoxLayout(Direction.TopToBottom);
        this.setLayout(vboxLayout);

        {
            const groupWidget = new QWidget();
            const groupLayout = new QBoxLayout(Direction.LeftToRight);
            groupWidget.setLayout(groupLayout);

            groupLayout.addWidget(this.titleLabel);

            groupLayout.addWidget(this.openAssetButton);
            this.openAssetButton.addEventListener("clicked", () => {
                this.controller?.openAssetDialog();
            });
            vboxLayout.addWidget(groupWidget);
        }

        vboxLayout.addWidget(this.previewLabel);

        vboxLayout.addWidget(this.openInExplorerButton);
        this.openInExplorerButton.addEventListener("clicked", () => {
            this.controller?.activeAsset?.openDirectoryInExplorer();
        });
    }

    private setPreviewImage(image: QPixmap): void {
        this.previewLabel.setPixmap(
            image.scaled(
                this.previewLabel.width(),
                this.previewLabel.height(),
                AspectRatioMode.KeepAspectRatio,
            ),
        );
    }

    openedAsset(asset: Asset): void {
        this.titleLabel.setText(asset.filename);
        this.asset = asset;
        this.setPreviewImage(ImageLoader.pixmap.load(asset.filePath));
        this.openInExplorerButton.setEnabled(true);
    }

    closedAsset(): void {
        this.asset = undefined;
        this.titleLabel.setText("No asset opened");

        this.openInExplorerButton.setEnabled(false);
        this.setPreviewImage(new QPixmap());
    }

    onDrop(urls: string[]): void {
        if (urls.length === 0) {
            return;
        }
        this.controller?.openAsset(urls[0]);
    }
}
