import { GET_NOTIFICATION_ENDPOINT, DELETE_NOTIFICATION_ENDPOINT } from '../constants';
import { request } from '../request';

export const NotificationService = {
  getNotification: async function (idInstance: string, apiTokenInstance: string) {
    const response = await request(`waInstance${idInstance}/${GET_NOTIFICATION_ENDPOINT}/${apiTokenInstance}`);
    return response;
  },

  deleteNotification: async function (idInstance: string, apiTokenInstance: string, receiptId: string) {
    const response = await request(
      `waInstance${idInstance}/${DELETE_NOTIFICATION_ENDPOINT}/${apiTokenInstance}/${receiptId}`,
      'DELETE',
    );
    return response;
  },
};
