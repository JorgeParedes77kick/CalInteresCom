/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Crea un objeto proxy que devuelve un valor por defecto cuando se accede a una propiedad no existente.
 *
 * @param target - El objeto original.
 * @param defaultValue - El valor por defecto a devolver cuando la propiedad no existe.
 * @returns Un objeto proxy que devuelve el valor por defecto para propiedades no existentes.
 */
export const proxyWithDefault = <T extends { [index: string]: any }, K>(
  obj: T,
  defaultReturn: K,
) => {
  // Crear un proxy para el objeto original
  const element = new Proxy(obj, {
    // Interceptar accesos a propiedades
    get(target, prop: string | symbol) {
      // Si la propiedad existe en el objeto, devolver su valor
      // De lo contrario, devolver el valor por defecto
      return prop in target ? target[prop as keyof typeof target] : defaultReturn;
    },
  });
  // Retornar el objeto proxy, extendido con el tipo de valor por defecto
  return element as T & { [index: string]: K };
};
