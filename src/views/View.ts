import { QLayout } from "@nodegui/nodegui";
import { Mountable } from "./Mountable";

export abstract class View<T> implements Mountable {
    protected controller: T;

    constructor(controller: T) {
        this.controller = controller;
    }

    abstract mount(layout: QLayout): void;
}
