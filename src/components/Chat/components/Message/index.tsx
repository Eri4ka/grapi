import cl from 'classnames';
import { FC } from 'react';

import { TMessage } from '@/apptypes/message';

import styles from './styles.module.scss';

type Props = {
  data: TMessage;
};

const Message: FC<Props> = ({ data }) => {
  return (
    <div className={cl(styles.container, { [styles.container_out]: data.outer })}>
      <div className={styles.message}>
        <div className={styles.messageContent}>{data.message}</div>
      </div>
    </div>
  );
};

export default Message;
