export function getWorkingDirectory() {
    return process.cwd();
}

export function removePrefix(text: string, prefix: string): string {
    if (text.startsWith(prefix)) {
        return text.substring(prefix.length);
    }
    return text;
}
