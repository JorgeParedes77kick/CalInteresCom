/* eslint-disable @typescript-eslint/no-explicit-any */
/*
Paso a paso del flujo del componente CurrencyInput:
1. Se inicializan tres estados:
   - `displayValue`: almacena el valor formateado cuando el input no está en edición.
   - `editDisplayValue`: almacena el valor formateado con separadores de miles cuando el input está en edición.
   - `isEditing`: determina si el input está en estado de edición.

2. Cuando el input gana el foco (`onFocus`):
   - `editDisplayValue` se actualiza con el valor formateado para edición.
   - `isEditing` se establece en `true`.

3. Cuando el usuario escribe en el input:
   - Se convierte el valor ingresado a un número sin formato.
   - Se actualiza `editDisplayValue` con el valor ingresado con separadores de miles.
   - Se pasa el valor numérico puro al formulario.

4. Cuando el input pierde el foco (`onBlur`):
   - `isEditing` se establece en `false`, por lo que se muestra el valor formateado como moneda.
*/

import classNames from 'classnames';
import { CustomInputProps } from 'components/Form/InputForm';
import { CurrencyCode } from 'constants/currencies';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { BlurEventType, ChangeEventType, EventHandlerType, FocusEventType } from 'types/events';
import { formatAmount, parseAmount } from 'utilities/amount.utility';
import { formatCustom } from 'utilities/format.utility';

interface CurrentInputProps<T extends Record<string, any>> extends CustomInputProps<T> {
  minDigits?: number;
  maxDigits?: number;
  nDigits?: number;
  currency?: CurrencyCode;
  symbol?: string;
}

export const CurrencyInput = <T extends Record<string, any>>({
  name,
  control,
  label,
  type = 'text',
  error,
  autoComplete,
  className,
  currency,
  symbol,
  ...props
}: CurrentInputProps<T>) => {
  const [editDisplayValue, setEditDisplayValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEvent = useCallback((e: any, eHandler?: EventHandlerType) => {
    if (eHandler) eHandler(e);
  }, []);

  /**
   * Formatea un número como moneda.
   */
  const formatCurrency = useCallback(
    (value: number) => {
      if (!value && value !== 0) return '';
      return formatAmount(value, 0, 9, { currency, symbol });
    },
    [currency, symbol],
  );

  /**
   * Formatea un número para edición con separadores de miles.
   */
  const formatEditingValue = useCallback((value: number) => {
    if (!value && value !== 0) return '';
    return new Intl.NumberFormat('es-CL', {
      style: 'decimal',
    }).format(value);
  }, []);

  /**
   * Convierte un valor formateado a número puro.
   */
  const parseCurrency = useCallback((formattedValue: string) => {
    if (formattedValue === '') return '' as unknown as number;
    const value = parseAmount(formattedValue);
    return value;
  }, []);

  const handleFocus = (e: FocusEventType, value: number) => {
    setIsEditing(true);
    setEditDisplayValue(formatEditingValue(value));
    handleEvent(e, props.onFocus);
  };

  const handleBlur = (e: BlurEventType) => {
    setIsEditing(false);
    handleEvent(e, props.onBlur);
  };

  const handleChange = (e: ChangeEventType, onChange: (value: number) => void) => {
    const {
      // nativeEvent: { inputType },
      target: { value },
    } = e;
    const regex = /[0-9,.-]/;
    if (regex.test(value) || value === '') {
      const numericValue = parseCurrency(value);
      const [entera, decimal] = value.split(',');
      let localValue = entera.replace(/\./g, '');
      localValue = formatCustom(localValue, `.###`);
      if (typeof decimal === 'string') localValue = `${localValue},${decimal.replace(/\D/g, '')}`;
      setEditDisplayValue(localValue);
      onChange(numericValue);
      handleEvent(e, props.onChange);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={classNames('form-control', className, { 'is-invalid': error })}
            autoComplete={autoComplete}
            value={isEditing ? editDisplayValue : formatCurrency(value)}
            onFocus={(e) => handleFocus(e, value)}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e, onChange)}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};
