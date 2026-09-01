import React from 'react';
import { Icon, Text } from '../../base';
import type { IconName } from '../../base';

export interface ContactItemProps {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  isLink?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  label,
  value,
  href,
  isLink = false,
}) => {
  const content = (
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 pt-1">
        <Icon name={icon} size="md" />
      </div>
      <div className="flex-grow">
        <Text size="xs" weight="medium" color="muted" className="uppercase tracking-wider mb-1">
          {label}
        </Text>
        <Text size="md" weight="normal" color="default">
          {value}
        </Text>
      </div>
    </div>
  );

  if (isLink && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default ContactItem;
