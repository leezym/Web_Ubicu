resolve: {
        fallback: {
            "util": require.resolve("util/")
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    }