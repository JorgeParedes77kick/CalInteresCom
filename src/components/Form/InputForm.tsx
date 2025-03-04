/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { Control, Controller, FieldError, Path } from 'react-hook-form';
import {
  BlurEventHandlerType,
  ChangeEventHandlerType,
  EventHandlerType,
  FocusEventHandlerType,
} from 'types/types';

export interface CustomInputProps<T extends Record<string, any>> {
  name: Path<T>;
  control: Control<T>;
  label: ReactNode;
  type?: HTMLInputTypeAttribute;
  error?: FieldError;
  autoComplete?: 'off' | 'on';
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onFocus?: FocusEventHandlerType;
  onChange?: ChangeEventHandlerType;
  onBlur?: BlurEventHandlerType;
}

export const InputForm = <T extends Record<string, any>>({
  name,
  control,
  label,
  type = 'text',
  error,
  autoComplete,
  className,
  defaultValue = '',
  ...props
}: CustomInputProps<T>) => {
  const handleEvent = (e: any, eHandler?: EventHandlerType) => {
    if (eHandler) eHandler(e);
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as any} // Evita errores en RHF
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={classNames('form-control', className, { 'is-invalid': error })}
            autoComplete={autoComplete}
            {...props}
            onChange={(e: any) => {
              field.onChange(e);
              handleEvent(e, props.onChange);
            }}
            onBlur={(e: any) => {
              field.onBlur();
              handleEvent(e, props.onBlur);
            }}
            onFocus={(e: any) => {
              handleEvent(e, props.onFocus);
            }}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};
