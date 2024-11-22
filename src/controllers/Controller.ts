import { View } from "src/views/View";

export class Controller<T extends View<C>, C> {
    protected view: T | undefined;

    setView(view: T): void {
        this.view = view;
    }
}
