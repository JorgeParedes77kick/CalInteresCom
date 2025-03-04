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

import { FormikInputForm, FormikInputProps } from 'components/Form/FormikInputForm';
import { CurrencyCode } from 'constants/currencies';
import { useCallback, useState } from 'react';
import { BlurEventType, ChangeEventType, EventHandlerType, FocusEventType } from 'types/events';
import { formatAmount, parseAmount } from 'utilities/amount.utility';
import { formatCustom } from 'utilities/format.utility';

interface FormikCurrencyInputProps extends FormikInputProps {
  minDigits?: number;
  maxDigits?: number;
  nDigits?: number;
  currency?: CurrencyCode;
  symbol?: string;
  // value?: number;
}

export const FormikCurrencyInput = ({
  currency,
  symbol,
  value,
  ...props
}: FormikCurrencyInputProps) => {
  const [editDisplayValue, setEditDisplayValue] = useState('');
  const [displayValue, setDisplayValue] = useState<number | string>('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEvent = useCallback(
    (e: any, eHandler?: EventHandlerType, numericValue?: number | string) => {
      const event = { ...e };
      event.target.value = numericValue;
      if (eHandler) eHandler(event);
    },
    [],
  );

  /**
   * Formatea un número como moneda.
   */
  const formatCurrency = useCallback(
    (value?: any) => {
      if (!value && value !== 0) return '';
      return formatAmount(Number(value), 0, 9, { currency, symbol });
    },
    [currency, symbol],
  );

  /**
   * Formatea un número para edición con separadores de miles.
   */
  const formatEditingValue = useCallback((value?: any) => {
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

  const handleFocus = (e: FocusEventType) => {
    setIsEditing(true);
    const formatValue = formatEditingValue(value);
    setEditDisplayValue(formatValue);
    handleEvent(e, props.onFocus, value);
  };

  const handleBlur = (e: BlurEventType) => {
    setIsEditing(false);
    handleEvent(e, props.onBlur, value);
  };

  const handleChange = (e: ChangeEventType) => {
    const {
      // nativeEvent: { inputType },
      target: { value },
    } = e;
    console.log(' value:', value);
    const regex = /^[0-9,.-]+$/;
    if (regex.test(value) || value === '') {
      const numericValue = parseCurrency(value);
      const [entera, decimal] = value.split(',');
      let localValue = entera.replace(/\./g, '');
      localValue = formatCustom(localValue, `.###`);
      if (typeof decimal === 'string') localValue = `${localValue},${decimal.replace(/\D/g, '')}`;
      setEditDisplayValue(localValue);
      console.log(' numericValue:', numericValue);
      handleEvent(e, props.onChange, numericValue);
    }
  };

  return (
    <FormikInputForm
      {...props}
      value={isEditing ? editDisplayValue : formatCurrency(value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
    // <div className="form-group">
    //   <label htmlFor={name}>{label}</label>
    //   <Controller
    //     name={name}
    //     control={control}
    //     render={({ field: { onChange, value, ...field } }) => (
    //       <input
    //         id={name}
    //         type={type}
    //         {...field}
    //         className={classNames('form-control', className, { 'is-invalid': error })}
    //         autoComplete={autoComplete}
    //         value={isEditing ? editDisplayValue : formatCurrency(value)}
    //         onFocus={(e) => handleFocus(e, value)}
    //         onBlur={handleBlur}
    //         onChange={(e) => handleChange(e, onChange)}
    //       />
    //     )}
    //   />
    //   {error && <p className="error">{error}</p>}
    // </div>
  );
};
