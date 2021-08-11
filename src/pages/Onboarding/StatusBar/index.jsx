import React from 'react';
// elements
import { Grid, Button } from '../../../elements/index';

const StatusBar = ({ curPage, setPage }) => {
  const pageNav = [1, 2, 3];

  return (
    <Grid
      width="70px"
      isFlex
      hoz="space-between"
      padding="30px 0 0"
      margin="0 auto 30px"
    >
      {pageNav.map((page, idx) => (
        <Button
          key={(page * idx + Date.now() + Math.random()).toString(36)}
          padding="0"
          bgColor={curPage === page ? 'brandColor' : 'semiLightG'}
          width="10px"
          height="10px"
          radius="50%"
          _onClick={() => setPage(page)}
        />
      ))}
    </Grid>
  );
};

export default StatusBar;
