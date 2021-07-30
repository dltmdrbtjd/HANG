import React from 'react';
// icon
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { ImageCreators } from '../../redux/modules/image';
// elements
import { Grid, Label, Image } from '../../elements';
// style
import InputImageStyle from './style';

const InputImage = () => {
  const dispatch = useDispatch();
  const profilePre = useSelector(state => state.image.profilePre);

  const selectFile = event => {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        dispatch(ImageCreators.setProfilePre(reader.result));
      };
    }
  };

  return (
    <Grid position="relative" width="100px" height="100px" margin="0 auto 30px">
      <Label
        id="input--image"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        z="9"
      />

      <InputImageStyle
        id="input--image"
        type="file"
        accept="image/png, image/jpeg"
        onChange={selectFile}
      />

      <Grid
        height="100%"
        display="flex"
        hoz="center"
        ver="center"
        radius="50%"
        overflow="hidden"
        color="gray"
      >
        {profilePre ? (
          <Image src={profilePre} />
        ) : (
          <AccountCircleIcon style={{ fontSize: '100px' }} />
        )}
      </Grid>

      <Grid
        width="34px"
        height="34px"
        display="flex"
        hoz="center"
        ver="center"
        position="absolute"
        bottom="3px"
        right="3px"
        color="gray"
        bgColor="semiLightG"
        radius="50%"
      >
        <PhotoCameraIcon />
      </Grid>
    </Grid>
  );
};

InputImage.defaultProps = {};

export default InputImage;
