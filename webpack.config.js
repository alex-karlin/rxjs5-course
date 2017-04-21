module.exports = {
    entry: "./src/app",
    output: {
        filename: "bundle.js",
        path: `${__dirname}/dist`,
        publicPath: "/dist/"
    },
    module: {
        loaders: [
            { test: /.ts$/, loader: "ts-loader"}
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};