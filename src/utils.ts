export const $map = <T>(
  $root: cheerio.Cheerio,
  func: (element: cheerio.Element, index: number) => T
) => $toArray<T>($root.map((e, i) => func(i, e)));

export const $each = (
  $root: cheerio.Cheerio,
  func: (element: cheerio.Element, index: number) => unknown
) => $root.each((e, i) => func(i, e));

export const $toArray = <T>($root: cheerio.Cheerio) =>
  $root.toArray() as unknown as T[];

export const extractID: (url: string | URL | URLSearchParams) => string = (
  url: string | URL | URLSearchParams
) =>
  (url instanceof URLSearchParams
    ? url
    : url instanceof URL
    ? url.searchParams
    : url.startsWith('http')
    ? new URL(url).searchParams
    : new URLSearchParams(url.split('?').pop())
  ).get('id')!;

export const $extractInt = ($note: cheerio.Cheerio) =>
  parseInt($note.text().split(' ')[0].replace(',', ''));

export const $extractArray = ($note: cheerio.Cheerio) =>
  $note.text().split(', ');

export const $$$ = ($: cheerio.Root) => ($$: cheerio.Cheerio) => $map($$, $);
