import { QLayout } from "@nodegui/nodegui";

export interface Mountable {
    mount(layout: QLayout): void;
}
