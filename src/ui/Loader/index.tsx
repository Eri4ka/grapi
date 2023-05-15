import cl from 'classnames';
import { FC } from 'react';

import styles from './styles.module.scss';

export enum LoaderVariant {
  primary = 'loader_primary',
  secondary = 'loader_secondary',
}

type Props = {
  variant?: LoaderVariant;
};

export const Loader: FC<Props> = ({ variant = LoaderVariant.primary }) => {
  return <span className={cl(styles.loader, styles[variant])} />;
};
