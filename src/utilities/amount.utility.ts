import { CurrencyCode } from 'constants/currencies';
interface FormatAmountOptions extends Omit<Intl.NumberFormatOptions, 'currency'> {
  currency?: CurrencyCode;
  symbol?: string;
}

export const formatAmount = (
  amount: number | string,
  minimumFractionDigits?: number,
  maximumFractionDigits?: number,
  options?: FormatAmountOptions,
): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) {
    throw new Error('Invalid amount');
  }

  const { currency: initialCurrency = CurrencyCode.CLP, symbol } = options || {};
  let currency = initialCurrency;

  if (symbol != undefined) currency = CurrencyCode.CLP;

  const formattedAmount = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    minimumFractionDigits,
    maximumFractionDigits,
    ...options,
    currency,
  }).format(numericAmount);

  return symbol != undefined ? formattedAmount.replace('$', symbol) : formattedAmount;
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
