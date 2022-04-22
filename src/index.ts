import {artistprofile} from './artistprofile/artistprofile.endpoint.js';
import {lookup} from './lookup/lookup.endpoint.js';
import {research} from './research/research.endpoint.js';

const artist = await lookup('Hot Mulligan');
console.log(artist);

const deeper = await artistprofile('3WrFJ7ztbogyGnTHbHJFl2');
console.log(deeper);

const resear = await research('name', 'CORPSE');
console.log(resear);
