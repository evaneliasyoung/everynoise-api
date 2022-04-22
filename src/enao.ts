import axios from 'axios';

import {Endpoint, ParamsOf} from './types.js';

export const URL_BASE = 'https://everynoise.com/';

export const api = <E extends Endpoint>(
  endpoint: E,
  params: ParamsOf<E>,
  timeout = 2500
) => axios.get<string>(`${URL_BASE}${endpoint}`, {params, timeout});

export {artistprofile} from './artistprofile/artistprofile.endpoint.js';
export {lookup} from './lookup/lookup.endpoint.js';
export {research} from './research/research.endpoint.js';
