import React from 'react';
// icon
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// elements
import { Grid, Image } from '../../elements/index';

const ProfileImg = ({ size = 'medium', imgUrl }) => {
  const setProfileImageSize = {
    large: {
      width: '100px',
      height: '100px',
      fontSize: '100px',
    },

    medium: {
      width: '60px',
      height: '60px',
      fontSize: '60px',
    },

    small: {
      width: '20px',
      height: '20px',
      fontSize: '20px',
    },
  };

  return (
    <Grid
      display="flex"
      hoz="center"
      ver="center"
      width={setProfileImageSize[size].width}
      height={setProfileImageSize[size].height}
      overflow="hidden"
      radius="50%"
      color="gray"
    >
      {imgUrl ? (
        <Image src={imgUrl} alt="profile image" />
      ) : (
        <AccountCircleIcon
          style={{ fontSize: `${setProfileImageSize[size].fontSize}` }}
        />
      )}
    </Grid>
  );
};

export default ProfileImg;
