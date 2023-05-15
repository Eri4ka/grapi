import { FC, ReactNode } from 'react';

import ModalWrapper from '@/ui/ModalWrapper';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const ChatModal: FC<Props> = ({ children }) => {
  return (
    <ModalWrapper>
      <div className={styles.container}>{children}</div>
    </ModalWrapper>
  );
};

export default ChatModal;
