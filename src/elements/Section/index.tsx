import React from 'react';
// style
import SectionStyle from './style';

export interface Props {
  children?: React.ReactElement | React.ReactElement[];
}

const Section: React.FC = ({ children }) => {
  return <SectionStyle>{children}</SectionStyle>;
};

export default Section;
