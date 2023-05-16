import { TStateInstance } from '@/apptypes/auth';

/* STATE INSTANCE */
export type TStateInstanceResponse = {
  stateInstance: TStateInstance;
};

/* QR */
type TQr = 'qrCode' | 'error' | 'alreadyLogged';

export type TQrResponse = {
  type: TQr;
  message: string;
};

/* LOGOUT */
export type TLogoutResponse = {
  isLogout: boolean;
};

/* SET SETTINGS */

export type TSetSettingsResponse = {
  saveSettings: boolean;
};
