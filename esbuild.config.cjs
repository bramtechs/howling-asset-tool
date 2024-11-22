const esbuild = require("esbuild");
const inlineImage = require("esbuild-plugin-inline-image");

esbuild
    .build({
        entryPoints: ["src/main.ts"],
        sourcemap: true,
        bundle: true,
        minify: true,
        treeShaking: true,
        outfile: "dist/main.cjs",
        platform: "node",
        format: "cjs",
        external: ["@nodegui/nodegui", "nodegui-plugin-*"],
        plugins: [inlineImage({
            extensions: [".png", ".jpg", ".jpeg", ".gif", ".svg"],
            limit: 8192,
        })],
    })
    .then(() => {
        console.log("Build succeeded");
    })
    .catch((err) => {
        console.error("Build failed:", err);
        process.exit(1);
    });
