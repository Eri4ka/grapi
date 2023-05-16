import { GET_QR_ENDPOINT, GET_STATE_INSTANCE_ENDPOINT, LOGOUT_ENDPOINT, SET_SETTINGS_ENDPOINT } from '../constants';
import { request } from '../request';
import { TQrResponse, TStateInstanceResponse, TLogoutResponse, TSetSettingsResponse } from '../types/user';

export const UserService = {
  setSettingsData: {
    markIncomingMessagesReaded: 'yes',
    outgoingMessageWebhook: 'yes',
    stateWebhook: 'yes',
    incomingWebhook: 'yes',
  },

  getStateInstance: async function (idInstance: string, apiTokenInstance: string): Promise<TStateInstanceResponse> {
    const response = await request(`waInstance${idInstance}/${GET_STATE_INSTANCE_ENDPOINT}/${apiTokenInstance}`);
    return response;
  },

  getQr: async function (idInstance: string, apiTokenInstance: string): Promise<TQrResponse> {
    const response = await request(`waInstance${idInstance}/${GET_QR_ENDPOINT}/${apiTokenInstance}`);
    return response;
  },

  logout: async function (idInstance: string, apiTokenInstance: string): Promise<TLogoutResponse> {
    const response = await request(`waInstance${idInstance}/${LOGOUT_ENDPOINT}/${apiTokenInstance}`);
    return response;
  },

  setSettings: async function (idInstance: string, apiTokenInstance: string): Promise<TSetSettingsResponse> {
    const response = await request(
      `waInstance${idInstance}/${SET_SETTINGS_ENDPOINT}/${apiTokenInstance}`,
      'POST',
      this.setSettingsData,
    );
    return response;
  },
};
