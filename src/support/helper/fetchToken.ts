import path from 'path';

export const fetchToken = async () => {
  interface StorageStateDataType {
    origins: [
      {
        localStorage: [
          {
            name: string;
            value: string;
          }
        ];
      }
    ];
  }

  const storageStatePath = path.resolve(
    __dirname,
    '../../../storage-state/storageState.json'
  );

  const storageStateData: StorageStateDataType = require(storageStatePath);

  // Extract the authorization values which is in string format
  const dataAsString = (
    storageStateData.origins.flatMap((value) => value.localStorage) || []
  ).find((value) => value.name === 'auth')?.value as string;

  // Parse the data from its stringified format.
  const data = JSON.parse(dataAsString);

  return data;
};
