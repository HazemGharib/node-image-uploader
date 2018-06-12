var path = require('path');
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        scripts:
        [
            './public/javascripts/jquery-1.10.2.js',
            './public/javascripts/modernizr-2.6.2.js',
            './public/javascripts/iziToast/iziToast.min.js',
            './public/javascripts/dropzone/dropzone.js',
            './public/javascripts/dropzone.objects.js',
            './public/javascripts/bootstrap.js',
            './public/javascripts/respond.js'
        ]
    },
    output: {
        filename: 'bundle-[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};