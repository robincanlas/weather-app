import * as React from 'react';

export namespace useInput {
  export interface Props {
    type: string;
    className: string;
    placeHolder: string;
    enterKey: () => void;
  }
}

 export const useInput = ({ type, className, placeHolder, enterKey }: useInput.Props): [JSX.Element, string, boolean] => {
  const [value, setValue] = React.useState<string>('');
  const [focus, setFocus] = React.useState<boolean>(false);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      enterKey();
    }
  };

  const input = <input 
    value={value} 
    onChange={e => setValue(e.target.value)} 
    onFocus={e => setFocus(true)}
    onBlur={e => setFocus(false)}
    onKeyUp={e => onKeyUp(e)}
    type={type} 
    className={className}
    placeholder={placeHolder} 
    />;
  return [input, value, focus];
};