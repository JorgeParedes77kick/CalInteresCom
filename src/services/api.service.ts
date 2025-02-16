const BASE_URL = 'https://rickandmortyapi.com/api';

// import axios from 'axios';
import { UseApiCall } from 'hooks/useApi';
import AxiosService from 'services/axios.service';
import { loadAbort } from 'utilities/loadAbort.utility';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Character = any;

const axios = AxiosService.getInstance().getAxiosInstance();

export const getCharacter = (id: number): UseApiCall<Character> => {
  const controller = loadAbort();

  return {
    call: axios.get<Character>(`${BASE_URL}/character/${id}`, { signal: controller.signal }),
    controller,
  };
};

export const newCharacter = (character: Character): UseApiCall<null> => {
  const controller = loadAbort();

  return {
    call: axios.post<null>(`${BASE_URL}/characters`, character, { signal: controller.signal }),
    controller,
  };
};
