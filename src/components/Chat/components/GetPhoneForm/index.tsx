import { AxiosError } from 'axios';
import { FC, useState, FormEvent, useContext, useEffect } from 'react';
import useSWR from 'swr';

import { UserService } from '@/api/services/UserService';
import { TInstanceData } from '@/apptypes/auth';
import { AuthContext } from '@/components/AuthManager';
import AuthModal from '@/ui/AuthModal';
import BaseButton from '@/ui/BaseButton';
import { Loader, LoaderVariant } from '@/ui/Loader';
import TextField from '@/ui/TextField';

import styles from './styles.module.scss';

type Props = {
  onAddPhone: (phone: string) => void;
};

const GetPhoneForm: FC<Props> = ({ onAddPhone }) => {
  const [phoneValue, setPhoneValue] = useState('');
  const [errorText, setErrorText] = useState('');

  const isDisabled = !phoneValue;

  const hanldeChangePhoneValue = (_: string, value: string) => setPhoneValue(value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorText('');

    if (/^[7]\d{10}$/g.test(phoneValue)) {
      onAddPhone(phoneValue);
    } else {
      setErrorText('Невалидный номер телефона');
    }
  };

  return (
    <AuthModal title='Введите номер телефона собеседника'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          name='phone'
          label='Номер телефона'
          value={phoneValue}
          onChange={hanldeChangePhoneValue}
          placeholder='7XXXXXXXXXX'
        />
        <BaseButton type='submit' disabled={isDisabled}>
          Подтвердить
        </BaseButton>
        {errorText && <span className={styles.formError}>{errorText}</span>}
      </form>
    </AuthModal>
  );
};

export default GetPhoneForm;
