import { ChangeEvent, FormEvent, useContext, useState } from 'react';

import { MessageService } from '@/api/services/MessageService';
import { ReactComponent as SendIc } from '@/assets/images/common/send.svg';
import { AuthContext } from '@/context/AuthManager';
import { MessageContext } from '@/context/MessageManager';
import { getCurrentTime } from '@/helpers/message';
import IconWrapper, { IconSize } from '@/ui/IconWrapper';

import styles from './styles.module.scss';

const ChatForm = () => {
  // Vars
  const { idInstance, apiTokenInstance } = useContext(AuthContext);
  const { companionPhone, handleAddMessageData } = useContext(MessageContext);
  const [messageValue, setMessageValue] = useState('');

  // Handlers
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bodyData = { chatId: `${companionPhone}@c.us`, message: messageValue };

    const response = await MessageService.sendMessage(idInstance, apiTokenInstance, bodyData);

    const currentTime = getCurrentTime();
    handleAddMessageData({ idMessage: response.idMessage, message: messageValue, time: currentTime, outer: true });
    setMessageValue('');
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          className={styles.formField}
          placeholder='Введите сообщение'
          value={messageValue}
          onChange={handleChange}
        />
        <button className={styles.formButton} disabled={!messageValue}>
          <IconWrapper icon={<SendIc />} size={IconSize.m} />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
