import { QPixmap } from "@nodegui/nodegui";
import { removePrefix } from "src/utils";

export class ImageLoader {
    loadPixmap(pathOrBase64: string): QPixmap {
        if (pathOrBase64.startsWith("data:image")) {
            return this.loadEmbeddedPixmap(pathOrBase64);
        }
        return new QPixmap(pathOrBase64);
    }

    loadEmbeddedPixmap(base64: string): QPixmap {
        const buffer = this.base64ToBuffer(base64);
        const map = new QPixmap();
        map.loadFromData(buffer);
        return map;
    }

    private base64ToBuffer(base64: string): Buffer {
        base64 = removePrefix(base64, "data:image/png;base64");
        return Buffer.from(base64, "base64");
    }

    static get ins(): ImageLoader {
        if (!ImageLoader.instance) {
            ImageLoader.instance = new ImageLoader();
        }
        return ImageLoader.instance;
    }

    private static instance: ImageLoader;
}
