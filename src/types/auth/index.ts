export type TInstanceData = {
  idInstance: string;
  apiTokenInstance: string;
};

export type TStateInstance = 'notAuthorized' | 'authorized' | 'blocked' | 'sleepMode' | 'starting' | '';

export type TAuthStatus = TStateInstance | 'error';
