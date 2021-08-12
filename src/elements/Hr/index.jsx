import React from 'react';
import HrStyle from './style';

const Hr = props => {
  return <HrStyle {...props} />;
};

Hr.defaultProps = {
  bgColor: 'semiLightG',
};

export default Hr;
