import React, { Fragment } from 'react';
// elements
import { Grid, Link } from '../../../elements/index';
// style
import HrStyle from './style';

const StatusBar = ({ curPage }) => {
  const pageNav = [1, 2, 3];

  return (
    <Grid display="flex" hoz="center" padding="30px 0 0" margin="0 0 30px">
      <Grid display="flex" ver="center" width="auto">
        {pageNav.map((page, idx) => {
          let color = 'gray';

          if (page === curPage) color = 'brandColor';
          else if (page < curPage) color = 'white';

          return (
            <Fragment key={(page * Date.now() + Math.random()).toString(36)}>
              {page <= curPage ? (
                <Link
                  href={`/signup/${page}`}
                  display="flex"
                  hoz="center"
                  ver="center"
                  radius="50%"
                  width="16px"
                  height="16px"
                  color={color}
                  bgcolor={page < curPage ? 'brandColor' : null}
                  fs="xs"
                  fw="bold"
                  border={`1px solid ${
                    page <= curPage ? '#FF9900' : '#C4C4C4'
                  }`}
                >
                  {page}
                </Link>
              ) : (
                <Grid
                  display="flex"
                  hoz="center"
                  ver="center"
                  radius="50%"
                  width="16px"
                  height="16px"
                  color="gray"
                  fs="xs"
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
