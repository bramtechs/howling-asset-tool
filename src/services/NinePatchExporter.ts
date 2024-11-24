import { RootController } from "controllers/RootController";
import { ConfigExporter } from "services/ConfigExporter";
import { NinePatchSides } from "types/Asset";

export class NinePatchExporter extends ConfigExporter {
    private sides: NinePatchSides | undefined;

    constructor(assetFilePath: string, rootController: RootController) {
        super(assetFilePath, "9patch", rootController);
    }

    setup(sides: NinePatchSides): void {
        this.sides = sides;
        this._setup();
    }

    override exportToIni(): object {
        return {
            "9patch": {
                left: this.sides!.left.toString(),
                right: this.sides!.right.toString(),
                top: this.sides!.top.toString(),
                bottom: this.sides!.bottom.toString(),
            },
        };
    }
}
