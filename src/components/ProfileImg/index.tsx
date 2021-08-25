import React from 'react';
// router
import { useLocation } from 'react-router-dom';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// elements
import { Grid, Image, BlurBox } from '../../elements/index';
// style
import {
  setProfileImageSize,
  ImagePosition,
  DetailImageWrapper,
} from './style';
import { limitWidth } from '../../styles/Mixin';
// image
import defaultProfile from '../../Images/profile.png';

export interface Props {
  size?: string;
  imgUrl: string | null;
}

const ProfileImg = ({ size, imgUrl }: Props) => {
  const path = useLocation().pathname;
  const cloudFrontURL = new RegExp('https://dpcgepgmqx2vj.cloudfront.net');
  const bucketURL = 'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com';

  const [detail, setDetail] = React.useState<boolean>(false);

  return (
    <>
      <Grid
        overflow="hidden"
        radius="50%"
        addstyle={setProfileImageSize(size)}
        position="relative"
        cursor={/detail/.test(path) ? 'pointer' : null}
        _onClick={imgUrl && imgUrl !== 'null' ? () => setDetail(true) : null}
      >
        <Image
          height="100%"
          src={imgUrl && imgUrl !== 'null' ? imgUrl : defaultProfile}
          alt="profile image"
          addstyle={ImagePosition}
        />
      </Grid>

      {detail ? (
        <BlurBox isFlex ver="center" hoz="center">
          <ClickAwayListener onClickAway={() => setDetail(false)}>
            <DetailImageWrapper>
              <Image
                width="auto"
                src={imgUrl.replace(cloudFrontURL, bucketURL)}
                alt="profile image"
                addstyle={limitWidth('100%')}
              />
            </DetailImageWrapper>
          </ClickAwayListener>
        </BlurBox>
      ) : null}
    </>
  );
};

export default ProfileImg;
