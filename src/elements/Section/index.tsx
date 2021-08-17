import React from 'react';
// style
import SectionStyle from './style';

const Section: React.FC = ({ children }) => {
  return <SectionStyle>{children}</SectionStyle>;
};

export default Section;
