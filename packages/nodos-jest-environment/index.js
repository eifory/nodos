const NodeEnvironment = require('jest-environment-node');
const { nodos } = require('@nodosjs/core');

class IntegrationEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.config = config;

    // this.global.openSession = async () => {
    //   app = nodos(this.config.rootDir);
    //   await app.start();
    //   return app;
    // };
  }

  async setup() {
    this.app = nodos(this.config.rootDir, { env: 'test' });
    await this.app.initApp();
    this.global.app = this.app;
  }

  async teardown() {
    if (this.app.isInitialized()) {
      await this.app.stop();
    }
  }
}

module.exports = IntegrationEnvironment;
