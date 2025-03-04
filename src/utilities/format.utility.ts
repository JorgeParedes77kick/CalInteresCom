import { types } from 'types/types';

export const formatCustom = <T extends types>(value: T, key: string) => {
  let valueString = '';
  if (typeof value === 'number' || typeof value === 'string') valueString = '' + value;
  else if (typeof value !== 'string') return value;
  let formattedValue = '';
  let valueIndex = valueString.length - 1;
  while (valueIndex >= 0) {
    // Recorremos el formatoString desde el final hacia el principio
    for (let i = key.length - 1; i >= 0; i--) {
      const formatChar = key[i];
      if (formatChar === '#' || formatChar === '0') {
        // Si el formato es '#', tomamos un dígito del valor o rellenamos con cero si no hay dígitos suficientes.
        if (valueIndex >= 0) {
          formattedValue = valueString[valueIndex] + formattedValue;
          valueIndex--;
        } else if (formatChar === '0') {
          formattedValue = '0' + formattedValue;
        }
      } else if (valueIndex >= 0) {
        // Si el formato no es '0' ni '#', simplemente agregamos el carácter del formato al resultado.
        formattedValue = formatChar + formattedValue;
      }
    }
  }
  return formattedValue;
};
