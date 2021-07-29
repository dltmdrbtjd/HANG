import React from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// elements
import { Logo, Grid, Button, Label, Link } from '../../elements/index';
import ValidateInput from '../SignUp/ValidateInput/index';
// image
import LogoImg from '../../Images/Logo.png';

const Login = () => {
  return (
    <>
      <Grid height="300px" position="relative">
        <Logo width="169px" height="162px" imgUrl={LogoImg} />
      </Grid>

      <Formik
        initialValues={{ userId: '', password: '' }}
        validationSchema={yup.object({
          userId: yup.string().min(6).max(14).required(),
          password: yup.string().min(8).max(20).required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Grid margin="0 0 30px">
              <Label id="userId" lh="2" fs="lg" fw="semiBold">
                아이디
              </Label>

              <ValidateInput
                id="userId"
                placeholder="아이디를 입력하세요"
                status={
                  formik.touched.userId && formik.errors.userId
                    ? 'danger'
                    : null
                }
                _onChange={formik.handleChange}
                value={formik.values.userId}
              />
            </Grid>

            <Grid>
              <Label id="password" lh="2" fs="lg" fw="semiBold">
                비밀번호
              </Label>

              <ValidateInput
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                status={
                  formik.touched.password && formik.errors.password
                    ? 'danger'
                    : null
                }
                _onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Grid>

            <Grid position="absolute" bottom="20px" left="0">
              <Button fs="la" fw="bold" type="submit" width="100%">
                로그인
              </Button>

              <Grid>
                <Link
                  href="/find"
                  width="50%"
                  padding="17px 0"
                  fs="sm"
                  hoz="center"
                  color="darkG"
                >
                  아이디 / 비밀번호 찾기
                </Link>

                <Link
                  href="/signup"
                  width="50%"
                  padding="17px 0"
                  fs="sm"
                  hoz="center"
                  color="darkG"
                >
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
