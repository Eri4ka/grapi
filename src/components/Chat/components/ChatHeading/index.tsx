import { useContext, useState } from 'react';

import { UserService } from '@/api/services/UserService';
import { AuthContext } from '@/context/AuthManager';
import { MessageContext } from '@/context/MessageManager';
import BaseButton, { ButtonVariant } from '@/ui/BaseButton';

import styles from './styles.module.scss';

const ChatHeading = () => {
  // Vars
  const { idInstance, apiTokenInstance } = useContext(AuthContext);
  const { companionPhone } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await UserService.logout(idInstance, apiTokenInstance);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contact}>{companionPhone}</div>
      <BaseButton variant={ButtonVariant.secondary} onClick={handleLogout} isLoading={isLoading}>
        Выйти
      </BaseButton>
    </div>
  );
};

export default ChatHeading;
