import React, { useEffect, useState } from 'react';
// elements
import { Grid } from '../../elements';
// components
import StatusBar from './StatusBar';
// pages
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
// style
import { Transition } from './style';

const Onboarding = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    let moveX;

    const pageMove = event => {
      const movement = moveX - event.changedTouches[0].clientX;

      if (movement > 70) {
        if (page >= 3) return;

        setPage(curPage => curPage + 1);
      }

      if (movement < -70) {
        if (page <= 1) return;

        setPage(curPage => curPage - 1);
      }
    };

    window.addEventListener('touchstart', event => {
      moveX = event.touches[0].clientX;
    });

    window.addEventListener('touchend', pageMove);

    return () => {
      window.removeEventListener('touchstart', event => {
        moveX = event.touches[0].clientX;
      });

      window.removeEventListener('touchend', pageMove);
    };
  }, [page]);

  return (
    <Grid height="100vh" overflow="hidden">
      <StatusBar curPage={page} setPage={setPage} />

      <Grid
        position="relative"
        left={`${-(page - 1) * 100}vw`}
        width="300vw"
        display="flex"
        addstyle={Transition}
      >
        <Page1 />

        <Page2 />

        <Page3 />
      </Grid>
    </Grid>
  );
};

export default Onboarding;
