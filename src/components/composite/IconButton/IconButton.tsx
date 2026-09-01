import React from 'react';
import { Icon, Button } from '../../base';
import type { IconName, ButtonProps } from '../../base';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: IconName;
  iconSize?: 'sm' | 'md' | 'lg';
  label?: string;
  ariaLabel?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconSize = 'md',
  label,
  ariaLabel,
  variant = 'ghost',
  size = 'md',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      aria-label={ariaLabel || label}
      {...props}
    >
      <Icon name={icon} size={iconSize} aria={ariaLabel || label} />
      {label && <span className="ml-2">{label}</span>}
    </Button>
  );
};

export default IconButton;
