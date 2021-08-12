import React from 'react';
// style
import SectionStyle from './style';
// components
import { Container } from '../../elements';

const Section = ({ children }) => {
  return (
    <SectionStyle>
      <Container>{children}</Container>
    </SectionStyle>
  );
};

export default Section;
