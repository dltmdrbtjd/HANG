import React from 'react';
import SectionStyle from './style';

const Section = ({ children, ...props }) => {
  return (
    <>
      <SectionStyle {...props}>{children}</SectionStyle>
    </>
  );
};

Section.defaultProps = {
  width: '100%',
  height: '100%',
};

export default Section;
