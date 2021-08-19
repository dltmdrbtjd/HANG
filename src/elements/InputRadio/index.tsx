import React from 'react';
// style
import RadioStyle from './style';

export interface Props {
  width?: string;
  height?: string;
  weight?: string;
  marginRight?: string;
}

const InputRadio: React.FC<Props> = (props): React.ReactElement => {
  return <RadioStyle type="radio" {...props} />;
};

InputRadio.defaultProps = {
  width: '20px',
  height: '20px',
  weight: '5px',
  marginRight: '10px',
};

export default InputRadio;
