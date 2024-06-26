const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./webpack.base");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

const prodConfig = {
	mode: "production",
	plugins: [
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require("cssnano"),
		}),
		new HtmlWebpackExternalsPlugin({
			externals: [
				{
					module: "react",
					entry:
						"https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js",
					global: "React",
				},
				{
					module: "react-dom",
					entry:
						"https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js",
					global: "ReactDOM",
				},
			],
		}),
	],
	optimization: {
		splitChunks: {
			minSize: 0,
			cacheGroups: {
				commons: {
					name: "commons",
					chunks: "all",
					minChunks: 2,
				},
			},
		},
	},
};

module.exports = merge(baseConfig, prodConfig);
