const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const CSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: process.env.NODE_ENV || "production",

    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public/")
    },
    
    devServer: {
        static: "./public"
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [CSSExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },

    performance: {
        hints: false,
    }, 

    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "./src/images", to: "images"}
            ]
        }),
        new HtmlPlugin({ 
            template: "./src/index.html",
        }),
        new CSSExtractPlugin(),
    ]
}