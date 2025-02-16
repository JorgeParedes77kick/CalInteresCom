/**
 * Valida un RUT chileno.
 *
 * @param rut - El RUT a validar.
 * @returns `true` si el RUT es válido, `false` en caso contrario.
 */
export const validateRut = (rut: string): boolean => {
  // Eliminar puntos y guion del RUT
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
  if (!/^[0-9]+[0-9kK]{1}$/.test(cleanRut)) return false;

  const number = cleanRut.slice(0, -1);
  const verifier = cleanRut.slice(-1);
  let sum = 0;
  let multiplier = 2;

  for (let i = number.length - 1; i >= 0; i--) {
    sum += parseInt(number[i], 10) * multiplier;
    multiplier = multiplier < 7 ? multiplier + 1 : 2;
  }

  const dv = 11 - (sum % 11);
  const dvString = dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString();

  return dvString.toLowerCase() === verifier.toLowerCase();
};

/**
 * Formatea un número o string como RUT chileno.
 *
 * @param rut - El número o string a formatear.
 * @returns El RUT formateado.
 */
export const formatRut = (rut: string | number): string => {
  const rutString = typeof rut === 'number' ? rut.toString() : rut;
  const cleanRut = rutString.replace(/\./g, '').replace(/-/g, '');
  const verifier = cleanRut.slice(-1);
  const number = cleanRut.slice(0, -1);

  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + verifier;
};

/**
 * Elimina el formato de un RUT chileno.
 *
 * @param formattedRut - El RUT formateado.
 * @returns El RUT sin formato.
 */
export const unformatRut = (formattedRut: string): string => {
  return formattedRut.replace(/\./g, '').replace(/-/g, '').padStart(10, '0');
};
