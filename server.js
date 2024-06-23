const express = require("express");
const webpack = require("webpack");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.dev.js");

const app = express();
const compiler = webpack(webpackConfig);

// 使用 webpack-dev-middleware 将编译后的资源挂载到 Express 服务器上
app.use(
	webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath, // 对应 webpack 配置中的 publicPath
	})
);

app.use(express.static(path.join(__dirname, "public")));

// 根路由返回 index.html
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 添加其他中间件和路由
// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

// 启动 Express 服务器
const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
