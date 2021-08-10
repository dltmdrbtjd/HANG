import React from 'react';
// icon
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
// image upload
import imageCompression from 'browser-image-compression';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { ImageCreators } from '../../redux/modules/image';
// elements
import { Grid, Label, Image } from '../../elements';
// style
import InputImageStyle from './style';
// image
import defaultProfile from '../../Images/profile.png';

const InputImage = ({ setProfile }) => {
  const dispatch = useDispatch();
  const profilePre = useSelector(state => state.image.profilePre);

  const selectFile = async event => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    try {
      const reader = new FileReader();
      const file = event.target.files[0];

      const compressedFile = await imageCompression(file, options);

      if (file) {
        reader.readAsDataURL(compressedFile);

        reader.onload = () => {
          setProfile(compressedFile);
          dispatch(ImageCreators.setProfilePre(reader.result));
        };
      }
    } catch (error) {
      console.log(error);
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
        isFlex
        hoz="center"
        ver="center"
        radius="50%"
        overflow="hidden"
        color="gray"
      >
        <Image src={profilePre || defaultProfile} />
      </Grid>

      <Grid
        width="34px"
        height="34px"
        isFlex
        hoz="center"
        ver="center"
        position="absolute"
        bottom="0"
        right="0"
        color="gray"
        bgColor="semiLightG"
        radius="50%"
      >
        <PhotoCameraIcon />
      </Grid>
    </Grid>
  );
};

export default InputImage;
