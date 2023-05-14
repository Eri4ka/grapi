import { FC, ReactNode } from 'react';

import Portal from '@/ui/Portal';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const ModalWrapper: FC<Props> = ({ children }) => {
  return (
    <Portal>
      <div className={styles.wrapper}>{children}</div>
    </Portal>
  );
};

export default ModalWrapper;
