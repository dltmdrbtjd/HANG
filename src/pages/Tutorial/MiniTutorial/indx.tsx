import React from 'react';
import { Image, Grid, Button } from 'src/elements';
import { Swiper, SwiperSlide } from 'swiper/react';
import { history } from 'src/redux/configureStore';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/components/pagination/pagination.scss';
import { ButtonStyle, ImageStyle, boxWidth } from '../style';
import 'swiper/swiper.scss';
import '../swiper.scss';

const Minitutorial = () => {
  const [page, setPageNum] = React.useState<number>(0);
  SwiperCore.use([Pagination]);

  const ImageArr = [
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial1.png',
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial9.png',
    'https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Tutorials/tutorial2.png',
  ];

  const SkipBtn = () => {
    localStorage.setItem('tutorial', 'true');
    history.push('/');
  };

  React.useEffect(() => {
    setPageNum(0);
  }, []);

  return (
    <Grid
      position="relative"
      height="100vh"
      bgColor="darkGray"
      addstyle={boxWidth}
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
          _onClick={SkipBtn}
          width="85%"
          height="54px"
          addstyle={ButtonStyle}
        >
          홈으로 이동
        </Button>
      )}
    </Grid>
  );
};

export default Minitutorial;
