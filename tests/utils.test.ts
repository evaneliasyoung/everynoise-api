import {extractID} from '../src/utils';

describe('extractID', () => {
  const id = '1lKZzN2d4IqiEYxyECIEHI';
  const component = `artistprofile?id=${id}`;
  const url = `https://everynoise.com/${component}`;

  it('extracts the ID parameter from URLSearchParams', () => {
    expect(extractID(new URLSearchParams(`id=${id}`))).toBe(id);
  });
  it('extracts the ID parameter from a URL', () => {
    expect(extractID(new URL(url))).toBe(id);
  });
  it('extracts the ID parameter from a string of a URL', () => {
    expect(extractID(url)).toBe(id);
  });
  it('extracts the ID parameter from a string of a path and search', () => {
    expect(extractID(component)).toBe(id);
  });
});
