const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-dev',
  JWT_SECRET: 'thisIsASecret',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-test',
};

const prodConfig = {
  MONGO_URL: 'mongodb://admin:admin@ds251518.mlab.com:51518/likerss',
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: 'thisIsASecret',
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
