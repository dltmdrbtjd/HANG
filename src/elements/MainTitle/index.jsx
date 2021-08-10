import React from 'react';
import MainTitleStyle from './style';

const MainTitle = ({ children, ...porps }) => {
  return <MainTitleStyle {...porps}>{children}</MainTitleStyle>;
};

MainTitle.defaultProps = {
  width: '100%',
  fw: 'bold',
};

export default MainTitle;
