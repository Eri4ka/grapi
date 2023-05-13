import { GET_QR_ENDPOINT, GET_STATE_INSTANCE_ENDPOINT } from '../constants';
import { request } from '../request';
import { TQrResponse, TStateInstanceResponse } from '../types';

export const UserService = {
  getStateInstance: async function (idInstance: string, apiTokenInstance: string): Promise<TStateInstanceResponse> {
    const response = await request(`waInstance${idInstance}/${GET_STATE_INSTANCE_ENDPOINT}/${apiTokenInstance}`);
    return response;
  },

  getQr: async function (idInstance: string, apiTokenInstance: string): Promise<TQrResponse> {
    const response = await request(`waInstance${idInstance}/${GET_QR_ENDPOINT}/${apiTokenInstance}`);
    return response;
  },
};
