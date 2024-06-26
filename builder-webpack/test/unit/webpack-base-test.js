const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base');
  // eslint-disable-next-line no-console
  console.log(baseConfig);
  it('entry', () => {
    assert.equal(baseConfig.entry.index, 'C:/Users/ao/Desktop/webpack-test/builder-webpack/test/smoke/template/src/index/index.js');
    assert.equal(baseConfig.entry.search, 'C:/Users/ao/Desktop/webpack-test/builder-webpack/test/smoke/template/src/search/index.js');
  });
});
