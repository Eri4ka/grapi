import { useState, useContext, useEffect } from 'react';

import { UserService } from '@/api/services/UserService';
import { AuthContext } from '@/components/AuthManager';
import AuthModal from '@/ui/AuthModal';
import BaseButton from '@/ui/BaseButton';
import { Loader, LoaderVariant } from '@/ui/Loader';

import { BACK_BUTTON_TEXT, POLLING_TIMEOUT, TITLE_TEXT } from './constants';
import styles from './styles.module.scss';

const GetQrForm = () => {
  // Vars
  const { idInstance, apiTokenInstance, handleLogout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [qrData, setQrData] = useState('');

  // Effects
  useEffect(() => {
    const isInstanceExists = idInstance && apiTokenInstance;

    if (isInstanceExists) {
      const fetchQrData = async () => {
        setIsLoading(true);
        const data = await UserService.getQr(idInstance, apiTokenInstance);

        if (data.type === 'qrCode') {
          setIsLoading(false);
          setQrData(data.message);
        }
      };

      fetchQrData();
      const timer = setInterval(() => fetchQrData(), POLLING_TIMEOUT);

      return () => {
        clearInterval(timer);
      };
    }
  }, [apiTokenInstance, idInstance]);

  return (
    <AuthModal title={TITLE_TEXT}>
      <div className={styles.wrapper}>
        <div className={styles.qr}>
          {isLoading ? (
            <Loader variant={LoaderVariant.secondary} />
          ) : (
            <img src={`data:image/jpeg;base64,${qrData}`} alt='qr-code' />
          )}
        </div>
        <BaseButton onClick={handleLogout}>{BACK_BUTTON_TEXT}</BaseButton>
      </div>
    </AuthModal>
  );
};

export default GetQrForm;
