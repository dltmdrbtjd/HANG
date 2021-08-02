import React from 'react';
// elements
import { Grid, Button } from '../../elements';
// components
import AlaremCard from './AlarmCard';

const Noti = () => {
  return (
    <Grid margin="-24px 0 80px">
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />
      <AlaremCard />

      <Grid
        width="90%"
        position="fixed"
        bottom="110px"
        left="50%"
        translate="-50%, 0"
      >
        <Button width="100%" fs="la">
          전체삭제
        </Button>
      </Grid>
    </Grid>
  );
};

export default Noti;
