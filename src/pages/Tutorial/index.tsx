import React from 'react';
import { Image, Grid, Button } from 'src/elements';
import { Swiper, SwiperSlide } from 'swiper/react';
import { history } from 'src/redux/configureStore';
import ButtonStyle from './style';
import 'swiper/swiper.scss';

import tutorial1 from '../../Images/Tutorials/tutorial1.png';
import tutorial2 from '../../Images/Tutorials/tutorial2.png';
import tutorial3 from '../../Images/Tutorials/tutorial3.png';
import tutorial4 from '../../Images/Tutorials/tutorial4.png';
import tutorial5 from '../../Images/Tutorials/tutorial5.png';
import tutorial6 from '../../Images/Tutorials/tutorial6.png';
import tutorial7 from '../../Images/Tutorials/tutorial7.png';
import tutorial8 from '../../Images/Tutorials/tutorial8.png';

const Tutorial = () => {
  const ImageArr = [
    tutorial1,
    tutorial2,
    tutorial3,
    tutorial4,
    tutorial5,
    tutorial6,
    tutorial7,
    tutorial8,
  ];

  const SkipBtn = () => {
    localStorage.setItem('tutorial', 'true');
    history.push('/');
  };

  return (
    <Grid position="relative">
      <Swiper initialSlide={1} spaceBetween={0}>
        {ImageArr.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image src={item} alt="튜토리얼" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Button
        _onClick={SkipBtn}
        width="90%"
        height="54px"
        addstyle={ButtonStyle}
      >
        시작하기
      </Button>
    </Grid>
  );
};

export default Tutorial;
