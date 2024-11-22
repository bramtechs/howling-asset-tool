import { RootView } from "src/views/RootView";
import { ActiveAssetController } from "./ActiveAssetController";
import { Controller } from "./Controller";

export class RootController extends Controller<RootView, RootController> {
    activeAssetController: ActiveAssetController;

    constructor() {
        super();
        this.activeAssetController = new ActiveAssetController();
    }
}
