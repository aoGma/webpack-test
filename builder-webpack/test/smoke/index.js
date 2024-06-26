/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '10000ms',
});

process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
  // eslint-disable-next-line global-require
  const prodConfig = require('../../lib/webpack.prod.js');
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.log(err);
      process.exit(2);
    }
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
      }),
    );

    console.log('webpack build success, begin run test.');
    mocha.addFile(path.join(__dirname, './html-test.js'));
    mocha.addFile(path.join(__dirname, './css-js-test.js'));
    mocha.run();
  });
});
