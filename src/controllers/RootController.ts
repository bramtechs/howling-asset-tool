import { ActiveAssetController } from "./ActiveAssetController";

export interface IRootControllerListener {
    changedOutputDirectory(directory: string): void;
}

export class RootController {
    private readonly _activeAssetController: ActiveAssetController;
    private readonly _listeners = new Set<IRootControllerListener>();
    private _outputDirectory: string | undefined;

    constructor() {
        this._activeAssetController = new ActiveAssetController(this);
    }

    get outputDirectory(): string | undefined {
        return this._outputDirectory;
    }

    get activeAssetController(): ActiveAssetController {
        return this._activeAssetController;
    }

    addListener(listener: IRootControllerListener): void {
        this._listeners.add(listener);
    }

    setOutputDirectory(directory: string): void {
        if (this._outputDirectory === directory) {
            return;
        }
        this._outputDirectory = directory;
        this._listeners.forEach((listener) => listener.changedOutputDirectory(directory));
    }
}
