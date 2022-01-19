import secrets from 'app/secrets';
import thunk from 'redux-thunk';
import { countryReducer } from './country/reducers';
import { CountryState } from './country/state';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middlewares';
import { ReduxCompatibleReducer } from 'redux-actions';
import { Country } from 'app/models';

export interface RootState {
  country: CountryState;
  router?: any;
}

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(logger, thunk);

  if (secrets.app.environment !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const rootReducer = combineReducers<RootState>({
    country: countryReducer as ReduxCompatibleReducer<CountryState, Country.Model[]>
  });

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
    RootState
  >;

  if (module.hot) {
    module.hot.accept('app/stores', () => {
      const nextReducer = require('app/stores');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export * from './country/reducers';
