import cl from 'classnames';
import { FC, ReactNode, ButtonHTMLAttributes } from 'react';

import { Loader, LoaderVariant } from '@/ui/Loader';

import styles from './styles.module.scss';

export enum ButtonVariant {
  primary = 'button_primary',
  secondary = 'button_secondary',
}

type Props = {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton: FC<Props> = ({ className, children, isLoading, variant = ButtonVariant.primary, ...props }) => {
  const loaderClass = variant === ButtonVariant.primary ? LoaderVariant.primary : LoaderVariant.secondary;

  return (
    <button className={cl(styles.button, styles[variant], className)} {...props}>
      {isLoading ? <Loader variant={loaderClass} /> : children}
    </button>
  );
};

export default BaseButton;
