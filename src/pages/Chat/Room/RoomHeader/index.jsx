import React, { useState, useRef } from 'react';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// history
import { history } from '../../../../redux/configureStore';
// elements
import {
  Container,
  Grid,
  Button,
  Strong,
  Ul,
  List,
} from '../../../../elements';
// components
import ProfileImg from '../../../../components/ProfileImg';
// style
import HeaderStyle from '../../../../components/Header/style';

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
        <Grid height="100%" isFlex hoz="space-between" ver="center">
          <Grid isFlex ver="center">
            <Button
              form="text"
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
              <Ul
                bgColor="white"
                border="1px solid #E7E7E7"
                position="absolute"
                top="70px"
                right="0"
                z="9"
                shadow="0px 2px 3px rgba(196, 196, 196, 0.25)"
              >
                <List
                  padding="16px 30px"
                  border="1px solid #E7E7E7"
                  borDirection="bottom"
                >
                  채팅방 나가기
                </List>
                <List padding="16px 30px">신고하기</List>
              </Ul>
            </ClickAwayListener>
          ) : null}
        </Grid>
      </Container>
    </HeaderStyle>
  );
};

export default RoomHeader;
