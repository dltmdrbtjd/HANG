import React from 'react';
// icon
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
// elements
import { Button, Grid, Text, Strong } from '../../../../elements';
// components
import ProfileImg from '../../../../components/ProfileImg';
// style
import { StrongAddStyle } from '../../../Noti/AlarmCard/style';
import ArrowStyle from './style';

const PromiseCard = ({ type }) => {
  return (
    <Grid bgColor="white" radius="16px" overflow="hidden">
      <Grid display="flex" ver="center" padding="32px 20px" position="relative">
        <ProfileImg size="large" />

        <Grid width="auto" margin="0 0 0 14px">
          <Text margin="0 0 20px" overflow="visible">
            <Strong>닉네임</Strong> 님에게{' '}
            <Strong addstyle={StrongAddStyle}>길잡이</Strong> 요청
          </Text>

          <Text>07.25 - 07.26</Text>

          <Text fs="la" fw="bold">
            경상남도 통영시
          </Text>
        </Grid>

        <Strong color="darkG" addstyle={ArrowStyle}>
          {type === 'received' ? <CallReceivedIcon /> : <CallMadeIcon />}
        </Strong>
      </Grid>

      {type === 'received' ? (
        <Grid>
          <Button width="50%" radius="0" padding="15px 0">
            수락
          </Button>

          <Button
            width="50%"
            radius="0"
            padding="15px 0"
            bgColor="semiLightG"
            color="darkG"
          >
            거절
          </Button>
        </Grid>
      ) : (
        <Button width="100%" radius="0" padding="15px 0">
          취소
        </Button>
      )}
    </Grid>
  );
};

export default PromiseCard;
