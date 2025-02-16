import { proxyWithDefault } from 'utilities/proxy.utility';

// Enum para los códigos de moneda
export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  JPY = 'JPY',
  GBP = 'GBP',
  AUD = 'AUD',
  CAD = 'CAD',
  CHF = 'CHF',
  CNY = 'CNY',
  SEK = 'SEK',
  NZD = 'NZD',
  CLP = 'CLP', // Peso chileno
}

// Objeto para los nombres completos de las monedas
const currencyNames: { [key in CurrencyCode]: string } = {
  [CurrencyCode.USD]: 'Dólar estadounidense',
  [CurrencyCode.EUR]: 'Euro',
  [CurrencyCode.JPY]: 'Yen japonés',
  [CurrencyCode.GBP]: 'Libra esterlina británica',
  [CurrencyCode.AUD]: 'Dólar australiano',
  [CurrencyCode.CAD]: 'Dólar canadiense',
  [CurrencyCode.CHF]: 'Franco suizo',
  [CurrencyCode.CNY]: 'Yuan chino',
  [CurrencyCode.SEK]: 'Corona sueca',
  [CurrencyCode.NZD]: 'Dólar neozelandés',
  [CurrencyCode.CLP]: 'Peso chileno',
};

// Crear un proxy para manejar accesos a códigos de moneda no existentes
export const CurrencyNames = proxyWithDefault(currencyNames, '');
