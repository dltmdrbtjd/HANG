import React from 'react';
import HrStyle from './style';

export interface Props {
  width?: string;
  height?: string;
  margin?: string;
  bgColor?: string;
}

const Hr: React.FC<Props> = (props): React.ReactElement => {
  return <HrStyle {...props} />;
};

Hr.defaultProps = {
  height: '1px',
  bgColor: 'lightGray',
};

export default Hr;
