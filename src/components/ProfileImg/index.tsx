import React from 'react';
// elements
import { Grid, Image } from '../../elements/index';
// style
import { setProfileImageSize, ImagePosition } from './style';
// image
import defaultProfile from '../../Images/profile.png';

export interface Props {
  size?: string;
  imgUrl: string | null;
}

const ProfileImg = ({ size, imgUrl }: Props) => {
  return (
    <Grid
      overflow="hidden"
      radius="50%"
      addstyle={setProfileImageSize(size)}
      position="relative"
    >
      <Image
        src={imgUrl && imgUrl !== 'null' ? imgUrl : defaultProfile}
        alt="profile image"
        addstyle={ImagePosition}
      />
    </Grid>
  );
};

export default ProfileImg;
