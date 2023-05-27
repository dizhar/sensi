import {request} from '@playwright/test';
import {fetchToken} from '../fetchToken';

interface ModalDevice {
  deviceID?: string;
  modalID?: string;
}

interface AuthType {
  token: string;
  global_admin: boolean;
  org_admin: boolean;
  client: string;
  expiry: string;
  uid: string;
  id: string;
  access: Array<string>;
  name: string;
  tenant: {type: string; name: string; display_name: string; id: string};
}

export const removeModalDevice = async ({deviceID, modalID}: ModalDevice) => {
  try {
    if (deviceID && modalID) {
      const auth: AuthType = await fetchToken();
      const req = await request.newContext();
      const response = await req.delete(
        `https://hub.xyte.io/ui/partner/device_models/${modalID}/supported_commands/${deviceID}`,
        {
          headers: {
            Accept: '*/*',
            'Accept-Language': 'en-US',
            Connection: 'keep-alive',
            Origin: 'https://partners.xyte.io',
            Referer: 'https://partners.xyte.io/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.35 Safari/537.36',
            'access-token': auth.token,
            client: auth.client,
            'content-type': 'application/json',
            expiry: auth.expiry.toString(),
            tenant: auth.tenant.id,
            'tenant-type': auth.tenant.type,
            'token-type': 'Bearer',
            uid: auth.uid,
          },
        }
      );
    }
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error:', error.message);
    }
  }
};
