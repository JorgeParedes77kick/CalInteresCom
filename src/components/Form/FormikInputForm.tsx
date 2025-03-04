import classNames from 'classnames';
import React, { HTMLInputTypeAttribute, ReactNode } from 'react';
import { BlurEventHandlerType, ChangeEventHandlerType, FocusEventHandlerType } from 'types/events';

export interface FormikInputProps {
  name: string;
  label: ReactNode;
  type?: HTMLInputTypeAttribute;
  error?: string;
  className?: string;
  placeholder?: string;
  autoComplete?: 'off' | 'on';
  defaultValue?: string;
  onFocus?: FocusEventHandlerType;
  onChange?: ChangeEventHandlerType;
  onBlur?: BlurEventHandlerType;
  value?: string | number;
}

export const FormikInputForm: React.FC<FormikInputProps> = ({
  name,
  label,
  type = 'text',
  error,
  className,
  ...props
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className={classNames('form-control', className, { 'is-invalid': error })}
        {...props}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};
