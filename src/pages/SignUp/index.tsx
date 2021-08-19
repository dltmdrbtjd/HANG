import React from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// elements
import { MainTitle, Container } from '../../elements';
// components
import StatusBar from './StatusBar';
// pages
import PhoneAuth from './PhoneAuth';
import EnterIdPwd from './EnterIdPwd';
import FillOutProfile from './FillOutProfile';
// validation
import { phoneRegExp, idRegExp, pwdRegExp } from '../../shared/validation';

const SignUp = () => {
  const [page, setPage] = React.useState(1);

  const [region, setRegion] = React.useState('서울특별시');
  const [city, setCity] = React.useState('종로구');
  const [gender, setGender] = React.useState(0);
  const [age, setAge] = React.useState('');
  const [profile, setProfile] = React.useState(null);

  const title = [
    '번호\u00A0인증이 필요한\u00A0서비스\u00A0입니다',
    '행에서\u00A0사용할 아이디와\u00A0비밀번호를\u00A0입력해주세요',
    '행에서\u00A0사용할 프로필을\u00A0설정해주세요',
  ];

  return (
    <Container>
      <StatusBar curPage={page} setPage={setPage} />

      <MainTitle fs="xl" fw="extraBold">
        {title[page - 1]}
      </MainTitle>

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
        onSubmit={(values, { setSubmitting }) => {
          signUp(values);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {page === 1 ? (
              <PhoneAuth
                pNum={formik.values.pNum}
                setPnum={formik.getFieldProps('pNum')}
                setPage={setPage}
                status={1}
                errorMsg={formik.errors.pNum}
              />
            ) : null}

            {page === 2 ? (
              <EnterIdPwd
                userId={formik.values.userId}
                setUserId={formik.handleChange('userId')}
                password={formik.values.password}
                setPassword={formik.handleChange('password')}
                setPage={setPage}
                idErrorMsg={formik.errors.userId}
                pwdErrorMsg={formik.errors.password}
              />
            ) : null}

            {page === 3 ? (
              <FillOutProfile
                nickname={formik.values.nickname}
                setNickname={formik.handleChange('nickname')}
                age={age}
                setAge={setAge}
                setGender={setGender}
                setRegion={setRegion}
                setCity={setCity}
                setProfile={setProfile}
                nickErrorMsg={formik.errors.nickname}
              />
            ) : null}
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;
