import { TStateInstance } from '@/apptypes/auth';

type TQr = 'qrCode' | 'error' | 'alreadyLogged';

export type TStateInstanceResponse = {
  stateInstance: TStateInstance;
};

export type TQrResponse = {
  type: TQr;
  message: string;
};

export type TLogoutResponse = {
  isLogout: boolean;
};
