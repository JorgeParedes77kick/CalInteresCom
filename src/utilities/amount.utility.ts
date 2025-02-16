import { CurrencyCode } from 'constants/currencies';

export const formatAmount = (
  amount: number | string,
  currency: CurrencyCode = CurrencyCode.CLP,
  minFractionDigits?: number,
  maxFractionDigits?: number,
): string => {
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  } else if (typeof amount !== 'number') {
    throw new Error('Invalid amount type');
  }
  if (isNaN(amount)) {
    throw new Error('Invalid amount');
  }
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  }).format(amount);
};

// Nueva función para convertir una cadena de texto con formato de moneda a un número
export const parseAmount = (formattedAmount: string | number): number => {
  if (typeof formattedAmount === 'number') return formattedAmount;
  if (typeof formattedAmount !== 'string') throw new Error('Invalid formatted amount');

  // Elimina el símbolo de moneda y otros caracteres no numéricos
  const numericString = formattedAmount
    .replace(/\./g, '')
    .replace(/,/g, '.')
    .replace(/[^\d.-]/g, '');

  const amount = parseFloat(numericString);

  if (isNaN(amount)) {
    throw new Error('Invalid formatted amount');
  }

  return amount;
};
