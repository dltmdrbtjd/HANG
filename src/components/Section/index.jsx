import React, { useEffect, useState } from 'react';
// router
import { useLocation } from 'react-router-dom';
// style
import SectionStyle from './style';
// components
import Container from '../../elements/Container/index';
import LogoSplash from '../LogoSplash';

const Section = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const path = useLocation().pathname;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (path === '/onboarding') return null;

  return (
    <SectionStyle>
      {visible ? <LogoSplash /> : null}

      <Container>{children}</Container>
    </SectionStyle>
  );
};

export default Section;
