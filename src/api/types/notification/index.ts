import { TStateInstance } from '@/apptypes/auth';

type TWebhook = 'stateInstanceChanged' | 'incomingMessageReceived' | 'outgoingMessageReceived';

type TBodyNotyStateInstance = {
  typeWebhook: TWebhook;
  stateInstance: TStateInstance;
};

type TBodyNotyMessage = {
  typeWebhook: TWebhook;
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
  };
  messageData: {
    typeMessage: string;
    textMessageData: {
      textMessage: string;
    };
  };
};

export type TNotyResponse = {
  body: TBodyNotyStateInstance & TBodyNotyMessage;
  receiptId: number;
};

export type TTransformedNotyResponse = {
  receiptId: TNotyResponse['receiptId'];
  typeWebhook: TWebhook;
  idMessage: TBodyNotyMessage['idMessage'];
  senderPhone: TBodyNotyMessage['senderData']['chatId'];
  typeMessage: TBodyNotyMessage['messageData']['typeMessage'];
  textMessage: TBodyNotyMessage['messageData']['textMessageData']['textMessage'];
  time: TBodyNotyMessage['timestamp'];
  authState: TBodyNotyStateInstance['stateInstance'];
} | null;

export type TDeleteNotyPesponse = {
  result: boolean;
};
