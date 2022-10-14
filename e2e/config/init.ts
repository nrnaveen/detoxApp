import { launchApp } from '../utils/TestToolbox';

// https://github.com/wix/Detox/pull/2009#issuecomment-649342823
beforeAll(async () => {
  await launchApp();
}, 600000);
