import React from 'react';
import LogoStyle from './style';

const SubTitle = props => {
  return <LogoStyle {...props}>Hang</LogoStyle>;
};

SubTitle.defaultProps = {
  imgUrl:
    'https://naver.worksmobile.com/wp-content/uploads/img@2x-1024x512.png',
};

export default SubTitle;
