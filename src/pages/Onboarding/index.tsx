import React from 'react';
// icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// elements
import { Button, Grid } from '../../elements';
// components
import StatusBar from './StatusBar';
// pages
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
// style
import { Transition, PageMoveArrowStyle } from './style';

const Onboarding = () => {
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    let moveX;

    const pageMoveDesktop = (e) => {
      const movement = moveX - e.offsetX;

      if (movement > 30) {
        if (page >= 3) return;

        setPage((curPage) => curPage + 1);
      }

      if (movement < -30) {
        if (page <= 1) return;

        setPage((curPage) => curPage - 1);
      }
    };

    const pageMoveMobile = (e) => {
      const movement = moveX - e.changedTouches[0].clientX;

      if (movement > 70) {
        if (page >= 3) return;

        setPage((curPage) => curPage + 1);
      }

      if (movement < -70) {
        if (page <= 1) return;

        setPage((curPage) => curPage - 1);
      }
    };

    window.addEventListener('touchstart', (event) => {
      moveX = event.touches[0].clientX;
    });
    window.addEventListener('mousedown', (event) => {
      moveX = event.offsetX;
    });

    window.addEventListener('touchend', pageMoveMobile);
    window.addEventListener('mouseup', pageMoveDesktop);

    return () => {
      window.removeEventListener('touchstart', (event) => {
        moveX = event.touches[0].clientX;
      });
      window.removeEventListener('mousedown', (event) => {
        moveX = event.offsetX;
      });

      window.removeEventListener('touchend', pageMoveMobile);
      window.removeEventListener('mouseup', pageMoveDesktop);
    };
  }, [page]);

  React.useEffect(() => {
    const sawOnboarding = localStorage.getItem('onboarding');

    if (!sawOnboarding) localStorage.setItem('onboarding', 'saw');
  }, []);

  return (
    <Grid height="100vh" overflow="hidden" position="relative">
      <StatusBar curPage={page} setPage={setPage} />

      <Grid
        position="relative"
        left={`${-(page - 1) * 100}vw`}
        width="300vw"
        isFlex
        addstyle={Transition}
      >
        <Page1 />
        <Page2 />
        <Page3 />
      </Grid>

      <Button addstyle={PageMoveArrowStyle} form="text">
        <ArrowBackIosIcon fontSize="large" />
      </Button>
      <Button addstyle={PageMoveArrowStyle} form="text">
        <ArrowBackIosIcon fontSize="large" />
      </Button>
    </Grid>
  );
};

export default Onboarding;
