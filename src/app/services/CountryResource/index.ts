import api from 'app/lib/api';
import { Country } from 'app/models';
// import secrets from 'app/secrets';
import { ResourceFetch } from 'app/types/Api';

// const baseUrl: string = secrets.countryService || '';
const baseUrl: string = 'http://localhost:9001/';

const { GET } = api;

export interface CountryResource {
  // ResourceFetch<Response, Payload>
  getCountries: ResourceFetch<Country.Model[], PartialPick<Country.Model, 'name'>>;
}

export const CountryResource: CountryResource = {
  getCountries: GET(baseUrl + 'country/list/' + ':name', { authenticated: false })
};