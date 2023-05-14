import { ChangeEvent, FormEvent, useContext, useState } from 'react';

import { MessageService } from '@/api/services/MessageService';
import { ReactComponent as SendIc } from '@/assets/images/common/send.svg';
import { AuthContext } from '@/components/AuthManager';
import { MessageContext } from '@/components/MessageManager';
import IconWrapper, { IconSize } from '@/ui/IconWrapper';

import styles from './styles.module.scss';

const ChatForm = () => {
  const { idInstance, apiTokenInstance } = useContext(AuthContext);
  const { companionPhone, handleAddMessageData } = useContext(MessageContext);
  const [messageValue, setMessageValue] = useState('');

  const isDisabled = !messageValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { chatId: `${companionPhone}@c.us`, message: messageValue };

    try {
      const response = await MessageService.sendMessage(idInstance, apiTokenInstance, data);

      handleAddMessageData({ idMessage: response.idMessage, message: messageValue, outer: true });
    } catch (e) {
      console.log(e);
    }
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
        <button className={styles.formButton} disabled={isDisabled}>
          <IconWrapper icon={<SendIc />} size={IconSize.m} />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
