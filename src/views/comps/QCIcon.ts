import { QIcon } from "@nodegui/nodegui";
import { ImageLoader } from "src/images/ImageLoader";

export class QCIcon {
    private constructor() {}

    static create(pathOrBase64: string = ""): QIcon {
        return new QIcon(ImageLoader.ins.loadPixmap(pathOrBase64));
    }
}
