import React, { useState } from 'react';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import CloseIcon from '@material-ui/icons/Close';
// elements
import { Button, Grid, BlurBox, Strong } from '../../../elements';

const Noti = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        padding="0"
        color="black"
        bgColor="white"
        shadow="none"
        _onClick={handleToggle}
      >
        <Badge badgeContent={4} color="secondary">
          <NotificationsNoneIcon fontSize="large" />
        </Badge>
      </Button>

      {open ? (
        <BlurBox>
          <Grid
            bgColor="white"
            width="70%"
            height="100vh"
            margin="0 0 0 30%"
            padding="50px 0 0"
            position="relative"
          >
            <Grid
              display="flex"
              hoz="space-between"
              ver="center"
              padding="0 20px"
            >
              <Button
                padding="0"
                bgColor="white"
                color="black"
                shadow="none"
                _onClick={handleClose}
              >
                <CloseIcon fontSize="large" />
              </Button>

              <Strong fs="lg" fw="bold">
                알림
              </Strong>

              <NotificationsNoneIcon fontSize="large" />
            </Grid>

            <Grid
              position="absolute"
              bottom="20px"
              right="0"
              padding="0 20px"
              display="flex"
              hoz="flex-end"
            >
              <Button fs="la" width="50%">
                전체삭제
              </Button>
            </Grid>
          </Grid>
        </BlurBox>
      ) : null}
    </>
  );
};

Noti.propTypes = {};

export default Noti;
