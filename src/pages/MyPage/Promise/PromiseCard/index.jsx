import React from 'react';
// redux
import { useDispatch } from 'react-redux';
// date format
import * as dateFns from 'date-fns';
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
// reducer
import { MypageCreators } from '../../../../redux/modules/mypage';

const PromiseCard = ({ promInfo, guide, received }) => {
  const dispatch = useDispatch();
  const agreePromise = () => {
    dispatch(
      MypageCreators.AgreePromiseDB(promInfo, {
        requestId: promInfo.requestId,
        tripId: promInfo.tripId,
      }),
    );
  };

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
            {dateFns.format(promInfo.startDate, 'MM.dd')} -{' '}
            {dateFns.format(promInfo.endDate, 'MM.dd')}
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
          <Button
            width="50%"
            radius="0"
            padding="15px 0"
            _onClick={agreePromise}
          >
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
