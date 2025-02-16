/**
 * Inicializa una instancia de Axios con una URL base y configura interceptores de solicitud y respuesta.
 *
 * @file axios.service.ts
 */
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';
class AxiosService {
  private static instance: AxiosService;
  private axiosInstance: AxiosInstance;

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
    this.setupInterceptors();
  }

  public static getInstance(baseURL: string = BASE_URL): AxiosService {
    if (!AxiosService.instance) {
      AxiosService.instance = new AxiosService(baseURL);
    }
    return AxiosService.instance;
  }

  private setupInterceptors() {
    // Interceptor de solicitud: se ejecuta antes de que la solicitud sea enviada
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Obtiene el token del localStorage
        const token = localStorage.getItem('token');
        // Si hay un token, lo agrega al encabezado de Autorización
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // Registra la URL de la solicitud
        console.log(`Solicitud realizada a: ${config.url}`);
        return config;
      },
      (error) => {
        // Maneja errores de solicitud
        return Promise.reject(error);
      },
    );

    // Interceptor de respuesta: se ejecuta cuando se recibe una respuesta
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Registra los datos y el estado de la respuesta
        console.log(`Respuesta de: ${response.config.url}`, {
          data: response.data,
          status: response.status,
        });
        return response;
      },
      (error) => {
        // Maneja errores de respuesta
        if (error.response) {
          // Si hay una respuesta de error, registra la URL de la respuesta
          console.error(`Respuesta de error de: ${error.response.config.url}`);
        } else {
          // Si no hay respuesta, registra el mensaje de error
          console.error(`Error: ${error.message}`);
        }
        return Promise.reject(error);
      },
    );
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export default AxiosService;
