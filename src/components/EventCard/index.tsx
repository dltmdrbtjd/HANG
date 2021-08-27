import React from 'react';
// moment
import moment from 'moment';
// style, component
import { Grid, Text, MainTitle, Button } from 'src/elements';
import { textOverflowWrap } from 'src/styles/Mixin';
import Modal from '../Modal';

import { tendencyKeyword, mbti } from '../Tag/tagList';
import Tag from '../Tag';

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
  tags?: string;
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

  function TagCheck() {
    if (userInfo.tags && userInfo.tags !== '0') {
      return userInfo.tags.split(':').map((i) => +i);
    }
    return null;
  }
  const UserTag = TagCheck();

  function TagListCheck() {
    if (UserTag === null) {
      return undefined;
    }
    return [
      tendencyKeyword[UserTag[0]],
      tendencyKeyword[UserTag[1]],
      tendencyKeyword[UserTag[2]],
      mbti[UserTag[3]],
    ];
  }
  const UserTagList = TagListCheck();

  function LastTagCheck() {
    if (UserTagList !== undefined) {
      return UserTagList.filter((nan) => nan !== undefined);
    }
    return undefined;
  }
  const Tags = LastTagCheck();

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
        <Grid isFlex hoz="space-between" ver="center">
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
          <Grid margin="0 0 0 0" width="auto">
            {Tags &&
              Tags.map((item, idx) => {
                return (
                  <Tag list={Tags} key={idx}>
                    {item}
                  </Tag>
                );
              })}
          </Grid>
        </Grid>
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
