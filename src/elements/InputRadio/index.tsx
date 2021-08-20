import React from 'react';
// style
import RadioStyle from './style';

export interface Props {
  id: string;
  checked?: boolean;
  width?: string;
  height?: string;
  weight?: string;
  marginRight?: string;
  _onChange?: any;
}

const InputRadio: React.FC<Props> = ({
  id,
  checked,
  _onChange,
  ...props
}): React.ReactElement => {
  return (
    <RadioStyle
      checked={checked}
      id={id}
      type="radio"
      onChange={_onChange}
      {...props}
    />
  );
};

InputRadio.defaultProps = {
  width: '20px',
  height: '20px',
  weight: '5px',
  marginRight: '10px',
  _onChange: () => {},
};

export default InputRadio;
