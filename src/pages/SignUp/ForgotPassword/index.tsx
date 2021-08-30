import React from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// history
import { history } from 'src/redux/configureStore';
// apis
import apis from 'src/shared/api';
// validate
import { phoneRegExp, pwdRegExp } from 'src/util/validation';
// page
import EnterUserInfo from './EnterUserInfo';
import EnterPassword from './EnterPassword';
// elements
import { Container } from '../../../elements';

interface userInfo {
  userId: string;
  pNum: string;
  password: string;
}

const ForgotPassword = () => {
  const [page, setPage] = React.useState<number>(1);

  const ForgotPasswordDB = (userId: string, password: string) => {
    apis
      .ForgotPwd({ userId, newPassword: password })
      .then(() => history.replace('/signin'))
      .catch((err) => console.log(err));
  };

  return (
    <Container padding="50px 0 20px 0">
      <Formik
        initialValues={{
          userId: '',
          pNum: '',
          password: '',
        }}
        validationSchema={yup.object({
          pNum: yup
            .string()
            .matches(phoneRegExp.hyphen, '-을 제외한 숫자만 입력해 주세요')
            .matches(phoneRegExp.number, '숫자만 입력해 주세요')
            .matches(phoneRegExp.phoneNumber, '전화번호 형식이 아닙니다.'),
          password: yup
            .string()
            .matches(
              pwdRegExp,
              '비밀번호는 숫자, 영문자, 특수문자(!@#$%^&*()?_~)만 사용할 수 있습니다',
            )
            .min(8, '비밀번호를 8자 이상 입력해 주세요'),
        })}
        onSubmit={(values: userInfo, { setSubmitting }) => {
          ForgotPasswordDB(values.userId, values.password);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {page === 1 ? (
              <EnterUserInfo formik={formik} setPage={setPage} />
            ) : null}

            {page === 2 ? <EnterPassword formik={formik} /> : null}
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default ForgotPassword;
