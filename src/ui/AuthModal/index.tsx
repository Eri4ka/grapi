import { FC, ReactNode } from 'react';

import ModalWrapper from '@/ui/ModalWrapper';

import styles from './styles.module.scss';
import Heading from '../Heading';

type Props = {
  title: string;
  children: ReactNode;
};

const AuthModal: FC<Props> = ({ title, children }) => {
  return (
    <ModalWrapper>
      <div className={styles.container}>
        <Heading title={title} />
        {children}
      </div>
    </ModalWrapper>
  );
};

export default AuthModal;
