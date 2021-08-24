import React from 'react';
// icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// elements
import { Grid, Button } from '../../../elements/index';
// style
import { PageMoveArrowStyle } from '../style';
import { setMediaBoxSize } from '../../../styles/Media';

const StatusBar = ({ curPage, setPage }) => {
  const pageNav = [1, 2, 3];

  return (
    <Grid
      width="70px"
      isFlex
      hoz="space-between"
      ver="center"
      padding="30px 0 0"
      margin="0 auto 30px"
      addstyle={setMediaBoxSize('120px', null)}
    >
      <Button
        margin="3px 0 0"
        form="text"
        addstyle={PageMoveArrowStyle}
        _onClick={() =>
          curPage > 1 ? setPage((page: number) => page - 1) : null
        }
      >
        <ArrowBackIosIcon fontSize="small" />
      </Button>

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

      <Button
        margin="3px 0 0"
        form="text"
        addstyle={PageMoveArrowStyle}
        _onClick={() =>
          curPage < 3 ? setPage((page: number) => page + 1) : null
        }
      >
        <ArrowForwardIosIcon fontSize="small" />
      </Button>
    </Grid>
  );
};

export default StatusBar;
