import * as React from 'react';
import * as style from './style.css';
import { RootState } from 'app/stores';
import { CountryActions } from 'app/stores/country/actions';
import { omit } from 'app/utils';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useInput } from 'app/components';
import { Country } from 'app/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export namespace _SearchInputMobile {
  export interface Props {
    countries?: Country.Model[];
    isLoading?: boolean;

    countryActions?: CountryActions;
  }
}

export const _SearchInputMobile: React.FC<_SearchInputMobile.Props> = ({
  countries = [],
  isLoading = false,

  countryActions = CountryActions,
 }) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [mobileSearch, setMobileSearch] = React.useState<boolean>(true);
  
  const search = () => {
    if (inputValue === '') return;
    countryActions.getCountries(inputValue);
  };

  const enterKey = () => {
    search();
  };

  const [searchInput, searchValue] = useInput({ 
    type: 'text', 
    className: style['m-search-input'], 
    placeHolder: 'Search for country or city',
    enterKey: enterKey });

  React.useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const openMobileSearch = () => {
    setMobileSearch(!mobileSearch);
  };

  return (
    <>
      {mobileSearch ? <div className={style['m-search-header']}>
        <FontAwesomeIcon icon={faSearch} />
        {searchInput}
      </div> : null}
      {isLoading ? null : <FontAwesomeIcon onClick={openMobileSearch} className={style['m-magnifying-glass']} icon={faSearch} /> }
    </>
  );
};

const mapStateToProps = (state: RootState): Pick<_SearchInputMobile.Props, 'countries' | 'isLoading'> => {
  return {
    countries: state.country.countries,
    isLoading: state.country.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<_SearchInputMobile.Props, 'countryActions'> => ({
  countryActions: bindActionCreators(omit(CountryActions, 'Type'), dispatch)
});

export const SearchInputMobile: React.FC<_SearchInputMobile.Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SearchInputMobile);