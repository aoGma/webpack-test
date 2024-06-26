const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./webpack.base");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

const setMPA = () => {
	const entry = {};
	const HtmlWebpackPlugins = [];

	const entryFile = glob.sync(path.join(__dirname, "./src/*/index-server.js"));

	entryFile.map((v) => {
		const match = v.match(/src\/(.*)\/index-server.js/);
		const pageName = match && match[1];
		if (pageName) {
			entry[pageName] = v;
			HtmlWebpackPlugins.push(
				new HtmlWebpackPlugin({
					template: path.join(__dirname, `src/${pageName}/${pageName}.html`),
					filename: `${pageName}.html`,
					chunks: [pageName],
					inject: true,
					minify: {
						html5: true,
						collapseWhitespace: true,
						preserveLineBreaks: false,
						minifyCSS: true,
						minifyJS: true,
						removeComments: false,
					},
				})
			);
		}
	});

	return {
		entry,
		HtmlWebpackPlugins,
	};
};

const { entry, HtmlWebpackPlugins } = setMPA();

const prodConfig = {
	entry,
	mode: "production",
	module: {
		rules: [
			{
				test: /.(css|less)$/,
				use: ["ignore-loader"],
			},
		],
	},
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
	].concat(HtmlWebpackPlugins),
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
