import { FC, useState, ReactNode, createContext, useEffect, useContext } from 'react';

import { MessageService } from '@/api/services/MessageService';
import { TMessage } from '@/apptypes/message';
import { AuthContext } from '@/components/AuthManager';

import { COUNT_HISTORY_MESSAGES } from './constants';

type TMessageContext = {
  companionPhone: string;
  hanldleAddCompanionPhone: (phone: string) => void;
  messageData: TMessage[];
  handleAddMessageData: ({ idMessage, message, time, outer }: TMessage) => void;
};

type Props = {
  children: ReactNode;
};

export const MessageContext = createContext<TMessageContext>({} as TMessageContext);

const MessageManager: FC<Props> = ({ children }) => {
  // Vars
  const { idInstance, apiTokenInstance, authStatus } = useContext(AuthContext);
  const [companionPhone, setCompanionPhone] = useState('');
  const [messageData, setMessageData] = useState<TMessage[]>([]);

  // Handlers
  const hanldleAddCompanionPhone = (phone: string) => setCompanionPhone(phone);

  const handleAddMessageData = ({ idMessage, message, time, outer = false }: TMessage) => {
    setMessageData((prev) => [...prev, { idMessage, message, time, outer }]);
  };

  // Effects
  useEffect(() => {
    const isChatExists = companionPhone && idInstance && apiTokenInstance;

    if (isChatExists) {
      const fetchChatHistory = async () => {
        const bodyData = { chatId: `${companionPhone}@c.us`, count: COUNT_HISTORY_MESSAGES };

        const response = await MessageService.getChatHistory(idInstance, apiTokenInstance, bodyData);
        setMessageData(response);
      };

      fetchChatHistory();
    }
  }, [apiTokenInstance, companionPhone, idInstance]);

  useEffect(() => {
    if (authStatus === 'notAuthorized') {
      setCompanionPhone('');
      setMessageData([]);
    }
  }, [authStatus]);

  return (
    <MessageContext.Provider
      value={{
        companionPhone,
        hanldleAddCompanionPhone,
        messageData,
        handleAddMessageData,
      }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageManager;
