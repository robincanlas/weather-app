import * as React from 'react';

export namespace useInput {
  export interface Props {
    type: string;
  }
}

 export const useInput = ({ type }: useInput.Props): [string, JSX.Element] => {
  const [value, setValue] = React.useState<string>('');
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
};