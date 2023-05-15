import { GET_NOTIFICATION_ENDPOINT, DELETE_NOTIFICATION_ENDPOINT } from '../constants';
import { request } from '../request';
import { TNotyResponse, TDeleteNotyPesponse, TTransformedNotyResponse } from '../types/notification';

export const NotificationService = {
  getNotification: async function (idInstance: string, apiTokenInstance: string): Promise<TTransformedNotyResponse> {
    const response: TNotyResponse = await request(
      `waInstance${idInstance}/${GET_NOTIFICATION_ENDPOINT}/${apiTokenInstance}`,
    );

    if (response) {
      return {
        receiptId: response.receiptId,
        typeWebhook: response.body.typeWebhook,
        idMessage: response.body?.idMessage || '',
        senderPhone: response.body?.senderData?.chatId ? response.body.senderData.chatId.slice(0, -5) : '',
        typeMessage: response.body?.messageData?.typeMessage || '',
        textMessage: response.body?.messageData?.textMessageData?.textMessage || '',
        time: response.body?.timestamp,
        authState: response.body?.stateInstance || '',
      };
    }

    return null;
  },

  deleteNotification: async function (
    idInstance: string,
    apiTokenInstance: string,
    receiptId: number,
  ): Promise<TDeleteNotyPesponse> {
    const response = await request(
      `waInstance${idInstance}/${DELETE_NOTIFICATION_ENDPOINT}/${apiTokenInstance}/${receiptId}`,
      'DELETE',
    );
    return response;
  },
};
