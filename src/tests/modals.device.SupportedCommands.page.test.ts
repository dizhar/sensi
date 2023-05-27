import test from '../fixtures/fixtures';
import {navigationByPageName} from '../support/navigation';
import {PageNames} from '../support/types/enums';
import {
  validateAddingCommand,
  validateAddingRebootCommandFails,
} from '../support/validate';
import {removeModalDevice} from '../support/helper/apis/removeModalDevice';

test.describe('Modals -> Device -> Supported Commands Page', () => {
  let obj: {deviceID: string; modalID: string};
  test.beforeEach(async ({xyte}) => {
    await navigationByPageName({
      xyte,
      pageName: PageNames.ModelsSupportedCommands,
    });
  });

  test('validate adding a command works for tesla 3 ', async ({xyte}) => {
    const device = 'tesla 3';
    const friendlyName = 'Autopilot';
    const description =
      'The Tesla Model 3 comes equipped with advanced driver-assistance features';
    const nameSentToDevice = 'AutopilotControl';

    obj = await validateAddingCommand({
      xyte,
      device,
      friendlyName,
      description,
      nameSentToDevice,
    });
  });

  test('validate the rejection of "rebot" as a command', async ({xyte}) => {
    const device = 'tesla 3';
    const friendlyName = 'restart the tesla modal 3';
    const description = 'restart the tesla';
    const nameSentToDevice = 'reboot';
    await validateAddingRebootCommandFails({
      xyte,
      device,
      friendlyName,
      description,
      nameSentToDevice,
    });
  });

  test.afterAll(async () => {
    await removeModalDevice({deviceID: obj?.deviceID, modalID: obj?.modalID});
  });
});
