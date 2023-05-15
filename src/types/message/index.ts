export type TIdMessage = string;

export type TChatId = string;

export type TSideMessage = 'incoming' | 'outgoing';

export type TMessageType = 'textMessage';

export type TMessage = {
  idMessage: TIdMessage;
  message: string;
  time: string;
  outer?: boolean;
};
