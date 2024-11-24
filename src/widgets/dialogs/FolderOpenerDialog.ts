import { FileMode, QFileDialog } from "@nodegui/nodegui";

export class FolderOpenerDialog {
    private opened: boolean = false;

    open(): string | undefined {
        if (this.opened) {
            throw new Error("Dialog already opened");
        }

        this.opened = true;
        console.log("Opening folder dialog");

        const fileDialog = new QFileDialog();
        fileDialog.setFileMode(FileMode.Directory);
        fileDialog.exec();

        const selectedFiles = fileDialog.selectedFiles();
        if (selectedFiles.length > 0) {
            return selectedFiles[0];
        }
    }
}
