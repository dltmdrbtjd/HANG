import React from 'react';
// router
import { useLocation } from 'react-router-dom';
// style
import SectionStyle from './style';
// components
import { Container } from '../../elements';

const Section = ({ children }) => {
  const path = useLocation.pathname;

  return (
    <SectionStyle>
      {path !== 'onboarding' ? <Container>{children}</Container> : children}
    </SectionStyle>
  );
};

export default Section;
