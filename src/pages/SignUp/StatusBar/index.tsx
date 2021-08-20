import React from 'react';
// elements
import { Grid, Button, Hr } from '../../../elements/index';

interface Page {
  curPage: number;
  setPage?: any;
}

const StatusBar: React.FC<Page> = ({ curPage, setPage }) => {
  const pageNav = [1, 2, 3];

  return (
    <Grid isFlex hoz="center" padding="50px 0">
      <Grid isFlex ver="center" width="auto">
        {pageNav.map((page: number, idx: number) => {
          let color = 'gray';

          if (page === curPage) color = 'brandColor';
          else if (page < curPage) color = 'white';

          const isPastPage = page <= curPage;

          return (
            <React.Fragment
              key={(page * Date.now() + Math.random()).toString(36)}
            >
              <Button
                padding="0"
                radius="50%"
                width="16px"
                height="16px"
                color={color}
                bgColor={page < curPage ? 'brandColor' : 'bgColor'}
                fs="status"
                fw="bold"
                _onClick={page < 4 && isPastPage ? () => setPage(page) : null}
                border={`1px solid ${isPastPage ? '#FF9900' : '#C4C4C4'}`}
              >
                {page}
              </Button>

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
