import React, { Fragment } from 'react';
// elements
import { Grid, Button } from '../../../elements/index';
// style
import HrStyle from './style';

const StatusBar = ({ curPage, setPage }) => {
  const pageNav = [1, 2, 3];

  return (
    <Grid display="flex" hoz="center" padding="50px 0 0" margin="0 0 50px">
      <Grid display="flex" ver="center" width="auto">
        {pageNav.map((page, idx) => {
          let color = 'gray';

          if (page === curPage) color = 'brandColor';
          else if (page < curPage) color = 'white';

          return (
            <Fragment key={(page * Date.now() + Math.random()).toString(36)}>
              {page <= curPage ? (
                <Button
                  padding="0"
                  radius="50%"
                  width="25px"
                  height="25px"
                  color={color}
                  bgColor={page < curPage ? 'brandColor' : 'bgColor'}
                  fs="sm"
                  fw="bold"
                  border={`1px solid ${
                    page <= curPage ? '#FF9900' : '#C4C4C4'
                  }`}
                  _onClick={
                    setPage
                      ? () => {
                          setPage(page);
                        }
                      : null
                  }
                >
                  {page}
                </Button>
              ) : (
                <Grid
                  display="flex"
                  hoz="center"
                  ver="center"
                  radius="50%"
                  width="25px"
                  height="25px"
                  color="gray"
                  fs="sm"
                  fw="bold"
                  border="1px solid #C4C4C4"
                >
                  {page}
                </Grid>
              )}

              {idx < pageNav.length - 1 ? (
                <HrStyle hrColor={page < curPage ? '#FF9900' : '#C4C4C4'} />
              ) : null}
            </Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default StatusBar;
