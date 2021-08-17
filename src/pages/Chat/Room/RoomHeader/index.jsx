import React from 'react';
// redux
import { useSelector } from 'react-redux';
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

const RoomHeader = ({ quit, block }) => {
  const targetUserInfo = useSelector(state => state.chat.targetUserInfo);

  return (
    <HeaderStyle>
      <Container height="66px" padding="0">
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

            <ProfileImg imgUrl={targetUserInfo.profileImg} size="small" />

            <Strong margin="0 0 0 12px">{targetUserInfo.nickname}</Strong>
          </Grid>

          <DropDown
            icon={<MoreVertIcon />}
            contents={['채팅방 나가기', '차단하고 나가기']}
            methods={[quit, block]}
            top="70px"
          />
        </Grid>
      </Container>
    </HeaderStyle>
  );
};

export default RoomHeader;
