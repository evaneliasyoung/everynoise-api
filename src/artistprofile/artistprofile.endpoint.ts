import * as cheerio from 'cheerio';

import {Appearance, SimilarArtist} from './artistprofile.types.js';
import {api} from '../enao.js';
import {Endpoint, ResponseFrom} from '../types.js';
import {$$$, $extractArray, $extractInt} from '../utils.js';

export const artistprofile = async (id: string) => {
  const res = await api(Endpoint.ARTISTPROFILE, {id});
  const $ = cheerio.load(res.data);
  const $$ = $$$($);
  const $name = $('.title');
  const $art = $('.artistart');
  const $followers = $('.note').eq(1);
  const $genres = $('.genres').first();
  const $artist = $('div.genres + div').first();
  const $albums = $('.icons.album img');
  const $singles = $('.icons.single img');
  const $appearances = $('.icons.appears_on img');
  const $compilations = $('.icons.compilation img');
  const $tracks = $artist.find('.note').last();
  const $similar = $('.falbox');

  const collectAppearance = ($root: cheerio.Cheerio) =>
    $$($root).map<Appearance>(($el: cheerio.Cheerio) => ({
      art: $el.attr('src') ?? '[NONE]',
      name: $el.attr('title') ?? '[NONE]',
    }));
  const collectSimilarArtist = ($root: cheerio.Cheerio) =>
    $$($root).map<SimilarArtist>(($el: cheerio.Cheerio) => ({
      id: $el.find('.falname a').attr('href')!.substring(4)!,
      name: $el.find('.falname').text(),
      art: $el.find('.falart').attr('src')!,
      followers: $extractInt($el.find('.note')),
      genres: $extractArray($el.find('.genres')),
    }));

  return {
    id,
    name: $name.text().trim(),
    art: $art.attr('src'),
    followers: $extractInt($followers),
    genres: $extractArray($genres),
    albums: collectAppearance($albums),
    singles: collectAppearance($singles),
    appearances: collectAppearance($appearances),
    compilations: collectAppearance($compilations),
    tracks: $extractInt($tracks),
    similar: collectSimilarArtist($similar),
  } as ResponseFrom<Endpoint.ARTISTPROFILE>;
};
