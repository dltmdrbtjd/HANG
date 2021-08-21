import React from 'react';
// apis
import apis from 'src/shared/api';
// redux
import { useDispatch } from 'react-redux';
// reducer
import {
  AgreePromise,
  RejectPromise,
  CancelPromise,
} from 'src/redux/modules/MyPageModule/mypage';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
// type
import { PromInfo } from 'src/redux/modules/MyPageModule/type';
// date format
import moment from 'moment';
// icon
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
// history
import { history, useTypedSelector } from '../../../../redux/configureStore';
// elements
import { Button, Grid, Text, Strong, Span } from '../../../../elements';
// components
import ProfileImg from '../../../../components/ProfileImg';
import Modal from '../../../../components/Modal';
import ToastMessage from '../../../../components/ToastMessage';
import GuideNameplate from '../../../../components/GuideNameplate';
import { textOverflow } from '../../../../styles/Mixin';

interface Props {
  promInfo: PromInfo;
  guide?: boolean;
  type: string;
}

const PromiseCard: React.FC<Props> = ({ promInfo, guide, type }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [promiseType, setPromiseType] = React.useState(type);

  const toastMessage = useTypedSelector((state) => state.toastMessage.Message);

  const AgreeProm = () => {
    apis
      .AgreePromise({ tripId: promInfo.tripId, requestId: promInfo.requestId })
      .then(() => {
        dispatch(
          AgreePromise({
            tripInfo: { ...promInfo, guide: 0 },
            tripId: promInfo.tripId,
          }),
        );
      })
      .catch((err) => console.log(err));
  };

  const RejectProm = () => {
    apis
      .RejectPromise({ requestId: promInfo.requestId })
      .then(() => {
        dispatch(RejectPromise({ type, requestId: promInfo.requestId }));
      })
      .catch((err) => console.log(err));
  };

  const cancelConfiremedProm = () => {
    apis
      .CancelPromise({ tripId: promInfo.tripId })
      .then(() => {
        dispatch(CancelPromise(promInfo.tripId));
      })
      .catch((err) => console.log(err));
  };

  const modalMessage = {
    agreeReceived: {
      subText: `${promInfo.nickname} 님에게`,
      subText2: '길잡이가 되어주시겠습니까?',
      agreeText: '확인',
      agree: () => {
        AgreeProm();
        dispatch(fetchMessage({ Message: true }));
      },
      toastMsg: `${promInfo.nickname} 님의 요청을 수락했습니다.`,
    },

    received: {
      mainText: '요청 거절하기',
      subText: `${promInfo.nickname} 님의`,
      subText2: '요청을 거절하시겠습니까?',
      agreeText: '확인',
      agree: () => {
        RejectProm();
        dispatch(fetchMessage({ Message: true }));
      },
      toastMsg: `${promInfo.nickname} 님의 요청을 거절했습니다.`,
    },

    requested: {
      mainText: '요청 취소하기',
      subText: `${promInfo.nickname} 님에게 보낸`,
      subText2: '요청을 취소하시겠습니까?',
      agreeText: '확인',
      agree: () => {
        RejectProm();
        dispatch(fetchMessage({ Message: true }));
      },
      toastMsg: `요청을 취소했습니다.`,
    },

    confirmed: {
      mainText: '약속 취소하기',
      subText: `${promInfo.nickname} 님과의`,
      subText2: '약속을 취소하시겠습니까?',
      agree: () => {
        cancelConfiremedProm();
        dispatch(fetchMessage({ Message: true }));
      },
      toastMsg: `요청을 취소되었습니다.`,
    },
  };

  //   React.useEffect(() => {
  //     if (open.toastMsgOpen) {
  //       setTimeout(() => {
  //         setOpen({ ...open, toastMsgOpen: false });
  //       }, 1500);
  //     }
  //   }, [open.toastMsgOpen]);

  React.useEffect(() => {
    setPromiseType(type);
  }, []);

  return (
    <Grid bgColor="white" radius="16px" overflow="hidden" margin="0 0 15px">
      <Grid
        isFlex
        ver="center"
        padding="32px 20px"
        position="relative"
        overflow="hidden"
        _onClick={() => history.push(`/detail?user=${promInfo.userPk}`)}
      >
        <ProfileImg size="large" imgUrl={promInfo.profileImg} />

        <Grid width="60%" margin="0 0 0 14px">
          <Text margin="0 0 15px" addstyle={textOverflow()} lh="32px">
            <Strong>{promInfo.nickname}</Strong> 님에게{' '}
            <GuideNameplate>길잡이</GuideNameplate> 요청
          </Text>

          <Text>
            {moment.utc(promInfo.startDate).format('MM.DD')} -{' '}
            {moment.utc(promInfo.endDate).format('MM.DD')}
          </Text>

          <Text fs="la" fw="bold" addstyle={textOverflow()}>
            {promInfo.region} {promInfo.city}
          </Text>
        </Grid>

        <Span color="darkGray" position="absolute" top="12px" right="12px">
          {guide ? <CallMadeIcon /> : <CallReceivedIcon />}
        </Span>
      </Grid>

      {type === 'received' ? (
        <Grid>
          <Button
            width="50%"
            radius="0"
            _onClick={() => {
              setPromiseType('agreeReceived');
              setOpen(true);
            }}
          >
            수락
          </Button>

          <Button
            width="50%"
            radius="0"
            bgColor="semiLightG"
            color="darkG"
            _onClick={() => setOpen(true)}
          >
            거절
          </Button>
        </Grid>
      ) : (
        <Button width="100%" radius="0" _onClick={() => setOpen(true)}>
          취소
        </Button>
      )}

      <Modal
        open={open}
        close={() => setOpen(false)}
        {...modalMessage[promiseType]}
      />
      {toastMessage ? (
        <ToastMessage msg={modalMessage[promiseType].toastMsg} />
      ) : null}
    </Grid>
  );
};

export default PromiseCard;
