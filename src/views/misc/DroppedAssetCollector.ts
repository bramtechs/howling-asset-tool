import {
    QDragMoveEvent,
    QDropEvent,
    QWidget,
    WidgetEventTypes,
} from "@nodegui/nodegui";

export interface AssetDropListener {
    onDrop(urls: string[]): void;
}

export class DroppedAssetCollector {
    private readonly widget: QWidget;
    private readonly listeners: AssetDropListener[] = [];

    constructor(widget: QWidget) {
        this.widget = widget;
        this.widget.setAcceptDrops(true);
        this.widget.addEventListener(WidgetEventTypes.DragEnter, (e) => {
            const ev = new QDragMoveEvent(e!);
            console.log("dragEnter", ev.proposedAction());
            const mimeData = ev.mimeData();
            mimeData.text(); //Inspection of text works
            console.log("mimeData", {
                hasColor: mimeData.hasColor(),
                hasHtml: mimeData.hasHtml(),
                hasImage: mimeData.hasImage(),
                hasText: mimeData.hasText(),
                hasUrls: mimeData.hasUrls(),
                html: mimeData.html(),
                text: mimeData.text(),
            }); //Inspection of MIME data works
            const urls = mimeData.urls(); //Get QUrls
            for (const url of urls) {
                const str = url.toString();
                console.log("url", str); //Log out Urls in the event
            }
            ev.accept(); //Accept the drop event, which is crucial for accepting further events
        });
        this.widget.addEventListener(WidgetEventTypes.Drop, (e) => {
            const dropEvent = new QDropEvent(e!);
            const mimeData = dropEvent.mimeData();
            const urls = mimeData.urls().map((url) => url.toString());
            console.debug("Dropped", urls);
            this.listeners.forEach((listener) => listener.onDrop(urls));
        });
    }

    addListener(listener: AssetDropListener) {
        this.listeners.push(listener);
    }
}
