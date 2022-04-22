import * as cheerio from 'cheerio';

import {api} from '../enao.js';
import {Endpoint, ResponseFrom} from '../types.js';
import {$$$, $extractArray, $extractInt, $map, extractID} from '../utils.js';
import {MatchLevel, ResearchMatch, ResearchMode} from './research.types.js';

export const research = async (mode: ResearchMode, name: string) => {
  const res = await api(Endpoint.RESEARCH, {mode, name});
  const $ = cheerio.load(res.data);
  const $$ = $$$($);

  const collectMatch = ($root: cheerio.Cheerio) => ({
    id: extractID($root.find('a[href^="artistprofile"]').attr('href')!),
    name: $root.find('a[href^="artistprofile"]').text(),
    art: $root.find('img').attr('src'),
    followers: $extractInt($root.find('.note').first()),
    genres: $extractArray($root.find('.note').last()),
  });

  const $box = $('.box');
  const $count = $('div a[href^="#"]');
  const counts = $$($count).map($extractInt);

  console.log(
    Object.fromEntries(
      (['exact', 'close', 'partial', 'other'] as const).map(
        (key: MatchLevel, i: number) => {
          const keyCount = counts[i];
          console.log(`keys[${i}] = ${key} (${keyCount})`);
          if (keyCount === 0) return [key, []];

          const start =
            i === 0 ? 0 : counts.slice(0, i).reduce((acc, e) => acc + e, 0);

          return [
            key,
            $$($box.slice(start, start + keyCount)).map<ResearchMatch>(
              collectMatch
            ),
          ];
        }
      )
    )
  );

  const matches: ResearchMatch[][] = [[], [], [], []];

  $map($('.box'), $)
    .map<ResearchMatch>(collectMatch)
    .forEach(match => {
      for (let i = 0; i < counts.length; ++i) {
        if (matches[i].length < counts[i]) {
          matches[i].push(match);
          break;
        }
      }
    });

  return {
    exact: matches[0],
    close: matches[1],
    partial: matches[2],
    other: matches[3],
  } as ResponseFrom<Endpoint.RESEARCH>;
};
