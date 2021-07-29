import React from 'react';
// icon
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
// elements
import { Grid, Label } from '../../elements';
// components
import ProfileImg from '../ProfileImg';
// style
import InputImageStyle from './style';

const InputImage = () => {
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
      />

      <ProfileImg size="large" src="" />

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
