import React, { useEffect, useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// elements
import { MainTitle } from '../../elements';
// components
import StatusBar from './StatusBar';
// reducer
import { UserCreators } from '../../redux/modules/user';
// pages
import PhoneAuth from './PhoneAuth';
import EnterIdPwd from './EnterIdPwd';
import FillOutProfile from './FillOutProfile';
import Welcome from './Welcome';
// validation
import { phoneRegExp, idRegExp, pwdRegExp } from '../../shared/validation';

const SignUp = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const [region, setRegion] = useState('서울특별시');
  const [city, setCity] = useState('종로구');
  const [gender, setGender] = useState(0);
  const [age, setAge] = useState('');
  const [profile, setProfile] = useState(null);

  const [pwdCheck, setPwdCheck] = useState('');

  const signUp = values => {
    const userInfo = {
      ...values,
      region,
      city,
      gender,
      age: parseInt(age, 10),
    };

    dispatch(UserCreators.signUpDB(profile, userInfo));
  };

  const title = [
    '번호\u00A0인증이 필요한\u00A0서비스\u00A0입니다',
    '행에서\u00A0사용할 아이디와\u00A0비밀번호를\u00A0입력해주세요',
    '행에서\u00A0사용할 프로필을\u00A0설정해주세요',
  ];

  useEffect(() => {
    return () => {
      dispatch(UserCreators.initializeSignUpInfo());
    };
  }, []);

  return (
    <>
      <StatusBar curPage={page} setPage={setPage} />

      <MainTitle fs="xl" fw="extraBold" ls="-1px" margin="0 0 30px">
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
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            {page === 1 ? (
              <PhoneAuth
                pNum={formik.values.pNum}
                setPnum={formik.handleChange('pNum')}
                setPage={setPage}
                errorMsg={formik.errors.pNum}
              />
            ) : null}

            {page === 2 ? (
              <EnterIdPwd
                userId={formik.values.userId}
                setUserId={formik.handleChange('userId')}
                password={formik.values.password}
                setPassword={formik.handleChange('password')}
                pwdCheck={pwdCheck}
                setPwdCheck={setPwdCheck}
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

      {page === 4 ? <Welcome /> : null}
    </>
  );
};

export default SignUp;
