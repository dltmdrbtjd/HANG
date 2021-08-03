import React, { useState } from 'react';
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

const SignUp = () => {
  const [page, setPage] = useState(1);

  const [city, setCity] = useState('서울특별시');
  const [region, setRegion] = useState('종로구');
  const [gender, setGender] = useState('여성');
  const [age, setAge] = useState('');

  const signUp = values => {
    const userInfo = {
      ...values,
      region,
      city,
      gender,
      age: parseInt(age, 10),
    };

    UserCreators.signUpDB(userInfo);
  };

  const title = [
    '번호\u00A0인증이 필요한\u00A0서비스\u00A0입니다',
    '행에서\u00A0사용할 아이디와\u00A0비밀번호를\u00A0입력해주세요',
    '행에서\u00A0사용할 프로필을\u00A0설정해주세요',
    '당신만의\u00A0행복한\u00A0여행이 시작됩니다!',
  ];

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
          pNum: yup.string().required(),
          userId: yup.string().required(),
          password: yup.string().required(),
          nickname: yup.string().required(),
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
              />
            ) : null}

            {page === 2 ? (
              <EnterIdPwd
                userId={formik.values.userId}
                setUserId={formik.handleChange('userId')}
                password={formik.values.password}
                setPassword={formik.handleChange('password')}
                setPage={setPage}
              />
            ) : null}

            {page === 3 ? (
              <FillOutProfile
                nickname={formik.values.nickname}
                setNickname={formik.handleChange('nickname')}
                setAge={setAge}
                setGender={setGender}
                setRegion={setRegion}
                setCity={setCity}
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
