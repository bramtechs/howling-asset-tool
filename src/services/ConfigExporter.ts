import { RootController } from "controllers/RootController";
import { writeFileSync } from "fs";
import path, { basename } from "path";
import { stringify } from "ini";

class ExporterError extends Error {
    constructor(message: string, base?: unknown) {
        super(message + ExporterError.parseError(base));
    }

    private static parseError(err?: unknown): string {
        if (!err) {
            return "";
        }

        if (err instanceof Error) {
            return err.message;
        }

        return "Unknown error";
    }
}

export abstract class ConfigExporter {
    protected readonly assetFileName: string;

    private readonly rootController: RootController;
    private readonly extension: string;

    private isSetup = false;

    constructor(assetFilePath: string, ext: string, rootController: RootController) {
        this.assetFileName = basename(assetFilePath);
        this.rootController = rootController;

        if (!ext.startsWith(".")) {
            this.extension = `.${ext}`;
        } else {
            this.extension = ext;
        }
    }

    /**
     * Returns the full path to the output file with ${this.extension}.ini extension
     *
     * @throws ExporterError
     * @param fileName Filename with or without extension
     * @returns Full path to the output file with .ini extension
     */
    protected fullOutputPath(fileName: string): string {
        if (!this.rootController.outputDirectory) {
            throw new ExporterError("Output directory is not set");
        }

        let fileStem = fileName;
        if (fileName.includes(".")) {
            fileStem = fileStem.split(".")[0];
        }

        const fileNameModified = `${fileStem}${this.extension}.ini`;
        return path.join(this.rootController.outputDirectory, fileNameModified);
    }

    /**
     * @throws ExporterError
     * @param outputFileName Filename of the output file that will end up in outputDirectory
     */
    protected abstract exportToIni(): object;

    protected _setup(): void {
        if (this.isSetup) {
            throw new ExporterError("Exporter is already set up");
        }

        this.isSetup = true;
    }

    /**
     * @throws ExporterError
     */
    export(): void {
        if (!this.isSetup) {
            throw new ExporterError("Exporter is not set up");
        }

        let outputPath = "(no output path)";
        try {
            outputPath = this.fullOutputPath(this.assetFileName);
            const ini = {
                core: {
                    fileName: this.assetFileName,
                },
                ...this.exportToIni(),
            };
            writeFileSync(outputPath, stringify(ini));
        } catch (err) {
            throw new ExporterError(`Failed to write to ${outputPath}`, err);
        }

        console.log(`Exported config to ${outputPath}`);
    }
}
