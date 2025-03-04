import { CSSProperties, ReactNode } from 'react';

import classNames from 'classnames';
import './Card.scss';

interface CardProps {
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Card = ({ header, children, footer, className, style }: CardProps) => {
  return (
    <div className={classNames('card', className)} style={style}>
      {header && <div className="card-header">{header}</div>}
      {children && <div className="card-content">{children}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
