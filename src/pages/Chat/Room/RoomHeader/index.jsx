import React, { useState, useRef } from 'react';
// icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// history
import { history } from '../../../../redux/configureStore';
// elements
import { Container, Grid, Button, Strong } from '../../../../elements';
// components
import ProfileImg from '../../../../components/ProfileImg';
import DropDown from '../../../../components/DropDown';
// style
import HeaderStyle from '../../../../components/Header/style';

const RoomHeader = () => {
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

          <DropDown
            icon={<MoreVertIcon />}
            contents={['채팅방 나가기', '신고하기']}
            top="70px"
          />
        </Grid>
      </Container>
    </HeaderStyle>
  );
};

export default RoomHeader;
