import React from 'react';
// icon
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// elements
import { Grid, Image } from '../../elements/index';

const ProfileImg = ({ size, imgUrl }) => {
  switch (size) {
    case 'large':
      return (
        <Grid
          display="flex"
          hoz="center"
          ver="center"
          width="100px"
          height="100px"
          overflow="hidden"
          radius="50%"
          color="gray"
        >
          {imgUrl ? (
            <Image src={imgUrl} alt="profile image" />
          ) : (
            <AccountCircleIcon style={{ fontSize: '100px' }} />
          )}
        </Grid>
      );

    case 'medium':
      return (
        <Grid
          display="flex"
          hoz="center"
          ver="center"
          width="60px"
          height="60px"
          overflow="hidden"
          radius="50%"
          color="gray"
        >
          {imgUrl ? (
            <Image src={imgUrl} alt="profile image" />
          ) : (
            <AccountCircleIcon style={{ fontSize: '60px' }} />
          )}
        </Grid>
      );

    case 'small':
      return (
        <Grid
          display="flex"
          hoz="center"
          ver="center"
          width="20px"
          height="20px"
          overflow="hidden"
          radius="50%"
          color="gray"
        >
          {imgUrl ? (
            <Image src={imgUrl} alt="profile image" />
          ) : (
            <AccountCircleIcon style={{ fontSize: '20px' }} />
          )}
        </Grid>
      );

    default:
      return (
        <Grid
          display="flex"
          hoz="center"
          ver="center"
          width="60px"
          height="60px"
          overflow="hidden"
          radius="50%"
          color="gray"
        >
          {imgUrl ? (
            <Image src={imgUrl} alt="profile image" />
          ) : (
            <AccountCircleIcon style={{ fontSize: '60px' }} />
          )}
        </Grid>
      );
  }
};

export default ProfileImg;
