import React, { useEffect, useState } from 'react';
// style
import SectionStyle from './style';
// components
import Container from '../../elements/Container/index';
import LogoSplash from '../LogoSplash';

const Section = ({ children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SectionStyle>
      {visible ? <LogoSplash /> : null}

      <Container>{children}</Container>
    </SectionStyle>
  );
};

export default Section;
