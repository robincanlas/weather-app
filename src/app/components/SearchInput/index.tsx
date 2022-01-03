import * as React from 'react';
import * as style from './style.css';
import { RootState } from 'app/stores';
import { CountryActions } from 'app/stores/country/actions';
import { omit } from 'app/utils';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useInput } from 'app/components';
import { Country } from 'app/models';

export namespace _SearchInput {
  export interface Props {
    countries?: Country.Model[];
    isLoading?: boolean;

    countryActions?: CountryActions;
    setFocus: (focus: boolean) => void;
  }
}

export const _SearchInput: React.FC<_SearchInput.Props> = ({
  countries = [],
  isLoading = false,

  countryActions = CountryActions,
  setFocus = () => { return; }
 }) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  
  const search = () => {
    if (inputValue === '') return;
    countryActions.getCountries(inputValue);
  };

  const enterKey = () => {
    search();
  };

  const [searchInput, searchValue, isFocus] = useInput({ 
    type: 'text', 
    className: style['search-input'], 
    placeHolder: 'Search for country or city',
    enterKey: enterKey });

  React.useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  React.useEffect(() => {
    setFocus(isFocus);
  }, [isFocus]);

  return (
    <>
      {searchInput}
      {isLoading ? null : <div onClick={search} className={style['magnifying-glass']} />}
    </>
  );
};

const mapStateToProps = (state: RootState): Pick<_SearchInput.Props, 'countries' | 'isLoading'> => {
  return {
    countries: state.country.countries,
    isLoading: state.country.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<_SearchInput.Props, 'countryActions'> => ({
  countryActions: bindActionCreators(omit(CountryActions, 'Type'), dispatch)
});

export const SearchInput: React.FC<_SearchInput.Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SearchInput);