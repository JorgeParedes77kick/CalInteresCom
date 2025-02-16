/**
 * Guarda un valor en el Local Storage.
 * @param {string} key - La clave bajo la cual se almacenará el valor.
 * @param {string} value - El valor a almacenar.
 */
export const setLocalStorageItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

/**
 * Obtiene un valor del Local Storage.
 * @param {string} key - La clave del valor a obtener.
 * @returns {string | null} - El valor almacenado o null si no existe.
 */
export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

/**
 * Guarda un valor en el Session Storage.
 * @param {string} key - La clave bajo la cual se almacenará el valor.
 * @param {string} value - El valor a almacenar.
 */
export const setSessionStorageItem = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

/**
 * Obtiene un valor del Session Storage.
 * @param {string} key - La clave del valor a obtener.
 * @returns {string | null} - El valor almacenado o null si no existe.
 */
export const getSessionStorageItem = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

/**
 * Guarda una cookie.
 * @param {string} name - El nombre de la cookie.
 * @param {string} value - El valor de la cookie.
 * @param {number} minutes - El tiempo de expiración en minutos.
 */
export const setCookie = (name: string, value: string, minutes: number): void => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

/**
 * Obtiene una cookie.
 * @param {string} name - El nombre de la cookie a obtener.
 * @returns {string | null} - El valor de la cookie o null si no existe.
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Verifica si el Local Storage es soportado por el navegador.
 * @returns {boolean} - True si es soportado, false en caso contrario.
 */
export const isLocalStorageSupported = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Verifica si el Session Storage es soportado por el navegador.
 * @returns {boolean} - True si es soportado, false en caso contrario.
 */
export const isSessionStorageSupported = (): boolean => {
  try {
    const testKey = '__test__';
    sessionStorage.setItem(testKey, testKey);
    sessionStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Verifica si las cookies están habilitadas en el navegador.
 * @returns {boolean} - True si están habilitadas, false en caso contrario.
 */
export const isCookiesEnabled = (): boolean => {
  try {
    document.cookie = 'cookietest=1';
    const cookiesEnabled = document.cookie.indexOf('cookietest=') !== -1;
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return cookiesEnabled;
  } catch (e) {
    return false;
  }
};
