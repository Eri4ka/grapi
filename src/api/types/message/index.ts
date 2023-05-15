import { TChatId, TIdMessage, TMessage, TMessageType, TSideMessage } from '@/apptypes/message';

/* SEND MESSAGE */
export type TSendMessageRequest = {
  chatId: TChatId;
  message: string;
};

export type TSendMessagePesponse = {
  idMessage: TIdMessage;
};

/* GET CHAT HISTORY */
export type TGetChatHisoryRequest = {
  chatId: TChatId;
  count: number;
};

export type TGetChatHisoryMessage = {
  type: TSideMessage;
  timestamp: number;
  idMessage: TIdMessage;
  typeMessage: TMessageType;
  chatId: TChatId;
  textMessage: string;
};

export type TTransformedGetChatHisoryResponse = TMessage[];
