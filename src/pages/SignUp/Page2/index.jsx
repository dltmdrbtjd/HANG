import React from 'react';
// elements
import {
  Grid,
  Button,
  Input,
  Label,
  MainTitle,
  Link,
  Text,
} from '../../../elements';

const SignUpPage2 = () => {
  return (
    <>
      <MainTitle fs="xl" fw="extraBold" ls="-1px">
        행에서&nbsp;사용할 아이디와&nbsp;비밀번호를 입력해주세요
      </MainTitle>

      <Grid position="absolute" top="50%" left="0" translate="0, -50%">
        <Grid margin="0 0 15px">
          <Label fs="lg" id="id" lh="2" fw="semiBold">
            아이디
          </Label>

          <Grid display="flex" hoz="space-between">
            <Input id="id" placeholder="아이디 입력" width="55%" />

            <Button width="42%">중복 확인</Button>
          </Grid>
        </Grid>

        <Grid>
          <Label fs="lg" id="password" lh="2" fw="semiBold">
            비밀번호
          </Label>

          <Grid
            display="flex"
            hoz="space-between"
            ver="center"
            margin="0 0 15px"
          >
            <Input
              id="password"
              placeholder="비밀번호 입력"
              type="password"
              width="55%"
            />

            <Text fs="xs" width="42%">
              *8자&nbsp;이상,
              <br />
              문자/숫자/기호&nbsp;포함
            </Text>
          </Grid>

          <Grid display="flex" hoz="space-between" ver="center">
            <Input placeholder="비밀번호 재확인" type="password" width="55%" />

            <Text fs="xs" width="42%">
              비밀번호를
              <br />
              다시 한번 입력해주세요
            </Text>
          </Grid>
        </Grid>
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Link
          href="/signup/3"
          bgcolor="brandColor"
          fs="la"
          fw="bold"
          width="100%"
          padding="12px 0"
          color="white"
          hoz="center"
          radius="14px"
          shadow="0 4px 4px rgba(134,134,134,0.3)"
        >
          다음
        </Link>
      </Grid>
    </>
  );
};

export default SignUpPage2;
