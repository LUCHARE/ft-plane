const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV || "production",

    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public/scripts")
    },
    
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}