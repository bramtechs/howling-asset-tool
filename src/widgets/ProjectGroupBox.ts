import { Direction, QBoxLayout, QGroupBox, QLineEdit, QPushButton } from "@nodegui/nodegui";
import { RootController } from "controllers/RootController";
import { quickLabel } from "utils";
import { FolderOpenerDialog } from "widgets/dialogs/FolderOpenerDialog";

export class ProjectGroupBox extends QGroupBox {
    private readonly controller: RootController;
    private readonly outputInput: QLineEdit;

    constructor(rootController: RootController) {
        super();
        this.controller = rootController;
        this.setTitle("Project");

        const layout = new QBoxLayout(Direction.TopToBottom);
        layout.setSpacing(8);
        this.setLayout(layout);

        {
            const propLayout = new QBoxLayout(Direction.LeftToRight);
            propLayout.addWidget(quickLabel("Output directory:"));
            this.outputInput = new QLineEdit();
            this.outputInput.setPlaceholderText("Output directory");
            this.outputInput.addEventListener("textChanged", (text) => {
                this.controller.setOutputDirectory(text);
            });
            this.outputInput.setText(this.controller.outputDirectory ?? "");
            propLayout.addWidget(this.outputInput);

            const editButton = new QPushButton();
            editButton.setText("...");
            editButton.addEventListener("clicked", () => {
                const folder = new FolderOpenerDialog().open();
                if (folder) {
                    this.outputInput.setText(folder);
                    this.controller.setOutputDirectory(folder);
                }
            });
            propLayout.addWidget(editButton);
            layout.addLayout(propLayout);
        }
    }
}
