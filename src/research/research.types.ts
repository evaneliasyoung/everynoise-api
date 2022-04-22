import {EndpointPR} from '../types.js';

export type ResearchMode =
  | 'name'
  | 'genre'
  | 'label'
  | 'playlist'
  | 'radio'
  | 'user'
  | 'album'
  | 'track';

export type MatchLevel = 'exact' | 'close' | 'partial' | 'other';

export interface ResearchMatch {
  id: string;
  name: string;
  art?: string;
  followers?: number;
  genres?: string[];
}

export type ResearchEndpoint = EndpointPR<
  {
    mode: ResearchMode;
    name: string;
  },
  Record<MatchLevel, ResearchMatch[]>
>;
