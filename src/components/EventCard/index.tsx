import React from 'react';
// moment
import moment from 'moment';
// style, component
import { Grid, Text, MainTitle, Button } from 'src/elements';
import { textOverflowWrap } from 'src/styles/Mixin';
import Modal from '../Modal';

interface Info {
  city: string;
  endDate: string;
  partner: any;
  region: string;
  startDate: string;
  tripId: number;
  tripInfo: string;
  nickname: string;
  userPk: number;
}

export interface Props {
  userInfo?: Info;
  subText?: string;
  sub2Text?: string;
  btnText?: string;
  mainText?: string;
  agreeText?: string;
  callback?: any;
}

const EventCard = ({
  userInfo,
  subText,
  sub2Text,
  mainText,
  agreeText,
  btnText,
  callback,
}: Props) => {
  const [modal, setModal] = React.useState<boolean>(false);

  const openModalHandler = () => {
    setModal(true);
  };
  const agreeModalHandler = () => {
    callback();
    setModal(false);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  return (
    <Grid
      margin="10px 0 20px"
      bgColor="white"
      radius="14px"
      overflow="hidden"
      shadow="0px 2px 3px rgba(136, 136, 136, 0.25)"
      isFlex
      column
      hoz="space-between"
    >
      <Grid padding="20px">
        <Text color="darkGray">
          {userInfo &&
            moment
              .utc(userInfo.startDate)
              .add(9, 'hours')
              .format('MM. DD')}{' '}
          -{' '}
          {userInfo &&
            moment.utc(userInfo.endDate).add(9, 'hours').format('MM. DD')}
        </Text>
        <MainTitle fs="la">
          {userInfo && userInfo.region} {userInfo && userInfo.city}
        </MainTitle>
        <Text
          margin="10px 0 0 0"
          ws="pre-line"
          fs="sm"
          addstyle={textOverflowWrap(3)}
        >
          {userInfo && userInfo.tripInfo}
        </Text>
        <Modal
          open={modal}
          close={closeModalHandler}
          agree={agreeModalHandler}
          mainText={mainText}
          subText={subText}
          subText2={sub2Text}
          agreeText={agreeText}
        />
      </Grid>
      <Button
        width="100%"
        radius="0"
        _onClick={() => {
          openModalHandler();
        }}
      >
        {btnText}
      </Button>
    </Grid>
  );
};

export default EventCard;
