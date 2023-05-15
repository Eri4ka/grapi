import { getCurrentTime } from '@/helpers/message';

import { SEND_MESSAGE_ENDPOINT, GET_CHAT_HISTORY } from '../constants';
import { request } from '../request';
import {
  TGetChatHisoryMessage,
  TGetChatHisoryRequest,
  TSendMessagePesponse,
  TSendMessageRequest,
  TTransformedGetChatHisoryResponse,
} from '../types/message';

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

  getChatHistory: async function (
    idInstance: string,
    apiTokenInstance: string,
    data: TGetChatHisoryRequest,
  ): Promise<TTransformedGetChatHisoryResponse> {
    const response: TGetChatHisoryMessage[] = await request(
      `waInstance${idInstance}/${GET_CHAT_HISTORY}/${apiTokenInstance}`,
      'POST',
      data,
    );

    const textMessagesResponse = response.filter((message) => message.typeMessage === 'textMessage');

    const transformedResponse = textMessagesResponse
      .map((message) => {
        return {
          idMessage: message.idMessage,
          message: message.textMessage,
          time: getCurrentTime(message.timestamp),
          outer: message.type === 'outgoing',
        };
      })
      .reverse();

    return transformedResponse;
  },
};
