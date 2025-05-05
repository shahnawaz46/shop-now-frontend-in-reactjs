import { IAddressDetails } from '../types/interfaces/user.interface';
import { addressFormLabel } from '../components/Profile/Address';

type TRequiredFields = keyof typeof addressFormLabel;

export const checkAddressFields = (userAddress: IAddressDetails) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { landmark, alternatePhone, _id, ...rest } = userAddress;

  for (const [key, value] of Object.entries(rest)) {
    const typedKey = key as TRequiredFields;

    // console.log(key);
    if (!value) {
      return {
        error: true,
        errorMsg: addressFormLabel[typedKey] + ' required',
      };
    }
  }

  return { error: false, data: { ...rest, _id } };
};
