const {
  DetoxCircusEnvironment,
  SpecReporter,
  WorkerAssignReporter,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('detox/runners/jest-circus');

class CustomDetoxEnvironment extends DetoxCircusEnvironment {
  constructor(config, context) {
    super(config, context);

    // Can be safely removed, if you are content with the default value (=300000ms)
    this.initTimeout = 300000;

    // This takes care of generating status logs on a per-spec basis. By default, Jest only reports at file-level.
    // This is strictly optional.
    this.registerListeners({
      SpecReporter,
      WorkerAssignReporter,
    });
  }
}

// eslint-disable-next-line no-undef
module.exports = CustomDetoxEnvironment;
