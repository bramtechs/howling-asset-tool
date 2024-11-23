import {
    Direction,
    QBoxLayout,
    QColor,
    QGridLayout,
    QGroupBox,
    QImage,
    QPainter,
    QPen,
    QSpinBox,
    QTabWidget,
    QWidget,
    WidgetEventTypes,
} from "@nodegui/nodegui";
import { ActiveAssetController, IActiveAssetControllerListener } from "controllers/ActiveAssetController";
import { Asset, NinePatchSides } from "types/Asset";
import { quickLabel } from "utils";

class PreviewCanvas extends QWidget {
    private sides: NinePatchSides | undefined;
    private texture: QImage | undefined;

    constructor() {
        super();
        this.addEventListener(WidgetEventTypes.Paint, () => {
            const painter = new QPainter(this);

            if (this.texture) {
                painter.drawImage(0, 0, this.texture);
            }

            if (this.sides && this.texture) {
                const { left, right, top, bottom } = this.sides;
                const pen = new QPen();
                pen.setColor(new QColor(255, 0, 0));
                pen.setWidth(1);
                painter.setPen(pen);
                painter.drawLine(left, 0, left, this.texture.height());
                painter.drawLine(this.texture.width() - right, 0, this.texture.width() - right, this.texture.height());
                painter.drawLine(0, top, this.texture.width(), top);
                painter.drawLine(
                    0,
                    this.texture.height() - bottom,
                    this.texture.width(),
                    this.texture.height() - bottom,
                );
            }

            painter.end();
        });
    }

    setConfig(texture: QImage, sides: NinePatchSides | undefined) {
        this.texture = texture;
        this.sides = sides;
        this.repaint();
    }
}

export class NinePatchTabWidget extends QTabWidget implements IActiveAssetControllerListener {
    private readonly controller: ActiveAssetController;
    private readonly previewCanvas: PreviewCanvas;
    private readonly dials: Record<string, QSpinBox> = {};
    private image: QImage | undefined;

    constructor(activeAssetController: ActiveAssetController) {
        super();
        this.controller = activeAssetController;
        this.controller.addListener(this);

        const layout = new QBoxLayout(Direction.LeftToRight);
        this.setLayout(layout);

        this.previewCanvas = new PreviewCanvas();
        layout.addWidget(this.previewCanvas);

        const groupBox = new QGroupBox();
        {
            const side = (label: keyof NinePatchSides, row: number) => {
                groupLayout.addWidget(quickLabel(label), row, 0);
                const dial = new QSpinBox();
                groupLayout.addWidget(dial, row, 1);
                this.dials[label] = dial;
                dial.addEventListener("valueChanged", (value) => {
                    this.controller.setNinePatchSide(label, value);
                    if (this.image) {
                        this.previewCanvas.setConfig(this.image, this.controller.getNinePatchSides());
                    }
                });
            };

            groupBox.setTitle("Sides");
            const groupLayout = new QGridLayout();
            groupBox.setLayout(groupLayout);

            side("left", 0);
            side("right", 1);
            side("top", 2);
            side("bottom", 3);

            this.updateDials();
        }

        layout.addWidget(groupBox);
    }

    updateDials() {
        const sides = this.controller.getNinePatchSides();
        for (const [label, dial] of Object.entries(this.dials)) {
            if (sides) {
                if (this.image) {
                    dial.setMaximum(this.image.width());
                    dial.setMinimum(0);
                }
                dial.setValue(sides[label as keyof NinePatchSides]);
                dial.setEnabled(true);
            } else {
                dial.setValue(0);
                dial.setMaximum(0);
                dial.setMinimum(0);
                dial.setEnabled(false);
            }
        }
    }

    openedAsset(asset: Asset): void {
        this.image = new QImage(asset.filePath);
        this.previewCanvas.setConfig(this.image, this.controller.getNinePatchSides());
        this.previewCanvas.show();
        this.updateDials();
    }

    closedAsset(): void {
        this.image = undefined;
        this.previewCanvas.hide();
        this.updateDials();
    }
}
