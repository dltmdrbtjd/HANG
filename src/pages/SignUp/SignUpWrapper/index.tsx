import React from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// context
import { signUpStatus } from '../SignUpContext';
// elements
import { Container } from '../../../elements';
// components
import StatusBar from '../StatusBar';
// pages
import PhoneValidationCheck from '../PhoneAuth';
import EnterIdPwd from '../EnterIdPwd';
import FillOutProfile from '../FillOutProfile';
import Welcome from '../Welcome';
// validation
import { phoneRegExp, idRegExp, pwdRegExp } from '../../../util/validation';

export interface userInfo {
  pNum: string;
  userId: string;
  password: string;
  nickname: string;
}

const SignUpWrapper = () => {
  const { SignUp } = React.useContext(signUpStatus);

  return (
    <Container padding="0">
      <StatusBar />

      <Formik
        initialValues={{
          pNum: '',
          userId: '',
          password: '',
          nickname: '',
        }}
        validationSchema={yup.object({
          pNum: yup
            .string()
            .matches(phoneRegExp.hyphen, '-을 제외한 숫자만 입력해 주세요')
            .matches(phoneRegExp.number, '숫자만 입력해 주세요')
            .matches(phoneRegExp.phoneNumber, '전화번호 형식이 아닙니다.'),
          userId: yup
            .string()
            .matches(
              idRegExp,
              '아이디는 영문자로 시작해야 하며 영문자 또는 숫자만 사용 가능합니다',
            )
            .min(6, '아이디를 6~14자로 입력해 주세요')
            .max(14, '아이디를 6~14자로 입력해 주세요'),
          password: yup
            .string()
            .matches(
              pwdRegExp,
              '비밀번호는 숫자, 영문자, 특수문자(!@#$%^&*()?_~)만 사용할 수 있습니다',
            )
            .min(8, '비밀번호를 8자 이상 입력해 주세요'),
          nickname: yup
            .string()
            .min(1, '닉네임을 입력해주세요')
            .max(16, '닉네임은 16자까지 입력할 수 있습니다'),
        })}
        onSubmit={(values: userInfo, { setSubmitting }) => {
          SignUp(values);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <PhoneValidationCheck formik={formik} />
            <EnterIdPwd formik={formik} />
            <FillOutProfile formik={formik} />
          </form>
        )}
      </Formik>

      <Welcome />
    </Container>
  );
};

export default SignUpWrapper;
