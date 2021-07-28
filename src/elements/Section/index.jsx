import React from 'react';
import SectionStyle from './style';

// components
import Container from '../Container/index';

const Section = ({ children }) => {
  return (
    <SectionStyle>
      <Container>{children}</Container>
    </SectionStyle>
  );
};

export default Section;
