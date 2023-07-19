const { existsSync } = require('fs');
const { resolve } = require('path');
const { env, webpackConfig } = require('shakapacker');

const envSpecificConfig = () => {
  const path = resolve(__dirname, `${env.nodeEnv}.js`);
  if (existsSync(path)) {
    console.log(`Loading ENV specific webpack configuration file ${path}`);
    return require(path);
  } else {
    return webpackConfig;
  }
};

module.exports = envSpecificConfig();