import axios, { AxiosError } from 'axios';

import { API_URL } from './constants';

const api = axios.create({
  baseURL: API_URL,
});

export const request = async (url: string, method = 'GET', body?: object) => {
  try {
    const response = await api({ url, method, data: body });
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error;
  }
};
