const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

const setMPA = () => {
	const entry = {};
	const HtmlWebpackPlugins = [];

	const entryFile = glob.sync(path.join(__dirname, "./src/*/index.js"));

	entryFile.map((v) => {
		const match = v.match(/src\/(.*)\/index.js/);
		const pageName = match && match[1];
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
	});

	return {
		entry,
		HtmlWebpackPlugins,
	};
};

const { entry, HtmlWebpackPlugins } = setMPA();

module.exports = {
	entry,
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name]_[chunkhash:8].js",
		publicPath: "./",
	},
	mode: "none",
	module: {
		rules: [
			{
				test: /.js$/,
				use: ["babel-loader", "eslint-loader"],
			},
			{
				test: /.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"less-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: () => {
								require("autoprefixer")({
									browsers: ["last 2 version", ">1%", "ios 4"],
								});
							},
						},
					},
					{
						loader: "px2rem-loader",
						options: {
							remUnit: 75,
							remPrecession: 8,
						},
					},
				],
			},
			{
				test: /.(png|jpg|gif|jpeg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name]_[hash:8].[ext]",
						},
					},
				],
			},
			{
				test: /.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[hash:8].[ext]",
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name]_[contenthash:8].css",
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require("cssnano"),
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CleanWebpackPlugin(),
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
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				test: /(react|react-dom)/,
	// 				name: "venders",
	// 				chunks: "all",
	// 			},
	// 		},
	// 	},
	// },
	// optimization: {
	// 	splitChunks: {
	// 		minSize: 0,
	// 		cacheGroups: {
	// 			commons: {
	// 				name: "commons",
	// 				chunks: "all",
	// 				minChunks: 2,
	// 			},
	// 		},
	// 	},
	// },
	devtool: "source-map",
};
