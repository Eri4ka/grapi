import { AxiosError } from 'axios';
import { FC, useState, FormEvent, useContext } from 'react';

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

const initialState = { idInstance: '', apiTokenInstance: '' };

const GetInstanceForm: FC<Props> = ({ isOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [instanceValue, setInstanceValues] = useState<TInstanceData>(initialState);
  const { setAuthStatus, handleSetInstanceData } = useContext(AuthContext);

  const isDisabled = !instanceValue.idInstance || !instanceValue.apiTokenInstance;

  const handleSetInstanceValues = (field: string, value: string) => {
    setInstanceValues({ ...instanceValue, [field]: value });
  };

  const handeSubmut = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setErrorText('');
      const data = await UserService.getStateInstance(instanceValue.idInstance, instanceValue.apiTokenInstance);

      setIsLoading(false);
      setInstanceValues(initialState);

      setAuthStatus(data.stateInstance);
      handleSetInstanceData(instanceValue);
    } catch (e) {
      const error = e as AxiosError;
      setAuthStatus('error');

      setIsLoading(false);
      setErrorText(error.message);
    }
  };

  return (
    <AuthModal title='Введите параметры доступа к Аккануту' isOpen={isOpen}>
      <form className={styles.form} onSubmit={handeSubmut}>
        <TextField
          name='idInstance'
          label='IdInstance'
          tooltipText='Уникальный номер аккаунта'
          value={instanceValue.idInstance}
          onChange={handleSetInstanceValues}
        />
        <TextField
          name='apiTokenInstance'
          label='ApiTokenInstance'
          tooltipText='Ключ доступа аккаунта'
          value={instanceValue.apiTokenInstance}
          onChange={handleSetInstanceValues}
        />
        <BaseButton type='submit' disabled={isDisabled} isLoading={isLoading}>
          ОК
        </BaseButton>
        {errorText && <span className={styles.formError}>{errorText}</span>}
      </form>
    </AuthModal>
  );
};

export default GetInstanceForm;
