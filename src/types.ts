import {ArtistProfileEndpoint} from './artistprofile/artistprofile.types';
import {LookupEndpoint} from './lookup/lookup.types';
import {ResearchEndpoint} from './research/research.types';

export enum Endpoint {
  LOOKUP = 'lookup.cgi',
  ARTISTPROFILE = 'artistprofile.cgi',
  RESEARCH = 'research.cgi',
}

export type EndpointPR<P, R> = {params: P; response: R};

export type Endpoints = {
  [Endpoint.LOOKUP]: LookupEndpoint;
  [Endpoint.ARTISTPROFILE]: ArtistProfileEndpoint;
  [Endpoint.RESEARCH]: ResearchEndpoint;
};

export type ParamsOf<K extends keyof Endpoints> = Endpoints[K]['params'];
export type ResponseFrom<K extends keyof Endpoints> = Endpoints[K]['response'];
