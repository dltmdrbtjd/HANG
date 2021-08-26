import React from 'react';
import { Image, Grid, Button } from 'src/elements';
import { Swiper, SwiperSlide } from 'swiper/react';
import { history } from 'src/redux/configureStore';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/components/pagination/pagination.scss';
import { limitWidth } from 'src/styles/Mixin';
import { ButtonStyle, ImageStyle } from './style';
import 'swiper/swiper.scss';
import './swiper.scss';

const Tutorial = () => {
  const [page, setPageNum] = React.useState<number>(0);
  SwiperCore.use([Pagination]);

  const ImageArr = [
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial1.png',
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial2.png',
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial3.png',
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial4.png',
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial5.png',
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial6.png',
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial7.png',
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial8.png',
  ];

  React.useEffect(() => {
    setPageNum(0);
  }, []);

  return (
    <Grid
      position="relative"
      height="100vh"
      bgColor="darkGray"
      addstyle={limitWidth('768px')}
      margin="0 auto"
      overflow="hidden"
    >
      <Swiper
        initialSlide={0}
        spaceBetween={0}
        pagination={{ clickable: true }}
        onSlideChange={() => {
          setPageNum((state) => state + 1);
        }}
      >
        {ImageArr.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image
                src={item}
                addstyle={ImageStyle}
                alt="튜토리얼"
                height="100%"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {page === 0 ? null : (
        <Button
          _onClick={() => history.goBack()}
          width="85%"
          height="54px"
          addstyle={ButtonStyle}
        >
          돌아가기
        </Button>
      )}
    </Grid>
  );
};

export default Tutorial;
