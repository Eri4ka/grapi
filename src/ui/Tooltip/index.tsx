import { FC, ReactNode } from 'react';
import { Tooltip as Tip } from 'react-tooltip';

import styles from './styles.module.scss';

type Props = {
  id: string;
  content: string;
  children: ReactNode;
};

const Tooltip: FC<Props> = ({ id, content, children }) => {
  return (
    <>
      <a id={id}>{children}</a>
      <Tip anchorSelect={`#${id}`} content={content} className={styles.tooltip} />
    </>
  );
};

export default Tooltip;
