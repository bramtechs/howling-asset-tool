import { QPixmap } from "@nodegui/nodegui";
import { removePrefix } from "src/utils";

function base64ToBuffer(base64: string): Buffer {
    base64 = removePrefix(base64, "data:image/png;base64");
    return Buffer.from(base64, "base64");
}

export function loadEmbeddedPixmap(base64: string): QPixmap {
    const buffer = base64ToBuffer(base64);
    const map = new QPixmap();
    map.loadFromData(buffer);
    return map;
}
