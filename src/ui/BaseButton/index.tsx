import cl from 'classnames';
import { FC, ReactNode, ButtonHTMLAttributes } from 'react';

import { Loader } from '@/ui/Loader';

import styles from './styles.module.scss';

export enum ButtonVariant {
  primary = 'button_primary',
  secondary = 'button_secondary',
  flat = 'button_flat',
}

type Props = {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton: FC<Props> = ({ className, children, isLoading, ...props }) => {
  return (
    <button className={cl(styles.button, className)} {...props}>
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default BaseButton;
