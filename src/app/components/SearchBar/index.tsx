import * as React from 'react';
import { RootState } from 'app/stores';
import { CountryActions } from 'app/stores/country/actions';
import { omit } from 'app/utils';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useInput } from '..';
import { Country } from 'app/models';
// import * as style from './style.css';

export namespace _SearchBar {
  export interface Props {
    countries?: Country.Model[];

    countryActions?: CountryActions;
  }
}

export const _SearchBar: React.FC<_SearchBar.Props> = ({
  countries = [],

  countryActions = CountryActions
 }) => {
  const [searchValue, searchInput] = useInput({ type: 'text' });

  React.useEffect(() => {
    console.log(searchValue, '########## search');
  }, [searchValue]);

  const search = () => {
    countryActions.getCountries(searchValue);
  };

  return (
    <>
      {searchInput}
      <button onClick={search}>SEARCH</button>
    </>
  );
};

const mapStateToProps = (state: RootState): Pick<_SearchBar.Props, 'countries'> => {
  return {
    countries: state.country.countries,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<_SearchBar.Props, 'countryActions'> => ({
  countryActions: bindActionCreators(omit(CountryActions, 'Type'), dispatch)
});

export const SearchBar: React.FC<_SearchBar.Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SearchBar);