import React from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// api
import apis from 'src/shared/api';
// redux
import { useDispatch } from 'react-redux';
import { activeAlert } from 'src/redux/modules/AlertModule/alert';
// image upload
import uploadProfileImage from 'src/util/imageUpload';
// elements
import { Container } from '../../elements';
// components
import StatusBar from './StatusBar';
// pages
import PhoneValidationCheck from './PhoneAuth';
import EnterIdPwd from './EnterIdPwd';
import FillOutProfile from './FillOutProfile';
import Welcome from './Welcome';
// validation
import { phoneRegExp, idRegExp, pwdRegExp } from '../../util/validation';

interface userInfo {
  pNum: string;
  userId: string;
  password: string;
  nickname: string;
}

const SignUp = () => {
  const dispatch = useDispatch();

  const [page, setPage] = React.useState<number>(4);

  const [region, setRegion] = React.useState<string>('서울');
  const [city, setCity] = React.useState<string>('강남구');
  const [gender, setGender] = React.useState<number>(0);
  const [age, setAge] = React.useState('');
  const [profile, setProfile] = React.useState(null);

  const SignUpDB = (userInfo: userInfo) => {
    if (!profile) {
      dispatch(
        activeAlert({
          status: true,
          errorMsg: '프로필 이미지를 등록해주세요.',
        }),
      );

      return;
    }

    uploadProfileImage(profile).then((res) => {
      const profileImg = res;

      apis
        .SignUp({
          ...userInfo,
          profileImg,
          region,
          city,
          gender,
          age: parseInt(age, 10),
        })
        .then(() => setPage((page: number) => page + 1))
        .catch((err) => console.log(err));
    });
  };

  return (
    <Container padding="0">
      <StatusBar curPage={page} setPage={setPage} />

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
          SignUpDB(values);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {page === 1 ? (
              <PhoneValidationCheck
                pNum={formik.values.pNum}
                setPnum={formik.handleChange('pNum')}
                errorMsg={formik.errors.pNum}
                setPage={setPage}
              />
            ) : null}

            {page === 2 ? (
              <EnterIdPwd
                userId={formik.values.userId}
                setUserId={formik.handleChange('userId')}
                idErrorMsg={formik.errors.userId}
                password={formik.values.password}
                setPassword={formik.handleChange('password')}
                pwdErrorMsg={formik.errors.password}
                setPage={setPage}
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
    </Container>
  );
};

export default SignUp;
