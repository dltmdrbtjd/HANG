import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { useTypedSelector, history } from 'src/redux/configureStore';
import { UpdateProfile } from 'src/redux/modules/MyPageModule/mypage';
// function
import uploadProfileImage from 'src/util/imageUpload';
// apis
import apis from 'src/shared/api';
// token
import { getUserInfo, setUserInfo } from 'src/shared/userInfo';
// type
import { Status } from '../../SignUp/PhoneAuth';
// elements
import {
  Grid,
  MainTitle,
  SubTitle,
  Button,
  TextArea,
  Container,
} from '../../../elements';
// container
import InputImage from '../../../components/SelectImage';
import AreaSelectBox from '../../../components/AreaSelectBox';
import NicknameDupCheck from '../../../pages/SignUp/FillOutProfile/NicknameDupCheck/indext';

const MyPageModify = () => {
  const dispatch = useDispatch();
  const userInfo: any = useTypedSelector((state) => state.mypage.myInfo);

  const [region, setRegion] = React.useState(userInfo.region);
  const [city, setCity] = React.useState(userInfo.city);
  const [profileImg, setProfileImg] = React.useState(userInfo.profileImg);
  const [nickname, setNickname] = React.useState(userInfo.nickname);
  const [intro, setIntro] = React.useState(
    userInfo.intro === 'none'
      ? `안녕하세요 ${userInfo.nickname}입니다`
      : userInfo.intro,
  );

  const [nickDupCheck, setNickDupCheck] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });

  const updateProfile = () => {
    const updateInfo = {
      nickname,
      intro,
      region,
      city,
      profileImg,
    };

    if (profileImg && typeof profileImg === 'object') {
      uploadProfileImage(profileImg).then((res) => {
        const updateProfile = {
          ...updateInfo,
          profileImg: res,
        };

        apis
          .UpdateProfile(updateProfile)
          .then(() => {
            const newNickname = updateInfo.nickname;
            const { nickname } = getUserInfo();

            if (newNickname !== nickname) {
              setUserInfo({ ...userInfo, nickname: newNickname });
            }
          })
          .then(() => dispatch(UpdateProfile(updateProfile)))
          .then(() => history.replace('/mypage'))
          .catch((err) => console.log(err));
      });

      return;
    }

    apis
      .UpdateProfile(updateInfo)
      .then(() => {
        const newNickname = updateInfo.nickname;
        const { nickname } = getUserInfo();

        if (newNickname !== nickname) {
          setUserInfo({ ...userInfo, nickname: newNickname });
        }
      })
      .then(() => dispatch(UpdateProfile(updateInfo)))
      .then(() => history.replace('/mypage'))
      .catch((err) => console.log(err));
  };

  const regionArr = { 서울: 0, 부산: 1, 제주: 2 };

  React.useEffect(() => {
    setRegion(userInfo.region);
    setCity(userInfo.city);
  }, []);

  return (
    <Container>
      <Grid>
        <MainTitle fs="sxl">프로필 수정</MainTitle>

        <InputImage setProfile={setProfileImg} profile={userInfo.profileImg} />
      </Grid>

      <NicknameDupCheck
        nickname={nickname}
        setNickname={(e) => setNickname(e.target.value)}
        nickErrorMsg={
          nickname.length > 16 ? '닉네임은 16자까지 입력할 수 있습니다' : null
        }
        nickDupCheck={nickDupCheck}
        setNickDupCheck={setNickDupCheck}
      />

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 12px">
          지역 선택
        </SubTitle>

        <AreaSelectBox
          toggle
          setCity={setRegion}
          setGu={setCity}
          city={regionArr[userInfo.region]}
          region={userInfo.city}
        />
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 12px">
          자기 소개
        </SubTitle>

        <TextArea value={intro} _onChange={(e) => setIntro(e.target.value)} />
      </Grid>

      <Button
        width="100%"
        fs="la"
        margin="20px 0 40px"
        _onClick={updateProfile}
      >
        수정하기
      </Button>
    </Container>
  );
};

export default MyPageModify;
