import React, { forwardRef } from 'react';
import UlStyle from './style';

const Ul = forwardRef(({ children, ...props }, ref) => {
  return (
    <UlStyle ref={ref} {...props}>
      {children}
    </UlStyle>
  );
});

Ul.defaultProps = {
  width: '100%',
};

export default Ul;
