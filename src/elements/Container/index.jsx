import React from 'react';
import { useLocation } from 'react-router-dom';
import ContainerStyle from './style';

import { HeaderIncluded } from '../../route/Path';

const Container = ({ children, ...props }) => {
  const path = useLocation().pathname;

  return (
    <ContainerStyle {...props} noPadding={!HeaderIncluded.includes(path)}>
      {children}
    </ContainerStyle>
  );
};

Container.defaultProps = {
  padding: '90px 0 80px 0',
};

export default Container;
