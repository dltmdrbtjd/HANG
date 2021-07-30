import React from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// elements
import {
  Grid,
  Button,
  MainTitle,
  Link,
  Text,
  Label,
  InputRadio,
} from '../../elements';
// components
import StatusBar from './StatusBar';
import Welcome from './Welcome';
import SelectBox from '../../components/SelectBox';
import ValidateInput from './ValidateInput';
import InputImage from '../../components/SelectImage';
import AreaSelectBox from '../../components/AreaSelectBox';

const SignUp = ({ match }) => {
  let { page } = match.params;
  page = parseInt(page, 10);

  const title = [
    '번호\u00A0인증이 필요한\u00A0서비스\u00A0입니다',
    '행에서\u00A0사용할 아이디와\u00A0비밀번호를\u00A0입력해주세요',
    '행에서\u00A0사용할 프로필을\u00A0설정해주세요',
    '당신만의\u00A0행복한\u00A0여행이 시작됩니다!',
  ];

  const options = {
    agencyOptions: ['SKT', 'KT', 'LG U+', '알뜰폰'],
    ageOptions: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
  };

  return (
    <>
      <StatusBar curPage={page} />

      <MainTitle fs="xl" fw="extraBold" ls="-1px" margin="0 0 30px">
        {title[page - 1]}
      </MainTitle>

      {page <= 3 ? (
        <Formik
          initialValues={{ phone: '', userId: '', password: '', nickname: '' }}
          validationSchema={yup.object({
            phone: yup.string().required(),
            userId: yup.string().required(),
            password: yup.string().required(),
            nickname: yup.string().required(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              {page === 1 ? (
                <>
                  <Grid
                    position="absolute"
                    top="50%"
                    left="0"
                    translate="0, -50%"
                  >
                    <SelectBox
                      initailOption="통신사 선택"
                      contents={options.agencyOptions}
                    />

                    <Grid display="flex" hoz="space-between" margin="0 0 15px">
                      <ValidateInput
                        placeholder="전화번호 입력"
                        type="tel"
                        width="55%"
                        name="phone"
                        value={formik.values.phone}
                        _onChange={formik.handleChange('phone')}
                      />

                      <Button width="42%">인증번호 받기</Button>
                    </Grid>

                    <Grid display="flex" hoz="space-between">
                      <ValidateInput
                        placeholder="인증번호 입력"
                        type="number"
                        width="55%"
                      />

                      <Button width="42%">인증 확인</Button>
                    </Grid>
                  </Grid>

                  <Grid position="absolute" bottom="20px" left="0">
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
                  </Grid>
                </>
              ) : null}

              {page === 2 ? (
                <>
                  <Grid
                    position="absolute"
                    top="50%"
                    left="0"
                    translate="0, -50%"
                  >
                    <Grid margin="0 0 15px">
                      <Label fs="lg" id="id" lh="2" fw="semiBold">
                        아이디
                      </Label>

                      <Grid display="flex" hoz="space-between">
                        <ValidateInput
                          id="id"
                          placeholder="아이디 입력"
                          width="55%"
                          name="userId"
                          value={formik.values.userId}
                          _onChange={formik.handleChange('userId')}
                        />

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
                        <ValidateInput
                          id="password"
                          placeholder="비밀번호 입력"
                          type="password"
                          width="55%"
                          name="password"
                          value={formik.values.password}
                          _onChange={formik.handleChange('password')}
                        />

                        <Text fs="xs" width="42%">
                          *8자&nbsp;이상,
                          <br />
                          문자/숫자/기호&nbsp;포함
                        </Text>
                      </Grid>

                      <Grid display="flex" hoz="space-between" ver="center">
                        <ValidateInput
                          placeholder="비밀번호 재확인"
                          type="password"
                          width="55%"
                          name="phone"
                          value={formik.values.phone}
                          _onChange={formik.handleChange('phone')}
                        />

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
              ) : null}

              {page === 3 ? (
                <>
                  <InputImage />

                  <Grid margin="0 0 15px">
                    <Label fs="lg" id="nickname" lh="2" fw="semiBold">
                      닉네임
                    </Label>

                    <Grid display="flex" hoz="space-between">
                      <ValidateInput
                        id="nickname"
                        placeholder="닉네임 입력"
                        width="55%"
                        name="nickname"
                        value={formik.values.nickname}
                        _onChange={formik.handleChange('nickname')}
                      />

                      <Button width="42%">중복 확인</Button>
                    </Grid>
                  </Grid>

                  <Grid display="flex" hoz="space-between">
                    <Grid>
                      <Text lh="2" fw="semiBold" fs="lg">
                        연령대
                      </Text>

                      <SelectBox
                        initailOption="연령대 선택"
                        contents={options.ageOptions}
                      />
                    </Grid>

                    <Grid>
                      <Text lh="2" fw="semiBold" fs="lg">
                        성별
                      </Text>

                      <Grid
                        display="flex"
                        hoz="space-between"
                        ver="center"
                        height="48px"
                      >
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

                    <AreaSelectBox toggle />
                  </Grid>

                  <Button type="submit" fs="la" fw="bold" width="100%">
                    다음
                  </Button>
                </>
              ) : null}
            </form>
          )}
        </Formik>
      ) : null}

      {page === 4 ? <Welcome /> : null}
    </>
  );
};

export default SignUp;
