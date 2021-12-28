import * as React from 'react';
import { Search, WindyMap } from 'app/components';

export namespace HomePage {
  export interface Props {
  }
  export interface State {
  }
}

export const HomePage: React.FC<HomePage.Props> = (props: HomePage.Props) => {
  return (
    <>
      <Search />  
      {true ? null : <WindyMap />}
    </>
  );
};
