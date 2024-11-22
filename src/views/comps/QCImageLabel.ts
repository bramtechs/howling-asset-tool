import { QLabel } from "@nodegui/nodegui";
import { ImageHolder } from "src/images/ImageHolder";
import { ImageLoader } from "src/images/ImageLoader";

import PlaceHolderImage from "src/img/logox200.png";

export class QCImageLabel extends QLabel implements ImageHolder {
    constructor(pathOrBase64: string = "") {
        super();
        if (pathOrBase64) {
            this.setImage(pathOrBase64);
        } else {
            this.setToPlaceHolder();
        }
    }

    setToPlaceHolder() {
        this.setPixmap(ImageLoader.ins.loadPixmap(PlaceHolderImage));
    }

    setImage(pathOrBase64: string) {
        super.setPixmap(ImageLoader.ins.loadPixmap(pathOrBase64));
    }

    static create(pathOrBase64: string = ""): QCImageLabel {
        return new QCImageLabel(pathOrBase64);
    }
}
