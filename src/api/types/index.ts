export type TStateInstanceResponse = {
  stateInstance: 'notAuthorized' | 'authorized' | 'blocked' | 'sleepMode' | 'starting' | '';
};

export type TQrResponse = {
  type: 'qrCode' | 'error' | 'alreadyLogged';
  message: string;
};

export type TSendMessageRequest = {
  chatId: string;
  message: string;
};
