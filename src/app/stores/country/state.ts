import { Country } from 'app/models';

export const initialState: CountryState = {
  countries: []
};

export type CountryState = {
  countries: Country.Model[];
};
