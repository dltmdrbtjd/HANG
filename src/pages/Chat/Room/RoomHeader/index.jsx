import React, { useState, useRef } from 'react';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// history
import { history } from '../../../../redux/configureStore';
// elements
import { Container, Grid, Button, Strong } from '../../../../elements';
// components
import ProfileImg from '../../../../components/ProfileImg';
// style
import HeaderStyle from '../../../../components/Header/style';
import { RoomToggleWrapper, RoomToggleList } from './style';

const RoomHeader = () => {
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <HeaderStyle>
      <Container height="66px">
        <Grid height="100%" display="flex" hoz="space-between" ver="center">
          <Grid display="flex" ver="center">
            <Button
              padding="0"
              color="black"
              bgColor="white"
              margin="0 18px 0 0"
              _onClick={() => {
                history.goBack();
              }}
            >
              <ArrowBackIosIcon />
            </Button>

            <ProfileImg size="small" />

            <Strong margin="0 0 0 12px">닉네임</Strong>
          </Grid>

          <Button
            padding="0"
            color="black"
            bgColor="white"
            ref={anchorRef}
            _onClick={handleToggle}
          >
            <MoreVertIcon />
          </Button>

          {open ? (
            <ClickAwayListener onClickAway={handleClose}>
              <RoomToggleWrapper top="70px">
                <RoomToggleList>채팅방 나가기</RoomToggleList>
                <RoomToggleList>신고하기</RoomToggleList>
              </RoomToggleWrapper>
            </ClickAwayListener>
          ) : null}
        </Grid>
      </Container>
    </HeaderStyle>
  );
};

export default RoomHeader;
