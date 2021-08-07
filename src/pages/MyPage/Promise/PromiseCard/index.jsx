import React, { useEffect, useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
// date format
import moment from 'moment';
// icon
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
// elements
import { Button, Grid, Text, Strong } from '../../../../elements';
// components
import ProfileImg from '../../../../components/ProfileImg';
import Modal from '../../../../components/Modal';
import ToastMessage from '../../../../components/ToastMessage';
// style
import { StrongAddStyle } from '../../../Noti/AlarmCard/style';
import ArrowStyle from './style';
// reducer
import { MypageCreators } from '../../../../redux/modules/mypage';

const PromiseCard = ({ promInfo, guide, type }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    modalOpen: false,
    toastMsgOpen: false,
  });
  const [promiseType, setPromiseType] = useState(type);

  const agreePromise = () => {
    dispatch(
      MypageCreators.AgreePromiseDB(promInfo, {
        requestId: promInfo.requestId,
        tripId: promInfo.tripId,
      }),
    );
  };

  const rejectPromise = () => {
    dispatch(MypageCreators.RejectPromiseDB(type, promInfo.requestId));
  };

  const cancelConfiremedPromise = () => {
    dispatch(MypageCreators.CancelConfirmedPromDB(promInfo.tripId));
  };

  const modalMessage = {
    agreeReceived: {
      subText: `${promInfo.nickname} 님에게`,
      subText2: '길잡이가 되어주시겠습니까?',
      agreeText: '확인',
      agree: () => {
        agreePromise();
        setOpen({ ...open, toastMsgOpen: true });
      },
      toastMsg: `${promInfo.nickname} 님의 요청을 수락했습니다.`,
    },

    received: {
      mainText: '요청 거절하기',
      subText: `${promInfo.nickname} 님의`,
      subText2: '요청을 거절하시겠습니까?',
      agreeText: '확인',
      agree: () => {
        rejectPromise();
        setOpen({ ...open, toastMsgOpen: true });
      },
      toastMsg: `${promInfo.nickname} 님의 요청을 거절했습니다.`,
    },

    requested: {
      mainText: '요청 취소하기',
      subText: `${promInfo.nickname} 님에게 보낸`,
      subText2: '요청을 취소하시겠습니까?',
      agreeText: '확인',
      agree: () => {
        rejectPromise();
        setOpen({ ...open, toastMsgOpen: true });
      },
      toastMsg: `요청을 취소했습니다.`,
    },

    confirmed: {
      mainText: '약속 취소하기',
      subText: `${promInfo.nickname} 님과의`,
      subText2: '약속을 취소하시겠습니까?',
      agree: () => {
        cancelConfiremedPromise();
        setOpen({ ...open, toastMsgOpen: true });
      },
      toastMsg: `요청을 취소되었습니다.`,
    },
  };

  useEffect(() => {
    if (open.toastMsgOpen) {
      setTimeout(() => {
        setOpen({ ...open, toastMsgOpen: false });
      }, 1500);
    }
  }, [open.toastMsgOpen]);

  useEffect(() => {
    setPromiseType(type);
  }, []);

  return (
    <Grid bgColor="white" radius="16px" overflow="hidden" margin="0 0 15px">
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
          {guide ? <CallMadeIcon /> : <CallReceivedIcon />}
        </Strong>
      </Grid>

      {type === 'received' ? (
        <Grid>
          <Button
            width="50%"
            radius="0"
            padding="15px 0"
            _onClick={() => {
              setPromiseType('agreeReceived');
              setOpen({ ...open, modalOpen: true });
            }}
          >
            수락
          </Button>

          <Button
            width="50%"
            radius="0"
            padding="15px 0"
            bgColor="semiLightG"
            color="darkG"
            _onClick={() => setOpen({ ...open, modalOpen: true })}
          >
            거절
          </Button>
        </Grid>
      ) : (
        <Button
          width="100%"
          radius="0"
          padding="15px 0"
          _onClick={() => setOpen({ ...open, modalOpen: true })}
        >
          취소
        </Button>
      )}

      <Modal
        open={open.modalOpen}
        close={() => setOpen({ ...open, modalOpen: false })}
        {...modalMessage[promiseType]}
      />
      {open.toastMsgOpen ? (
        <ToastMessage msg={modalMessage[promiseType].toastMsg} />
      ) : null}
    </Grid>
  );
};

export default PromiseCard;
