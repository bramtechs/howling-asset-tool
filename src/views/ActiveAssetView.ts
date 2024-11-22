import {
    Direction,
    QBoxLayout,
    QGroupBox,
    QLabel,
    QLayout,
    QPushButton,
    QWidget,
} from "@nodegui/nodegui";
import { View } from "./View";
import { ActiveAssetController } from "src/controllers/ActiveAssetController";
import { QCImageLabel } from "./comps/QCImageLabel";
import {
    AssetDropListener,
    DroppedAssetCollector,
} from "./misc/DroppedAssetCollector";
import { Asset } from "src/types/Asset";

export class ActiveAssetView extends View<ActiveAssetController>
    implements AssetDropListener {
    private asset: Asset | undefined;

    private readonly group: QGroupBox;
    private readonly titleLabel: QLabel;

    private readonly openInExplorerButton: QPushButton;
    private readonly openAssetButton: QPushButton;
    private readonly previewImage: QCImageLabel;

    constructor(controller: ActiveAssetController) {
        super(controller);

        this.group = new QGroupBox();
        const dropSender = new DroppedAssetCollector(this.group);
        dropSender.addListener(this);
        this.group.setObjectName("Active asset");
        this.titleLabel = new QLabel();

        this.openAssetButton = new QPushButton();
        this.openAssetButton.setText("Open asset");

        this.previewImage = new QCImageLabel();
        this.previewImage.setFixedSize(200, 200);

        this.openInExplorerButton = new QPushButton();
        this.openInExplorerButton.setText("Open in explorer");
    }

    onDrop(urls: string[]): void {
        if (urls.length === 0) {
            return;
        }
        this.controller?.openAsset(urls[0]);
    }

    override mount(layout: QLayout): void {
        layout.addWidget(this.group);
        const vboxLayout = new QBoxLayout(Direction.TopToBottom);
        this.group.setLayout(vboxLayout);

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

        vboxLayout.addWidget(this.previewImage);

        vboxLayout.addWidget(this.openInExplorerButton);
        this.openInExplorerButton.addEventListener("clicked", () => {
            this.controller?.activeAsset?.openDirectoryInExplorer();
        });
    }

    updateShownAsset(asset: Asset) {
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
