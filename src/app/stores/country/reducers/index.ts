import { handleActions } from 'redux-actions';
import { CountryActions } from './../actions';
import { Country } from 'app/models';
import { CountryState, initialState } from '../state';
import update from 'immutability-helper';

export const countryReducer = handleActions<CountryState, Country.Model[] & Country.Model>(
  {
    [CountryActions.Type.GET_COUNTRIES_REQUEST]: (state, action) => {
      return update(state, {
        countries: { $set: [] },
        isLoading: { $set: true }
      });
    },
    [CountryActions.Type.GET_COUNTRIES_SUCCESS]: (state, action) => {
      // GET 10 results only
      return update(state, {
        countries: { $set: action.payload.slice(0, 9) },
        isLoading: { $set: false }
      });
    },
    [CountryActions.Type.GET_COUNTRIES_FAILURE]: (state, action) => {
      return update(state, {
        isLoading: { $set: false }
      });
    },
    [CountryActions.Type.CLEAR_COUNTRIES]: (state, action) => {
      return update(state, {
        countries: { $set: [] }
      });
    },
    [CountryActions.Type.SELECT_COUNTRY]: (state, action) => {
      return update(state, {
        country: { $set: action.payload }
      });
    }
  },
  initialState
);
