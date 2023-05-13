import { TStateInstanceResponse } from '@/api/types';

export type TInstanceData = {
  idInstance: string;
  apiTokenInstance: string;
};

export type TAuthStatus = TStateInstanceResponse['stateInstance'] | 'error';
