import { handleActions } from 'redux-actions';
import { CountryActions } from './../actions';
import { Country } from 'app/models';
import { CountryState, initialState } from '../state';
import update from 'immutability-helper';

export const countryReducer = handleActions<CountryState, Country.Model[]>(
  {
    [CountryActions.Type.GET_COUNTRIES_REQUEST]: (state, action) => {
      return state;
    },
    [CountryActions.Type.GET_COUNTRIES_SUCCESS]: (state, action) => {
      return update(state, {
        countries: { $set: action.payload }
      });
    },
    [CountryActions.Type.GET_COUNTRIES_FAILURE]: (state, action) => {
      return state;
    },
  },
  initialState
);
