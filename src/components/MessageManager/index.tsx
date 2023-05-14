import { FC, useState, ReactNode, createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { UserService } from '@/api/services/UserService';
import { TAuthStatus, TInstanceData } from '@/apptypes/auth';
import { TMessage } from '@/apptypes/message';

type TMessageContext = {
  companionPhone: string;
  hanldleAddCompanionPhone: (phone: string) => void;
  messageData: TMessage[];
  handleAddMessageData: ({ idMessage, message, outer }: TMessage) => void;
};

export const MessageContext = createContext<TMessageContext>({} as TMessageContext);

type Props = {
  children: ReactNode;
};

const MessageManager: FC<Props> = ({ children }) => {
  const [companionPhone, setCompanionPhone] = useState('');
  const [messageData, setMessageData] = useState<TMessage[]>([]);

  const hanldleAddCompanionPhone = (phone: string) => setCompanionPhone(phone);

  const handleAddMessageData = ({ idMessage, message, outer = false }: TMessage) => {
    setMessageData((prev) => [...prev, { idMessage, message, outer }]);
  };

  console.log(messageData);

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
