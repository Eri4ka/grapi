import { FC, ReactNode } from 'react';

import ModalWrapper from '@/ui/ModalWrapper';

import styles from './styles.module.scss';
import Heading from '../Heading';

type Props = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
};

const AuthModal: FC<Props> = ({ isOpen, title, children }) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <div className={styles.container}>
        <Heading title={title} />
        {children}
      </div>
    </ModalWrapper>
  );
};

export default AuthModal;
