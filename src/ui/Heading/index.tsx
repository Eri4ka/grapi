import { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  title: string;
};

const Heading: FC<Props> = ({ title }) => {
  return <h1 className={styles.heading}>{title}</h1>;
};

export default Heading;
