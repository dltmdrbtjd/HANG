import React, { useEffect, useState } from 'react';
// history
import { history } from '../../redux/configureStore';
// elements
import { MainTitle, Text, Strong, Image, Grid, Button } from '../../elements';
// components
import StatusBar from './StatusBar';
// images
import OnboardingImg1 from '../../Images/onboarding1.svg';
import OnboardingImg2 from '../../Images/onboarding2.svg';
import OnboardingImg3 from '../../Images/onboarding3.svg';

const Onboarding = () => {
  const [page, setPage] = useState(1);

  const images = [OnboardingImg1, OnboardingImg2, OnboardingImg3];
  const texts = [
    '당신만 알고 있는 맛집, 숨은 명소들을 알려주는 여행 길잡이가 되어보세요',
    '내가 처음 가는 곳을 가장 잘 아는 친구와 동네 구석구석 여행해 보세요',
    '당신만의 행복한 여행을 만들러 갈까요?',
  ];

  useEffect(() => {
    let moveX;

    const createCalendar = event => {
      const movement = moveX - event.changedTouches[0].clientX;

      if (movement > 70) {
        if (page >= 3) return;

        setPage(curPage => curPage + 1);
      }

      if (movement < -70) {
        if (page <= 1) return;

        setPage(curPage => curPage - 1);
      }
    };

    window.addEventListener('touchstart', event => {
      moveX = event.touches[0].clientX;
    });

    window.addEventListener('touchend', createCalendar);

    return () => {
      window.removeEventListener('touchstart', event => {
        moveX = event.touches[0].clientX;
      });

      window.removeEventListener('touchend', createCalendar);
    };
  }, [page]);

  return (
    <Grid position="relative" height="100vh" margin="0 auto">
      <StatusBar curPage={page} />

      {page === 1 ? (
        <MainTitle fs="xxl" fw="black" margin="0 0 30px">
          나만 아는 여
          <Strong fs="xxl" fw="black" color="brandColor">
            행
          </Strong>
        </MainTitle>
      ) : null}

      {page === 2 ? (
        <MainTitle fs="xxl" fw="black" margin="0 0 30px">
          또, 너만 아는 여
          <Strong fs="xxl" fw="black" color="brandColor">
            행
          </Strong>
        </MainTitle>
      ) : null}

      {page === 3 ? (
        <MainTitle fs="xxl" fw="black" margin="0 0 30px">
          <Strong fs="xxl" fw="black" color="brandColor">
            행
          </Strong>
          복하게, 여
          <Strong fs="xxl" fw="black" color="brandColor">
            행
          </Strong>
          하라
        </MainTitle>
      ) : null}

      <Text fs="lg" wb="keep-all">
        {texts[page - 1]}
      </Text>

      <Grid position="absolute" top={page === 2 ? '40%' : '33%'} left="0">
        <Image src={images[page - 1]} />
      </Grid>

      {page === 3 ? (
        <Grid position="absolute" bottom="20px" left="0">
          <Button
            fs="la"
            fw="bold"
            width="100%"
            margin="0 0 15px"
            _onClick={() => history.push('/signup')}
          >
            회원가입
          </Button>

          <Button
            fs="sm"
            color="darkG"
            bgColor="bgColor"
            width="100%"
            _onClick={() => history.push('/login')}
          >
            로그인
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
};

Onboarding.defaultProps = {};

export default Onboarding;
