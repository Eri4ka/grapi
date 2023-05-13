import { AxiosError } from 'axios';
import { FC, useState, FormEvent, useContext, useEffect } from 'react';
import useSWR from 'swr';

import { UserService } from '@/api/services/UserService';
import { TInstanceData } from '@/apptypes/auth';
import { AuthContext } from '@/components/AuthManager';
import AuthModal from '@/ui/AuthModal';
import BaseButton from '@/ui/BaseButton';
import TextField from '@/ui/TextField';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
};

const GetQrForm: FC<Props> = ({ isOpen }) => {
  const { idInstance, apiTokenInstance } = useContext(AuthContext);
  const [qrData, setQrData] = useState('');
  // const { data, error } = useSWR(UserService.getQr(idInstance, apiTokenInstance));

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const data = await UserService.getQr(idInstance, apiTokenInstance);

        if (data.type === 'qrCode') {
          setQrData(data.message);
        }
      } catch (e) {
        const error = e as AxiosError;
      }
    };

    fetchQr();
    const timer = setInterval(() => fetchQr(), 20000);

    return () => {
      clearInterval(timer);
    };

    // fetchQr();
  }, [apiTokenInstance, idInstance]);

  return (
    <AuthModal title='Отсканируйте Qr-код' isOpen={isOpen}>
      <img src={`data:image/jpeg;base64,${qrData}`} alt='qr-code' />
    </AuthModal>
  );
};

export default GetQrForm;
