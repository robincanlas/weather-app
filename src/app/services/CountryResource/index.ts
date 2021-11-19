import api from 'app/lib/api';
import { ResourceFetch } from 'app/types/Api';

const baseUrl: string = 'https://restcountries.com/v2/name/';
// const baseUrl: string = 'http://localhost:9000/timezones';

const { GET } = api;

export interface CountryResource {
	getCountries: ResourceFetch<any>;
}

export const CountryResource: CountryResource = {
	getCountries: GET(baseUrl + ':name', { authenticated: false })
};