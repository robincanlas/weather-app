import * as React from 'react';
import * as style from './style.css';
import { RootState } from 'app/stores';
import { connect } from 'react-redux';
import { Country } from 'app/models';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { CountryActions } from 'app/stores/country/actions';

export namespace _SearchResults {
  export interface Props {
    countries?: Country.Model[];
    isLoading?: boolean;

    toggleMobileSearch: () => void;
    countryActions?: CountryActions;
  }
}

export const _SearchResults: React.FC<_SearchResults.Props> = ({
  countries = [],
  isLoading = false, 

  toggleMobileSearch = () => { return null; },
  countryActions = CountryActions,
 }) => {
  // const [showList, setShowList] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   console.log(countries, '########## search');
  // }, [countries]);

  const select = (country: Country.Model) => {
    countryActions.clearCountries();
    countryActions.selectCountry(country);
    toggleMobileSearch();
  };

  const getList = (): JSX.Element => {
    let opacity: number = 1;
    return (
      <>
        <ul className={style['search-ul']}>
          {countries.map(country => ( 
            <li onClick={() => select(country)} key={country.latitude} style={{'opacity': opacity -= .07}}>
              <div>
                <span>{country.name}</span>
                <span>{country.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const getLoading = () => {
    return (
      <>
        <div className={style['loading-container']}>
          <div className={style['lds-ripple']}>
            <div />
            <div />
          </div>
        </div>
      </>
    );
  };

  if (isLoading) {
    return getLoading();
  }

  if (countries.length === 0) {
    return null;
  }

  return getList();
};

const mapStateToProps = (state: RootState): Pick<_SearchResults.Props, 'countries' | 'isLoading'> => {
  return {
    countries: state.country.countries,
    isLoading: state.country.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<_SearchResults.Props, 'countryActions'> => ({
  countryActions: bindActionCreators(omit(CountryActions, 'Type'), dispatch)
});

export const SearchResults: React.FC<_SearchResults.Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SearchResults);