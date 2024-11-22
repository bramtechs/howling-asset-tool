import { QMainWindow } from "@nodegui/nodegui";
import { getWorkingDirectory } from "./utils";
import { RootWindow } from "./views/RootWindow";

import sourceMapSupport from "source-map-support";
import { RootController } from "controllers/RootController";

sourceMapSupport.install();

function main(): void {
    console.log("Launched at:", getWorkingDirectory());

    const win = new QMainWindow();
    win.setWindowTitle("Howling Assets Tool");

    const rootController = new RootController();
    new RootWindow(rootController);
}
main();
