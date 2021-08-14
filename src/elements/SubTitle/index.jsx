import React from 'react';
import SubTitleStyle from './style';

const SubTitle = ({ children, ...props }) => {
  return <SubTitleStyle {...props}>{children}</SubTitleStyle>;
};

SubTitle.defaultProps = {
  fw: 'semiBold',
};

export default SubTitle;
