import { SEND_MESSAGE_ENDPOINT } from '../constants';
import { request } from '../request';
import { TSendMessagePesponse, TSendMessageRequest } from '../types/message';

export const MessageService = {
  sendMessage: async function (
    idInstance: string,
    apiTokenInstance: string,
    data: TSendMessageRequest,
  ): Promise<TSendMessagePesponse> {
    const response = await request(
      `waInstance${idInstance}/${SEND_MESSAGE_ENDPOINT}/${apiTokenInstance}`,
      'POST',
      data,
    );
    return response;
  },
};
