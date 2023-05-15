import { TStateInstance } from '@/apptypes/auth';
import { TChatId, TIdMessage, TMessageType } from '@/apptypes/message';

/* GET NOTIFICATION */
type TWebhook = 'stateInstanceChanged' | 'incomingMessageReceived' | 'outgoingMessageReceived';

type TNotyStateBody = {
  typeWebhook: TWebhook;
  stateInstance: TStateInstance;
};

type TNotyMessageBody = {
  typeWebhook: TWebhook;
  timestamp: number;
  idMessage: TIdMessage;
  senderData: {
    chatId: TChatId;
  };
  messageData: {
    typeMessage: TMessageType;
    textMessageData: {
      textMessage: string;
    };
  };
};

export type TNotyResponse = {
  body: TNotyStateBody & TNotyMessageBody;
  receiptId: number;
};

export type TTransformedNotyResponse = {
  receiptId: TNotyResponse['receiptId'];
  typeWebhook: TWebhook;
  idMessage: TNotyMessageBody['idMessage'];
  senderPhone: TNotyMessageBody['senderData']['chatId'];
  typeMessage: TNotyMessageBody['messageData']['typeMessage'];
  textMessage: TNotyMessageBody['messageData']['textMessageData']['textMessage'];
  time: TNotyMessageBody['timestamp'];
  authState: TNotyStateBody['stateInstance'];
} | null;

/* DELETE NOTIFICATION */
export type TDeleteNotyPesponse = {
  result: boolean;
};
