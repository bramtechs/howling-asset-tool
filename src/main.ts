import { QMainWindow } from "@nodegui/nodegui";
import { getWorkingDirectory } from "./utils";

import sourceMapSupport from "source-map-support";
import { RootView } from "./views/RootView";
import { RootController } from "./controllers/RootController";
sourceMapSupport.install();

function main(): void {
    console.log("Launched at:", getWorkingDirectory());

    const win = new QMainWindow();
    win.setWindowTitle("Howling Assets Tool");

    const rootController = new RootController();
    const _ = new RootView(rootController);
}
main();
