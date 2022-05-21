import axios from 'axios';
import {apikey, baseUrl} from '../../api.json';

export const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {apikey: apikey},
});
