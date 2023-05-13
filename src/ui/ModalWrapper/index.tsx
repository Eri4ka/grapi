import { FC, ReactNode } from 'react';

import Portal from '@/ui/Portal';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  children: ReactNode;
};

const ModalWrapper: FC<Props> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.wrapper}>{children}</div>
    </Portal>
  );
};

export default ModalWrapper;
