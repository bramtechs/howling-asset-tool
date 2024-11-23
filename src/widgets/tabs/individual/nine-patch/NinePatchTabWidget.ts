import {
    Direction,
    QBoxLayout,
    QGridLayout,
    QGroupBox,
    QSpinBox,
    QTabWidget,
} from "@nodegui/nodegui";
import { ActiveAssetController } from "controllers/ActiveAssetController";
import { quickLabel } from "utils";

export class NinePatchTabWidget extends QTabWidget {
    private readonly controller: ActiveAssetController;

    constructor(activeAssetController: ActiveAssetController) {
        super();
        this.controller = activeAssetController;

        const layout = new QBoxLayout(Direction.LeftToRight);
        this.setLayout(layout);

        // TODO: draw the nine-patch grid preview
        const groupBox = new QGroupBox();
        {
            function side(label: string, row: number) {
                groupLayout.addWidget(quickLabel(label), row, 0);
                const leftDial = new QSpinBox();
                groupLayout.addWidget(leftDial, row, 1);
            }

            groupBox.setTitle("Sides");
            const groupLayout = new QGridLayout();
            groupBox.setLayout(groupLayout);

            side("Left", 0);
            side("Right", 1);
            side("Top", 2);
            side("Bottom", 3);
        }

        layout.addWidget(groupBox);
    }
}
