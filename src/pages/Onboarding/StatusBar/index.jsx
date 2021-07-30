import React from 'react';
// elements
import { Grid, Link } from '../../../elements/index';

const StatusBar = ({ curPage }) => {
  const pageNav = [1, 2, 3];

  return (
    <Grid
      width="70px"
      display="flex"
      hoz="space-between"
      padding="30px 0 0"
      margin="0 auto 30px"
    >
      {pageNav.map((page, idx) => (
        <Link
          href={`/onboarding/${page}`}
          key={(page * idx + Date.now() + Math.random()).toString(36)}
          padding="0"
          bgcolor={curPage === page ? 'brandColor' : 'semiLightG'}
          width="10px"
          height="10px"
          radius="50%"
        />
      ))}
    </Grid>
  );
};

export default StatusBar;
