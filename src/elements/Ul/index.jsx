import React from 'react';
import UlStyle from './style';

const Ul = ({ children, ...props }) => {
  return <UlStyle {...props}>{children}</UlStyle>;
};

Ul.defaultProps = {
  width: '100%',
};

export default Ul;
