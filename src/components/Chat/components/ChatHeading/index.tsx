import { useContext } from 'react';

import { UserService } from '@/api/services/UserService';
import { AuthContext } from '@/components/AuthManager';
import { MessageContext } from '@/components/MessageManager';
import BaseButton from '@/ui/BaseButton';

import styles from './styles.module.scss';

const ChatHeading = () => {
  const { idInstance, apiTokenInstance, handleLogout } = useContext(AuthContext);
  const { companionPhone } = useContext(MessageContext);

  const onLogout = async () => {
    try {
      const response = await UserService.logout(idInstance, apiTokenInstance);

      if (response.isLogout) {
        handleLogout();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contact}>{companionPhone}</div>
      <BaseButton onClick={onLogout}>Выйти</BaseButton>
    </div>
  );
};

export default ChatHeading;
