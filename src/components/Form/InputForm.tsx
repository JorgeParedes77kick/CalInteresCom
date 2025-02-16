/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { Control, Controller, FieldError, Path } from 'react-hook-form';

interface CustomInputProps<T extends Record<string, any>> {
  // children: ReactNode;
  name: Path<T>;
  control: Control<T>;
  label: ReactNode;
  type?: HTMLInputTypeAttribute;
  error?: FieldError;
}
export const InputForm = <T extends Record<string, any>>({
  name,
  control,
  label,
  type = 'string',
  error,
}: CustomInputProps<T>) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={classNames('form-control', { 'is-invalid': error })}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};
