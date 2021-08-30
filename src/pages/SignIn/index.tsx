import React from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// types
import { SignInType } from 'src/shared/ApiTypes';
// apis
import apis from 'src/shared/api';
// token
import jwtDecode from 'jwt-decode';
import { setToken } from 'src/shared/token';
import { setUserInfo } from 'src/shared/userInfo';
// history
import TermsOfUse from 'src/components/TermsOfUse';
import { history } from 'src/redux/configureStore';
// context
import { signInStatus } from 'src/globalState/signInContext';
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

interface SignInStatus {
  status: boolean;
  errorMsg: string;
}

const SignIn = (): React.ReactElement => {
  const [loginSuccess, setLoginSuccess] = React.useState<SignInStatus>({
    status: true,
    errorMsg: '',
  });

  const [terms, setTerms] = React.useState<boolean>(false);
  const { signIn } = React.useContext(signInStatus);

  const tutorial: string = localStorage.getItem('tutorial');

  const TermsHandler = (url: string) => {
    switch (url) {
      case '/signup':
        return setTerms(true);

      default:
        return history.push(url);
    }
  };

  const SignIn = (userInfo: SignInType): void => {
    apis
      .SignIn(userInfo)
      .then(({ data }) => {
        setToken(data.accessToken);
        setUserInfo('userInfo', jwtDecode(data.accessToken));
      })
      .then(() => signIn())
      .then(() => {
        if (tutorial) history.replace('/');
        else history.push('/mini_tutorial');
      })
      .catch(() => {
        setLoginSuccess({
          status: false,
          errorMsg: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
        });
      });
  };

  return (
    <Container padding="0">
      <Grid height="300px" position="relative">
        <Logo
          width="169px"
          height="162px"
          imgUrl="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Logo.png"
        />
      </Grid>

      <Formik
        initialValues={{ userId: '', password: '' }}
        validationSchema={yup.object({
          userId: yup.string().required('아이디를 입력해주세요'),
          password: yup.string().required('비밀번호를 입력해주세요'),
        })}
        onSubmit={(values: SignInType, { setSubmitting }) => {
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

            {!loginSuccess.status ? (
              <Text fs="sm" color="danger" margin="12px 8px 0">
                {loginSuccess.errorMsg}
              </Text>
            ) : null}

            <Grid margin="150px 0 20px">
              <Button fs="la" fw="bold" type="submit" width="100%">
                로그인
              </Button>

              <Grid>
                {[
                  { content: '비밀번호 찾기', url: '/signup/forgot_pwd' },
                  { content: '회원가입', url: '/signup' },
                ].map(
                  (content: { content: string; url: string }, idx: number) => {
                    return (
                      <Button
                        width="50%"
                        padding="17px 0"
                        bgColor="bgColor"
                        fs="sm"
                        fw="regular"
                        color="darkG"
                        _onClick={() => TermsHandler(content.url)}
                        key={(Date.now() + Math.random() + idx).toString(36)}
                      >
                        {content.content}
                      </Button>
                    );
                  },
                )}
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      {terms && <TermsOfUse setTerms={setTerms} />}
    </Container>
  );
};

export default SignIn;
