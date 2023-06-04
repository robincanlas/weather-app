import api from 'app/lib/api';
import { Country } from 'app/models';
import secrets from 'app/secrets';
import { ResourceFetch } from 'app/types/Api';

const baseUrl: string = secrets.countryService || '';

const { GET } = api;

export interface CountryResource {
  // ResourceFetch<Response, Payload>
  getCountries: ResourceFetch<Country.Model[], PartialPick<Country.Model, 'name'>>;
}

export const CountryResource: CountryResource = {
  getCountries: GET(baseUrl + 'country/' + ':name', { authenticated: false })
};