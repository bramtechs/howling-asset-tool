import { QPixmap } from "@nodegui/nodegui";
import { removePrefix } from "utils";

interface ILoader<O> {
    load(pathOrBase64: string): O;
}

class BufferLoader implements ILoader<Buffer> {
    load(pathOrBase64: string): Buffer {
        if (pathOrBase64.startsWith("data:image")) {
            pathOrBase64 = removePrefix(pathOrBase64, "data:image/png;base64");
            return Buffer.from(pathOrBase64, "base64");
        }
        return Buffer.from(pathOrBase64);
    }
}

class PixmapLoader implements ILoader<QPixmap> {
    private readonly bufferLoader: BufferLoader;

    constructor(bufferLoader: BufferLoader) {
        this.bufferLoader = bufferLoader;
    }

    load(pathOrBase64: string): QPixmap {
        if (pathOrBase64.startsWith("data:image")) {
            return this.loadEmbeddedPixmap(pathOrBase64);
        }
        return new QPixmap(pathOrBase64);
    }

    private loadEmbeddedPixmap(base64: string): QPixmap {
        const buffer = this.bufferLoader.load(base64);
        const map = new QPixmap();
        map.loadFromData(buffer);
        return map;
    }
}

export class ImageLoader {
    private readonly pixmapLoader: PixmapLoader;
    private readonly bufferLoader: BufferLoader;

    constructor() {
        this.bufferLoader = new BufferLoader();
        this.pixmapLoader = new PixmapLoader(this.bufferLoader);
    }

    private static get ins(): ImageLoader {
        if (!ImageLoader.instance) {
            ImageLoader.instance = new ImageLoader();
        }
        return ImageLoader.instance;
    }

    static get buffer(): BufferLoader {
        return ImageLoader.ins.bufferLoader;
    }

    static get pixmap(): PixmapLoader {
        return ImageLoader.ins.pixmapLoader;
    }

    private static instance: ImageLoader;
}
