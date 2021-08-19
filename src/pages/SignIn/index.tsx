import React from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// api
import apis from 'src/shared/api';
// token
import { setToken } from 'src/shared/token';
// user info
import { setUserInfo } from 'src/shared/userInfo';
// history
import { history } from '../../redux/configureStore';
// elements
import {
  Logo,
  Grid,
  Button,
  Label,
  Text,
  Input,
  Container,
} from '../../elements/index';
// image
import LogoImg from '../../Images/Logo.png';

interface UserInfo {
  userId: string;
  password: string;
}

interface SignInStatus {
  status: boolean;
  errorMsg: string;
}

const SignIn = (): React.ReactElement => {
  interface Value {
    userId: string;
    password: string;
  }

  const [signInStatus, setSignInStatus] = React.useState<SignInStatus>({
    status: false,
    errorMsg: '',
  });

  const SignIn = (userInfo: UserInfo) => {
    apis
      .Login(userInfo)
      .then(({ data }) => setToken(data.accessToken))
      .then(() => setUserInfo())
      .then(() => history.replace('/'))
      .catch(() => {
        setSignInStatus({
          status: false,
          errorMsg: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
        });
      });
  };

  return (
    <Container>
      <Grid height="300px" position="relative">
        <Logo width="169px" height="162px" imgUrl={LogoImg} />
      </Grid>

      <Formik
        initialValues={{ userId: '', password: '' }}
        validationSchema={yup.object({
          userId: yup.string().required('아이디를 입력해주세요'),
          password: yup.string().required('비밀번호를 입력해주세요'),
        })}
        onSubmit={(values: Value, { setSubmitting }) => {
          SignIn(values);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Grid margin="0 0 30px">
              <Label id="userId" lh="2.3" fs="lg" fw="semiBold">
                아이디
              </Label>

              <Input
                id="userId"
                placeholder="아이디를 입력하세요"
                {...formik.getFieldProps('userId')}
              />

              {formik.touched.userId && formik.errors.userId ? (
                <Text fs="sm" color="danger" margin="8px 8px 0">
                  {formik.errors.userId}
                </Text>
              ) : null}
            </Grid>

            <Grid>
              <Label id="password" lh="2.3" fs="lg" fw="semiBold">
                비밀번호
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                {...formik.getFieldProps('password')}
              />

              {formik.touched.password && formik.errors.password ? (
                <Text fs="sm" color="danger" margin="8px 8px 0">
                  {formik.errors.password}
                </Text>
              ) : null}
            </Grid>

            {!signInStatus.status ? (
              <Text fs="sm" color="danger" margin="12px 8px 0">
                {signInStatus.errorMsg}
              </Text>
            ) : null}

            <Grid margin="150px 0 20px">
              <Button fs="la" fw="bold" type="submit" width="100%">
                로그인
              </Button>

              <Grid>
                <Button
                  width="50%"
                  padding="17px 0"
                  bgColor="bgColor"
                  fs="sm"
                  fw="regular"
                  color="darkG"
                  _onClick={() => history.push('/signup/forgot_pwd')}
                >
                  비밀번호 찾기
                </Button>

                <Button
                  width="50%"
                  padding="17px 0"
                  bgColor="bgColor"
                  fs="sm"
                  fw="regular"
                  color="darkG"
                  _onClick={() => history.push('/signup')}
                >
                  회원가입
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default SignIn;