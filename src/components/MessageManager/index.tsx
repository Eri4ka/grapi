import { FC, useState, ReactNode, createContext } from 'react';

import { TMessage } from '@/apptypes/message';

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
  const [companionPhone, setCompanionPhone] = useState('');
  const [messageData, setMessageData] = useState<TMessage[]>([]);

  // Handlers
  const hanldleAddCompanionPhone = (phone: string) => setCompanionPhone(phone);

  const handleAddMessageData = ({ idMessage, message, time, outer = false }: TMessage) => {
    setMessageData((prev) => [...prev, { idMessage, message, time, outer }]);
  };

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
