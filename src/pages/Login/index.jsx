import React from 'react';
// elements
import { Logo, Grid, Button, Input, Text } from '../../elements/index';
// image
import LogoImg from '../../Images/Logo.png';

const Login = () => {
  return (
    <>
      <Grid height="162px" position="relative" margin="0 0 100px">
        <Logo width="169px" height="162px" imgUrl={LogoImg} />
      </Grid>

      <form>
        <Grid margin="0 0 30px">
          <Text lh="2" fs="lg" fw="semiBold">
            아이디
          </Text>
          <Input
            placeholder="아이디를 입력하세요"
            shadow="inset 0px 2px 3px rgba(136, 136, 136, 0.25)"
          />
        </Grid>

        <Grid margin="0 0 130px">
          <Text lh="2" fs="lg" fw="semiBold">
            비밀번호
          </Text>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            shadow="inset 0px 2px 3px rgba(136, 136, 136, 0.25)"
          />
        </Grid>

        <Button fs="la" fw="bold" type="submit" width="100%">
          로그인
        </Button>
      </form>
    </>
  );
};

export default Login;
