import { ActiveAssetController } from "./ActiveAssetController";

export class RootController {
    activeAssetController: ActiveAssetController;

    constructor() {
        this.activeAssetController = new ActiveAssetController();
    }
}
