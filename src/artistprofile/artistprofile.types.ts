import {EndpointPR} from '../types.js';

export interface SimilarArtist {
  id: string;
  name: string;
  art: string;
  followers: number;
  genres: string[];
}

export interface Artist extends SimilarArtist {
  albums: Appearance[];
  singles: Appearance[];
  appearances: Appearance[];
  compilations: Appearance[];
  tracks: number;
  similar: SimilarArtist[];
}

export interface Appearance {
  art: string;
  name: string;
}

export type ArtistProfileEndpoint = EndpointPR<
  {
    id: string;
  },
  Artist
>;
