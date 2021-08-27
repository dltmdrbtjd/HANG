import React from 'react';
// router
import { useLocation } from 'react-router-dom';
// material
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// elements
import { Image, BlurBox } from '../../elements/index';
// style
import {
  ImageLazyLoadingWrapper,
  ImageFit,
  ImagePlaceholder,
  DetailImageWrapper,
} from './style';
import { limitWidth } from '../../styles/Mixin';

export interface Props {
  size?: string;
  imgUrl: string | null;
}

const ProfileImg = ({ size, imgUrl }: Props) => {
  const path = useLocation().pathname;
  const cloudFrontURL = /^https:\/\/dpcgepgmqx2vj\.cloudfront\.net/;
  const bucketURL = 'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com';

  const [detail, setDetail] = React.useState<boolean>(false);
  const activeImgDetail = /detail|mypage/;

  const [target, setTarget] = React.useState(null);
  const [imageLoad, setImageLoad] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const options = { threshold: 0.3 };

    const infiniteScroll = ([entries], observer: IntersectionObserver) => {
      if (entries.isIntersecting) {
        observer.unobserve(entries.target);
        setIsVisible(true);
      }
    };

    const io = new IntersectionObserver(infiniteScroll, options);
    if (target) io.observe(target);

    return () => io && io.disconnect();
  }, [target]);

  return (
    <>
      <ImageLazyLoadingWrapper
        ref={setTarget}
        cursor={activeImgDetail.test(path) ? 'pointer' : null}
        size={size}
        onClick={
          activeImgDetail.test(path) && imgUrl ? () => setDetail(true) : null
        }
      >
        {imageLoad || <ImagePlaceholder />}

        {isVisible ? (
          <Image
            height="100%"
            src={
              imgUrl ||
              'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/profile.png'
            }
            alt="profile image"
            addstyle={ImageFit}
            _onLoad={() => setImageLoad(true)}
          />
        ) : null}
      </ImageLazyLoadingWrapper>

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
