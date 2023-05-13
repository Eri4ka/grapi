import cl from 'classnames';
import { FC, ChangeEvent, InputHTMLAttributes } from 'react';

import { ReactComponent as HelpIc } from '@/assets/images/common/help.svg';
import IconWrapper, { IconSize } from '@/ui/IconWrapper';
import Tooltip from '@/ui/Tooltip';

import styles from './styles.module.scss';

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: (field: string, value: string) => void;
  className?: string;
  tooltipText?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const TextField: FC<Props> = ({ name, label, value, onChange, className, tooltipText }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <div className={cl(styles.wrapper, className)}>
      <div className={styles.label}>
        <label className={styles.labelText} htmlFor={name}>
          {label}
        </label>
        {tooltipText && (
          <Tooltip id={name} content={tooltipText}>
            <IconWrapper icon={<HelpIc />} size={IconSize.s} />
          </Tooltip>
        )}
      </div>
      <input className={styles.input} name={name} type='text' value={value} onChange={handleChange} />
    </div>
  );
};

export default TextField;
