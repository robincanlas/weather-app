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
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

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

  React.useEffect(() => {
    const progressBar: HTMLElement | null = document.getElementById('progress-bar');
    if (progressBar) {
      if (mobileSearch) {
        progressBar.style.display = 'none';
      } else {
        progressBar.style.display = 'block';
      }
    }
  }, [mobileSearch]);

  const toggleSearch = () => {
    setMobileSearch(!mobileSearch);
  };

  const clickMagnifying = () => {
    search();
    toggleSearch();
  };

  return (
    <>
      <div className={`${style['m-search-header']} ${mobileSearch ? style.toggle : ''}`}>
        <FontAwesomeIcon icon={faSearch} className={style['m-search-icons']} onClick={clickMagnifying} />
        {searchInput}
        <FontAwesomeIcon icon={faTimes} className={style['m-search-icons']} onClick={toggleSearch} />
      </div>
      {mobileSearch ? null : <FontAwesomeIcon onClick={toggleSearch} className={style['m-magnifying-glass']} icon={faSearch} /> }
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