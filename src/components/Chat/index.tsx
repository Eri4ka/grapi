import { useContext } from 'react';

import { MessageContext } from '@/components/MessageManager';
import ChatModal from '@/ui/СhatModal';

import ChatArea from './components/ChatArea';
import ChatForm from './components/ChatForm';
import ChatHeading from './components/ChatHeading';
import GetPhoneForm from './components/GetPhoneForm';
import styles from './styles.module.scss';

const Chat = () => {
  // Vars
  const { companionPhone, hanldleAddCompanionPhone } = useContext(MessageContext);

  if (!companionPhone) {
    return <GetPhoneForm onAddPhone={hanldleAddCompanionPhone} />;
  }

  return (
    <ChatModal>
      <div className={styles.wrapper}>
        <ChatHeading />
        <ChatArea />
        <ChatForm />
      </div>
    </ChatModal>
  );
};

export default Chat;
