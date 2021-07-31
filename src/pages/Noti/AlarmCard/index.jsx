import React from 'react';
// elements
import { Link, Text, Strong } from '../../../elements';
// components
import ProfileImage from '../../../components/ProfileImg';
// style
import { AlarmWrapperStyle, AlarmTypeStyle } from './style';

const AlarmCard = () => {
  return (
    <Link href="/mypage" width="100%">
      <AlarmWrapperStyle>
        <ProfileImage />

        <Text margin="0 0 0 15px" overflow="visible">
          <Strong>닉네임</Strong> 님이 <AlarmTypeStyle>길잡이</AlarmTypeStyle>를
          부탁합니다
        </Text>
      </AlarmWrapperStyle>
    </Link>
  );
};

export default AlarmCard;
