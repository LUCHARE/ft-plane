const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const CSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: process.env.NODE_ENV || "production",

    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist/"),
    },

    devServer: {
        static: "./dist",
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"],
        },
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    CSSExtractPlugin.loader,
                    { loader: "css-loader", options: { url: false } },
                    "sass-loader",
                ],
            },
            { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
            { test: /\.hbs$/, loader: "handlebars-loader" },
        ],
    },

    performance: {
        hints: false,
    },

    plugins: [
        new CopyPlugin({
            patterns: [{ from: "./src/images", to: "images" }],
        }),
        new HtmlPlugin({
            template: "./src/markup/index.hbs",
            templateParameters: {
                "features": require("./data/features.json"),
                "best-travelers": require("./data/best-travelers.json"),
                "feedback": require("./data/feedback.json"),
                "memories": require("./data/memories.json"),
                "popular-tickets": require("./data/popular-tickets.json"),
            },
        }),
        new CSSExtractPlugin(),
    ],
};
