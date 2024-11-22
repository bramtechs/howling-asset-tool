import { QLabel, QPixmap } from "@nodegui/nodegui";
import { loadEmbeddedPixmap } from "src/images/embedded_imgs";

import PlaceHolderImage from "src/img/logox200.png";

export class QCImageLabel extends QLabel {
    constructor(pathOrBase64: string = "") {
        super();
        if (pathOrBase64) {
            this.setImage(pathOrBase64);
        } else {
            this.setToPlaceHolder();
        }
    }

    setToPlaceHolder() {
        this.setPixmap(loadEmbeddedPixmap(PlaceHolderImage));
    }

    setImage(pathOrBase64: string) {
        if (pathOrBase64.startsWith("data:image")) {
            this.setPixmap(loadEmbeddedPixmap(pathOrBase64));
        } else {
            this.setPixmap(new QPixmap(pathOrBase64));
        }
    }
}
