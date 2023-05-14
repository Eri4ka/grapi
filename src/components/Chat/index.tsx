import { AxiosError } from 'axios';
import { FC, useState, FormEvent, useContext, useEffect } from 'react';
import useSWR from 'swr';

import { UserService } from '@/api/services/UserService';
import { TInstanceData } from '@/apptypes/auth';
import { AuthContext } from '@/components/AuthManager';
import { MessageContext } from '@/components/MessageManager';
import AuthModal from '@/ui/AuthModal';
import BaseButton from '@/ui/BaseButton';
import { Loader, LoaderVariant } from '@/ui/Loader';
import TextField from '@/ui/TextField';
import ChatModal from '@/ui/СhatModal';

import ChatArea from './components/ChatArea';
import ChatForm from './components/ChatForm';
import GetPhoneForm from './components/GetPhoneForm';
import styles from './styles.module.scss';

const Chat = () => {
  const { companionPhone, hanldleAddCompanionPhone } = useContext(MessageContext);

  if (!companionPhone) {
    return <GetPhoneForm onAddPhone={hanldleAddCompanionPhone} />;
  }

  return (
    <ChatModal>
      <div className={styles.wrapper}>
        {companionPhone}
        <ChatArea />
        <ChatForm />
      </div>
    </ChatModal>
  );
};

export default Chat;
