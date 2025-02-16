/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Determina si todos los elementos en el conjunto de datos son verdaderos.
 * @param {...any[]} data - El conjunto de datos para verificar.
 * @returns {boolean} Retorna true si todos los elementos son verdaderos, de lo contrario retorna false.
 */
export const truthty = (...data: any[]): boolean => {
  if (data.length === 0) return false;
  const values = data.map((d) => {
    if (d === undefined || d === null || (!d && d !== 0)) return false;
    if (Array.isArray(d)) return d.length !== 0;
    if (typeof d === 'object' && Object.keys(d).length === 0) return false;
    return true;
  });
  return !values.includes(false);
};
/**
 * Verifica si el conjunto de datos está vacío o no es válido.
 * @param {any} data - El conjunto de datos para verificar.
 * @returns {boolean} Retorna true si el conjunto de datos está vacío o no es válido, de lo contrario retorna false.
 */
export const isEmpty = (data: any): boolean => {
  return typeof data === 'undefined' || !truthty(data) || data === '';
};

/**
 * Determina si el objeto es un objeto real (no un array ni un objeto vacío).
 * @param {any} data - El objeto para verificar.
 * @returns {boolean} Retorna true si el objeto es un objeto real, de lo contrario retorna false.
 */
export const isObject = (data: any): boolean => {
  return data !== null && typeof data === 'object';
};
