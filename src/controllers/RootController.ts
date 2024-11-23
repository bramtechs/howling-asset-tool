import { ActiveAssetController } from "./ActiveAssetController";

export class RootController {
    activeAssetController: ActiveAssetController;

    private _outputDirectory: string | undefined;

    constructor() {
        this.activeAssetController = new ActiveAssetController();
    }

    get outputDirectory(): string | undefined {
        return this._outputDirectory;
    }

    setOutputDirectory(directory: string): void {
        this._outputDirectory = directory;
    }
}
