const { existsSync } = require('fs');
const { resolve } = require('path');
const { env, generatewebpackConfig } = require('shakapacker');

const envSpecificConfig = () => {
  const path = resolve(__dirname, `${env.nodeEnv}.js`);
  if (existsSync(path)) {
    console.log(`Loading ENV specific webpack configuration file ${path}`);
    return require(path);
  } else {
    return generatewebpackConfig();
  }
};

module.exports = envSpecificConfig();
