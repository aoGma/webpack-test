"use strict";

const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
		filename: "[name].js",
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /.js$/,
				use: "babel-loader",
			},
			{
				test: /.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /.less$/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /.(png|jpg|gif|jpeg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 102400,
						},
					},
				],
			},
			{
				test: /.(woff|woff2|eot|ttf|otf)$/,
				use: "file-loader",
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
	].concat(HtmlWebpackPlugins),
	devServer: {
		contentBase: "./dist",
		hot: true,
	},
	devtool: "source-map",
};
