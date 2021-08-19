import React from 'react';
// elements
import { Grid, Button, Hr } from '../../../elements/index';

interface Page {
  curPage: number;
  setPage: any;
}

const StatusBar: React.FC<Page> = ({ curPage, setPage }) => {
  const pageNav = [1, 2, 3];

  return (
    <Grid isFlex hoz="center" padding="50px 0">
      <Grid isFlex ver="center">
        {pageNav.map((page: number, idx: number) => {
          let color = 'gray';

          if (page === curPage) color = 'brandColor';
          else if (page < curPage) color = 'white';

          return (
            <React.Fragment
              key={(page * Date.now() + Math.random()).toString(36)}
            >
              {page <= curPage ? (
                <Button
                  padding="0"
                  radius="50%"
                  width="16px"
                  height="16px"
                  color={color}
                  bgColor={page < curPage ? 'brandColor' : 'bgColor'}
                  fs="status"
                  fw="bold"
                  _onClick={setPage ? () => setPage(page) : null}
                >
                  {page}
                </Button>
              ) : (
                <Grid
                  isFlex
                  hoz="center"
                  ver="center"
                  radius="50%"
                  width="16px"
                  height="16px"
                  color="gray"
                  fs="status"
                  fw="bold"
                  border="1px solid #C4C4C4"
                >
                  {page}
                </Grid>
              )}

              {idx < pageNav.length - 1 ? (
                <Hr
                  width="85px"
                  bgColor={page < curPage ? 'brandColor' : 'lightGray'}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default StatusBar;
