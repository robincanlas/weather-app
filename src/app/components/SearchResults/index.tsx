import * as React from 'react';
import * as style from './style.css';
import { RootState } from 'app/stores';
import { connect } from 'react-redux';
import { Country } from 'app/models';

export namespace _SearchResults {
  export interface Props {
    countries?: Country.Model[];
  }
}

export const _SearchResults: React.FC<_SearchResults.Props> = ({
  countries = [],

 }) => {

  React.useEffect(() => {
    console.log(countries, '########## search');
  }, [countries]);

  const getList = (): JSX.Element => {
    let opacity: number = 1;
    return (
      <>
        <ul className={style['search-ul']}>
          {countries.map(country => ( 
            <li key={country.latitude} style={{'opacity': opacity -= .07}}>
              <div>
                <span>{country.name}</span>
                <span>{country.country}</span>
                <span>{country.country_code}</span>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  if (countries.length === 0) {
    return null;
  }

  return getList();
};

const mapStateToProps = (state: RootState): Pick<_SearchResults.Props, 'countries'> => {
  return {
    countries: state.country.countries,
  };
};

export const SearchResults: React.FC<_SearchResults.Props> = connect(
  mapStateToProps,
  null
)(_SearchResults);