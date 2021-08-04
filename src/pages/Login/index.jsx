import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// history
import { history } from '../../redux/configureStore';
// elements
import { Logo, Grid, Button, Label, Text, Input } from '../../elements/index';
// image
import LogoImg from '../../Images/Logo.png';
// reducer
import { UserCreators } from '../../redux/modules/user';

const Login = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.user.loginStatus);

  return (
    <>
      <Grid height="300px" position="relative">
        <Logo width="169px" height="162px" imgUrl={LogoImg} />
      </Grid>

      <Formik
        initialValues={{ userId: '', password: '' }}
        validationSchema={yup.object({
          userId: yup.string().required('아이디를 입력해주세요'),
          password: yup.string().required('비밀번호를 입력해주세요'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(UserCreators.logInDB(values));
          setSubmitting(false);
        }}
      >
        {formik => (
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

            {!loginStatus.status ? (
              <Text fs="sm" color="danger" margin="12px 8px 0">
                {loginStatus.errorMsg}
              </Text>
            ) : null}

            <Grid position="absolute" bottom="20px" left="0">
              <Button fs="la" fw="bold" type="submit" width="100%">
                로그인
              </Button>

              <Grid>
                <Button
                  width="50%"
                  padding="17px 0"
                  bgColor="bgColor"
                  fs="sm"
                  color="darkG"
                  _onClick={() => {
                    history.push('/signup');
                  }}
                >
                  아이디 / 비밀번호 찾기
                </Button>

                <Button
                  width="50%"
                  padding="17px 0"
                  bgColor="bgColor"
                  fs="sm"
                  color="darkG"
                  _onClick={() => {
                    history.push('/signup');
                  }}
                >
                  회원가입
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
