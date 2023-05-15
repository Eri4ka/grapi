import { FC, useState, FormEvent } from 'react';

import AuthModal from '@/ui/AuthModal';
import BaseButton from '@/ui/BaseButton';
import TextField from '@/ui/TextField';

import { SUBMIT_BUTTON_TEXT, TITLE_TEXT, VALIDATION_FAILED_TEXT } from './constants';
import { validatePhoneNumber } from './helpers';
import styles from './styles.module.scss';

type Props = {
  onAddPhone: (phone: string) => void;
};

const GetPhoneForm: FC<Props> = ({ onAddPhone }) => {
  // Vars
  const [phoneValue, setPhoneValue] = useState('');
  const [errorText, setErrorText] = useState('');

  // Handlers
  const hanldeChangePhoneValue = (_: string, value: string) => setPhoneValue(value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorText('');

    const isValidPhoneNumber = validatePhoneNumber(phoneValue);

    if (isValidPhoneNumber) {
      onAddPhone(phoneValue);
    } else {
      setErrorText(VALIDATION_FAILED_TEXT);
    }
  };

  return (
    <AuthModal title={TITLE_TEXT}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          name='phone'
          label='Номер телефона'
          value={phoneValue}
          onChange={hanldeChangePhoneValue}
          placeholder='7XXXXXXXXXX'
        />
        <BaseButton type='submit' disabled={!phoneValue}>
          {SUBMIT_BUTTON_TEXT}
        </BaseButton>
        {errorText && <span className={styles.formError}>{errorText}</span>}
      </form>
    </AuthModal>
  );
};

export default GetPhoneForm;
