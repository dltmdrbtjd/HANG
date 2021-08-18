import React from 'react';
// icon
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
// image upload
import imageCompression from 'browser-image-compression';
// redux
import { useSelector, useDispatch } from 'react-redux';
// elements
import { Grid, Label, Image, Input } from '../../elements';
// components
import ProfileImg from '../ProfileImg';
// style
import HideElem from './style';
// image
// import defaultProfile from '../../Images/profile.png';

export interface Props {
  setProfile: any;
}

const SelectImage = ({ setProfile }: Props) => {
  const dispatch = useDispatch();
  const profilePre = null;
  // useSelector((state) => state.image.profilePre)

  // 이미지 선택 시 미리보기 이미지 설정
  const selectFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    try {
      const reader = new FileReader();
      const file = e.target.files[0];

      const compressedFile = await imageCompression(file, options);

      if (file) {
        reader.readAsDataURL(compressedFile);

        reader.onload = () => {
          setProfile(compressedFile);
          // dispatch(ImageCreators.setProfilePre(reader.result));
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

      <Input
        id="input--image"
        type="file"
        accept="image/png, image/jpeg"
        _onChange={selectFile}
        addstyle={HideElem}
      />

      <ProfileImg size="large" imgUrl={profilePre} />

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
        bgColor="lightGray"
        radius="50%"
      >
        <PhotoCameraIcon />
      </Grid>
    </Grid>
  );
};

export default SelectImage;
