import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/configureStore';
// elements
import {
  Grid,
  MainTitle,
  SubTitle,
  Button,
  TextArea,
  Text,
} from '../../../elements';
// container
import InputImage from '../../../components/SelectImage';
import ValidateInput from '../../SignUp/ValidateInput';
import AreaSelectBox from '../../../components/AreaSelectBox';

const MyPageModify = () => {
  const userInfo: any = useSelector<RootState>((state) => state.mypage.myInfo);

  const dispatch = useDispatch();

  const [region, setRegion] = React.useState(userInfo.region);
  const [city, setCity] = React.useState(userInfo.city);
  const [profileImg, setProfileImg] = React.useState(userInfo.profileImg);
  const [modifyInfo, setModifyInfo] = React.useState({
    nickname: userInfo.nickname,
    intro:
      userInfo.intro === 'none'
        ? `안녕하세요 ${userInfo.nickname}입니다`
        : userInfo.intro,
  });

  const nickRegExp = () => modifyInfo.nickname.length <= 16;

  // const duplicateNickCheck = () => {
  //   dispatch(
  //     UserCreators.duplicateNickCheckDB({ nickname: modifyInfo.nickname }),
  //   );
  // };

  const updateProfile = () => {
    const updateInfo = {
      ...modifyInfo,
      region,
      city,
      profileImg,
    };

    // dispatch(
    //   MypageCreators.UpdateProfileDB(
    //     typeof profileImg === 'object' ? profileImg : null,
    //     updateInfo,
    //   ),
    // );
  };

  React.useEffect(() => {
    // if (userInfo.profileImg && userInfo.profileImg !== 'null')
    //   dispatch(ImageCreators.setProfilePre(userInfo.profileImg));

    setRegion(userInfo.region);
    setCity(userInfo.city);
  }, []);

  return (
    <>
      <Grid>
        <MainTitle fs="sxl">프로필 수정</MainTitle>

        <InputImage setProfile={setProfileImg} />
      </Grid>

      <Grid>
        <SubTitle fs="la" margin="0 0 12px">
          닉네임
        </SubTitle>

        <Grid isFlex hoz="space-between">
          <ValidateInput
            id="nickname"
            placeholder="닉네임 입력"
            width="55%"
            value={modifyInfo.nickname}
            _onChange={(e) => {
              setModifyInfo({ ...modifyInfo, nickname: e.target.value });
            }}
          />
          {/* _onClick={duplicateNickCheck} */}
          <Button width="42%">중복 확인</Button>
        </Grid>

        {!nickRegExp() ? (
          <Text fs="sm" color="danger" margin="8px 0 0">
            닉네임은 16자까지 입력할 수 있습니다
          </Text>
        ) : null}
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 12px">
          지역 선택
        </SubTitle>

        <AreaSelectBox toggle setCity={setRegion} setGu={setCity} />
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 12px">
          자기 소개
        </SubTitle>

        <TextArea
          value={modifyInfo.intro}
          _onChange={(e) => {
            setModifyInfo({ ...modifyInfo, intro: e.target.value });
          }}
        />
      </Grid>

      <Button
        width="100%"
        fs="la"
        margin="20px 0 40px"
        _onClick={updateProfile}
      >
        수정하기
      </Button>
    </>
  );
};

export default MyPageModify;
