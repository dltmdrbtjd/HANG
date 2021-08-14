import React from 'react';
import MainTitleStyle from './style';

const MainTitle = ({ children, ...porps }) => {
  return <MainTitleStyle {...porps}>{children}</MainTitleStyle>;
};

MainTitle.defaultProps = {
  fw: 'bold',
};

export default MainTitle;
