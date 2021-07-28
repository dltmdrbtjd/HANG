import React from 'react';
import Text from '../../elements/Text/index';
import { Button, Grid, Input, TextArea, Section } from '../../elements/index';


const Home = () => {
  return (
    <Section bgColor="gray">
      <Button fs="xl">ㅎㅇㅎㅇ</Button>
      <TextArea label="자기소개" placeholder="자기소개를 작성해주세요" />
      <Input label="로그인" placeholder="로그인" />
      <Grid
        margin="50px 0 0 0"
        color="white"
        maxWidth="768px"
        bgColor="brandColor"
      >
        <Text>ㅎㅇㅎㅇㅎㅇㅎㅇㅎ</Text>
      </Grid>
    </Section>
  );
};

export default Home;
