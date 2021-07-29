import React from 'react';
// style
import LabelStyle from './style';

const Label = ({ id, children, ...props }) => {
  return (
    <LabelStyle htmlFor={id} {...props}>
      {children}
    </LabelStyle>
  );
};

export default Label;
