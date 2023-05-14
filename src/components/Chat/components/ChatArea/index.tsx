import { useContext } from 'react';

import { MessageContext } from '@/components/MessageManager';

import styles from './styles.module.scss';
import Message from '../Message';

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
