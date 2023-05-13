import { FC, ReactNode } from 'react';

import { ReactComponent as WaIc } from '@/assets/images/common/wa.svg';
import IconWrapper from '@/ui/IconWrapper';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <IconWrapper icon={<WaIc />} />
          <p className={styles.headerTitle}>WHATSAPP WEB</p>
        </div>
      </header>
      {children}
    </div>
  );
};

export default AppLayout;
