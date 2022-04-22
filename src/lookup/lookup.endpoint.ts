import * as cheerio from 'cheerio';

import {api} from '../enao.js';
import {Endpoint, ResponseFrom} from '../types.js';
import {$map, extractID} from '../utils.js';

export const lookup = async (who: string, mode?: 'map') => {
  const res = await api(Endpoint.LOOKUP, {who, mode});
  const $ = cheerio.load(res.data);

  if ($('div').children().length === 0) return undefined;

  const $genres = $('a[href^="engenremap"]');
  const $profile = $('a[href^="artist"]');

  return {
    id: extractID($profile.attr('href')!),
    name: who,
    genres: $map($genres, e => $(e).text()),
  } as ResponseFrom<Endpoint.LOOKUP>;
};
