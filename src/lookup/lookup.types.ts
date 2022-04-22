import {EndpointPR} from '../types.js';

export interface LookupArtist {
  id: string;
  name: string;
  genres: string[];
}

export type LookupEndpoint = EndpointPR<
  {
    who: string;
    mode?: 'map';
  },
  LookupArtist
>;
