import { AxiosError } from 'axios';
import { useState, FormEvent, useContext, useEffect } from 'react';
import useSWR from 'swr';

import { UserService } from '@/api/services/UserService';
import { TInstanceData } from '@/apptypes/auth';
import { AuthContext } from '@/components/AuthManager';
import AuthModal from '@/ui/AuthModal';
import BaseButton from '@/ui/BaseButton';
import { Loader, LoaderVariant } from '@/ui/Loader';
import TextField from '@/ui/TextField';

import styles from './styles.module.scss';

const GetQrForm = () => {
  const { idInstance, apiTokenInstance, setAuthStatus } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    const fetchQr = async () => {
      try {
        setIsLoading(true);
        const data = await UserService.getQr(idInstance, apiTokenInstance);

        if (data.type === 'qrCode') {
          setIsLoading(false);
          setQrData(data.message);
        }
      } catch (e) {
        setIsLoading(false);
        const error = e as AxiosError;
      }
    };

    fetchQr();
    const timer = setInterval(() => fetchQr(), 20000);

    return () => {
      clearInterval(timer);
    };
  }, [apiTokenInstance, idInstance]);

  return (
    <AuthModal title='Отсканируйте Qr-код'>
      <div className={styles.wrapper}>
        <div className={styles.qr}>
          {isLoading ? (
            <Loader variant={LoaderVariant.secondary} />
          ) : (
            <img src={`data:image/jpeg;base64,${qrData}`} alt='qr-code' />
          )}
        </div>
        <BaseButton onClick={() => setAuthStatus('')}>Назад</BaseButton>
      </div>
    </AuthModal>
  );
};

export default GetQrForm;
