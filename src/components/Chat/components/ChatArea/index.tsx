import { useContext } from 'react';

import { MessageContext } from '@/components/MessageManager';

import Message from './components/Message';
import styles from './styles.module.scss';

const ChatArea = () => {
  const { messageData } = useContext(MessageContext);

  return (
    <div className={styles.area}>
      {messageData.map((message) => (
        <Message key={message.idMessage} data={message} />
      ))}
    </div>
  );
};

export default ChatArea;
