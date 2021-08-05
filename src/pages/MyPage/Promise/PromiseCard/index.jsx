import React from 'react';
// moment
import moment from 'moment';
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

const PromiseCard = ({ promInfo, guide, received }) => {
  return (
    <Grid bgColor="white" radius="16px" overflow="hidden">
      <Grid display="flex" ver="center" padding="32px 20px" position="relative">
        <ProfileImg size="large" />

        <Grid width="auto" margin="0 0 0 14px">
          <Text margin="0 0 20px" overflow="visible">
            <Strong>{promInfo.nickname}</Strong> 님에게{' '}
            <Strong addstyle={StrongAddStyle}>길잡이</Strong> 요청
          </Text>

          <Text>
            {moment.utc(promInfo.startDate).format('MM.DD')} -{' '}
            {moment.utc(promInfo.endDate).format('MM.DD')}
          </Text>

          <Text fs="la" fw="bold">
            {promInfo.region} {promInfo.city}
          </Text>
        </Grid>

        <Strong color="darkG" addstyle={ArrowStyle}>
          {guide ? <CallReceivedIcon /> : <CallMadeIcon />}
        </Strong>
      </Grid>

      {received ? (
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
