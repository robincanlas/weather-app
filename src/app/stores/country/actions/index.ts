import * as _ from 'lodash';
import { AnyAction } from 'redux';
import { createAction } from 'redux-actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Country } from 'app/models';
import { CountryResource } from 'app/services';

type Thunk = ThunkAction<Promise<void>, {}, {}, AnyAction>;

export namespace CountryActions {
  export enum Type {
    GET_COUNTRIES_REQUEST = 'GET_COUNTRIES_REQUEST',
    GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS',
    GET_COUNTRIES_FAILURE = 'GET_COUNTRIES_FAILURE',
  }

  export const getCountries = (name: string): Thunk => {
    const request = createAction(Type.GET_COUNTRIES_REQUEST);
    const success = createAction<Country.Model[]>(Type.GET_COUNTRIES_SUCCESS);
    const failure = createAction<string>(Type.GET_COUNTRIES_FAILURE);

    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      dispatch(request());
      return CountryResource.getCountries({ name: name }).then(
        (countries: Country.Model[]) => {
          dispatch(success(countries));
        },
        (error: string) => {
          dispatch(failure(error));
        }
      );
    };
  };
}

export type CountryActions = Omit<typeof CountryActions, 'Type'>;
