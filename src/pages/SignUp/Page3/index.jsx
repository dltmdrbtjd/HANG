import React from 'react';
// elements
import {
  Grid,
  Button,
  Input,
  InputRadio,
  Label,
  MainTitle,
  Link,
  Text,
} from '../../../elements';
// components
import SelectBox from '../../../components/SelectBox';
import AreaSelectBox from '../../../components/AreaSelectBox';
import InputImage from '../../../components/SelectImage';

const SignUpPage3 = () => {
  const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

  return (
    <>
      <MainTitle fs="xl" fw="extraBold" ls="-1px" margin="0 0 30px">
        행에서&nbsp;사용할 프로필을&nbsp;설정해주세요
      </MainTitle>

      <InputImage />

      <Grid margin="0 0 15px">
        <Label fs="lg" id="nickname" lh="2" fw="semiBold">
          닉네임
        </Label>

        <Grid display="flex" hoz="space-between">
          <Input id="nickname" placeholder="닉네임 입력" width="55%" />

          <Button width="42%">중복 확인</Button>
        </Grid>
      </Grid>

      <Grid display="flex" hoz="space-between">
        <Grid>
          <Text lh="2" fw="semiBold" fs="lg">
            연령대
          </Text>

          <SelectBox initailOption="연령대 선택" contents={ageOptions} />
        </Grid>

        <Grid>
          <Text lh="2" fw="semiBold" fs="lg">
            성별
          </Text>

          <Grid display="flex" hoz="space-between" ver="center" height="48px">
            <InputRadio
              name="gender"
              list={[
                { id: 'woman', text: '여성' },
                { id: 'man', text: '남성' },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid margin="0 0 15px">
        <Text lh="2" fw="semiBold" fs="lg">
          지역 선택
        </Text>

        <AreaSelectBox />
      </Grid>

      <Link
        href="/signup/2"
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
    </>
  );
};

export default SignUpPage3;
