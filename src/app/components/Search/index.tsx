import * as React from 'react';
import * as style from './style.css';
import { SearchInput, SearchResults } from 'app/components';
import { SearchInputMobile } from '../SearchInputMobile';

export namespace Search {
  export interface Props {
  }
  export interface State {

  }
}

export const Search: React.FC<Search.Props> = (props: Search.Props) => {
  const [inputFocus, setInputFocus] = React.useState<boolean>(false);
  const [mobileSearch, setMobileSearch] = React.useState<boolean>(true);

  const setFocus = (focus: boolean) => {
    setInputFocus(focus);
  };

  const toggleMobileSearch = () => {
    setMobileSearch(!mobileSearch);
  };

  return (
    <>
      <SearchInputMobile mobileSearch={mobileSearch} toggleMobileSearch={toggleMobileSearch} />
      <div className={`${style['search-section-container']} ${inputFocus ? style.focus : '' }`}>
        <SearchInput setFocus={setFocus} />
      </div>
      <SearchResults toggleMobileSearch={toggleMobileSearch} />
    </>
  );
};
