import { Country } from 'app/models';

export const initialState: CountryState = {
  countries: [],
  country: null,
  isLoading: false
};

for (let index = 0; index < 10; index++) {
  // initialState.countries.push(
  //   {
  //     'latitude': 9.866642,
  //     'longitude': 126.043018,
  //     'type': 'venue',
  //     'name': 'Siargao Island',
  //     'number': 0,
  //     'postal_code': '',
  //     'street': '',
  //     'confidence': 1,
  //     'region': 'Surigao del Norte',
  //     'region_code': 'ST',
  //     'county': 'Pilar',
  //     'locality': '',
  //     'administrative_area': '',
  //     'neighbourhood': '',
  //     'country': 'Philippines',
  //     'country_code': 'PHL',
  //     'continent': 'Asia',
  //     'label': 'Siargao Island, ST, Philippines'},
  // );
}

export type CountryState = {
  countries: Country.Model[];
  country: Country.Model | null;
  isLoading: boolean;
};