import {Page, expect, test} from '@playwright/test';
interface validateAddingDuplicateCommandFailsType {
  xyte: Page;
  device: string;
  friendlyName: string;
  description: string;
  nameSentToDevice: string;
}

interface deviceModelsObjectType {
  id: string;
  active: true;
  name: string;
  friendly_name: string;
  description: string;
  with_file: Boolean;
  file_type: string;
  created_at: string;
  updated_at: string;
  custom_fields: null;
}
let deviceID: string;
export const validateAddingRebootCommandFails = async ({
  xyte,
  device,
  friendlyName,
  description,
  nameSentToDevice,
}: validateAddingDuplicateCommandFailsType) => {
  test.step(`click on ${device} link`, async () => {
    await xyte.getByRole('link', {name: new RegExp(device, 'i')}).click();
  });

  const modalID = await xyte
    .getByTestId(/^info-table-row-value-Model ID$/i)
    .innerText();

  await test.step('click on the supported commands tab', async () => {
    await xyte.getByRole('tab', {name: /^Supported Commands$/i}).click();
  });

  await test.step('click on the add command button', async () => {
    await xyte.getByRole('button', {name: /^Add Command$/i}).click();
  });

  await test.step(`type ${friendlyName} in the friendly name input field`, async () => {
    await xyte.getByLabel(/Friendly name/i).fill(friendlyName);
  });

  await test.step(`type ${description} in the description input field`, async () => {
    await xyte.getByLabel(/Description/).fill(description);
  });

  await test.step(`type ${nameSentToDevice} in the name sent to device input field`, async () => {
    await xyte.getByLabel(/Name sent to device/).fill(nameSentToDevice);
  });

  await test.step('click on create button', async () => {
    const [response] = await Promise.all([
      xyte.waitForResponse(
        (res) =>
          res.url() ===
          `https://hub.xyte.io/ui/partner/device_models/${modalID}/supported_commands`
      ),
      xyte.getByRole('button', {name: /Create/}).click(),
    ]);
    const message: {error: string} = await response.json();
    expect(message.error).toBe('Name has already been taken');
    // verify the red toaster  tag with the expected text is displayed
    expect(xyte.locator('.toastr').getByText(/Name has already been taken/i));
  });

  await expect(
    xyte.getByRole('dialog').getByText(/Name has already been taken/i)
  ).toBeVisible();
};
