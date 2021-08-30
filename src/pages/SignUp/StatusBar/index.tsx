import React from 'react';
// elements
import { Grid, Button, Hr } from '../../../elements/index';
import { signUpStatus } from '../SignUpContext';
// style
import setSmallMobileMargin from './style';

const StatusBar = () => {
  const { pageState } = React.useContext(signUpStatus);
  const pageNav = [1, 2, 3];

  return (
    <Grid isFlex hoz="center" padding="50px 0" addstyle={setSmallMobileMargin}>
      <Grid isFlex ver="center" width="auto">
        {pageNav.map((page: number, idx: number) => {
          let color = 'gray';

          if (page === pageState.page) color = 'brandColor';
          else if (page < pageState.page) color = 'white';

          const isPastPage = page <= pageState.page;

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
                bgColor={page < pageState.page ? 'brandColor' : 'bgColor'}
                fs="status"
                fw="bold"
                _onClick={
                  pageState.page < 4 && isPastPage
                    ? () => pageState.setPage(page)
                    : null
                }
                border={`1px solid ${isPastPage ? '#FF9900' : '#C4C4C4'}`}
              >
                {page}
              </Button>

              {idx < pageNav.length - 1 ? (
                <Hr
                  width="85px"
                  bgColor={page < pageState.page ? 'brandColor' : 'lightGray'}
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
