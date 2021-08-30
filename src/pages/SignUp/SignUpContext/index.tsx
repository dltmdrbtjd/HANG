import React from 'react';
// api
import apis from 'src/shared/api';
// redux
import { useDispatch } from 'react-redux';
import { activeAlert } from 'src/redux/modules/AlertModule/alert';
// image upload
import uploadProfileImage from 'src/util/imageUpload';
// type
import { userInfo } from '../SignUpWrapper';

export const signUpStatus = React.createContext(null);

const createMemorizeState = (state, setState) => {
  return React.useMemo(
    () => ({
      state,
      setState,
    }),
    [state],
  );
};

const useProvideSignUp = () => {
  const dispatch = useDispatch();

  const [page, setPage] = React.useState<number>(1);

  const [region, setRegion] = React.useState<string>('서울');
  const [city, setCity] = React.useState<string>('');
  const [gender, setGender] = React.useState<number>(null);
  const [age, setAge] = React.useState('');
  const [profile, setProfile] = React.useState(null);

  const pageState = {
    page,
    setPage,
  };
  const regionState = createMemorizeState(region, setRegion);
  const cityState = createMemorizeState(city, setCity);
  const genderState = createMemorizeState(gender, setGender);
  const ageState = createMemorizeState(age, setAge);
  const profileState = createMemorizeState(profile, setProfile);

  const SignUp = (userInfo: userInfo) => {
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

  return {
    pageState,
    regionState,
    cityState,
    genderState,
    ageState,
    profileState,
    SignUp,
  };
};

const SignUpContext = ({ children }) => {
  const signUp = useProvideSignUp();

  return (
    <signUpStatus.Provider value={signUp}>{children}</signUpStatus.Provider>
  );
};

export default SignUpContext;
