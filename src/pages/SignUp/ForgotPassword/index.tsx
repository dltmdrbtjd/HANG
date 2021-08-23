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
import { Container, MainTitle } from '../../../elements';

interface userInfo {
  pNum: string;
  password: string;
}

const ForgotPassword = () => {
  const [page, setPage] = React.useState<number>(1);
  const [userId, setUserId] = React.useState<string>('');

  const title = ['비밀번호 찾기', '비밀번호 재설정'];

  const ForgotPasswordDB = (password: string) => {
    apis
      .ForgotPwd({ userId, newPassword: password })
      .then(() => history.replace('/signin'))
      .catch((err) => console.log(err));
  };

  return (
    <Container padding="50px 0 20px 0">
      <MainTitle fs="xl" fw="extraBold" margin="0 0 60px">
        {title[page - 1]}
      </MainTitle>

      <Formik
        initialValues={{
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
          ForgotPasswordDB(values.password);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {page === 1 ? (
              <EnterUserInfo
                pNum={formik.values.pNum}
                setPnum={formik.handleChange('pNum')}
                errorMsg={formik.errors.pNum}
                setPage={setPage}
                userId={userId}
                setUserId={setUserId}
              />
            ) : null}

            {page === 2 ? (
              <EnterPassword
                password={formik.values.password}
                setPassword={formik.handleChange('password')}
                pwdErrorMsg={formik.errors.password}
              />
            ) : null}
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default ForgotPassword;
