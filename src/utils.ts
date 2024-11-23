import { QLabel } from "@nodegui/nodegui";

export function getWorkingDirectory() {
    return process.cwd();
}

export function removePrefix(text: string, prefix: string): string {
    if (text.startsWith(prefix)) {
        return text.substring(prefix.length);
    }
    return text;
}

export function quickLabel(text: string): QLabel {
    const label = new QLabel();
    label.setText(text);
    return label;
}
