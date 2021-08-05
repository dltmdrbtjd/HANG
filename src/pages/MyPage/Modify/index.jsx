import React, { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
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
// reducer
import { UserCreators } from '../../../redux/modules/user';
import { ImageCreators } from '../../../redux/modules/image';
import { MypageCreators } from '../../../redux/modules/mypage';

const MyPageModify = () => {
  const { userInfo, nickDupCheck } = useSelector(state => ({
    userInfo: state.mypage.myInfo,
    nickDupCheck: state.user.duplicateCheck.nickname,
  }));

  const dispatch = useDispatch();

  const [region, setRegion] = useState(userInfo.region);
  const [city, setCity] = useState(userInfo.city);
  const [profileImg, setProfileImg] = useState(userInfo.profileImg);
  const [modifyInfo, setModifyInfo] = useState({
    nickname: userInfo.nickname,
    intro: userInfo.intro,
  });

  const nickRegExp = () => modifyInfo.nickname.length <= 16;

  const duplicateNickCheck = () => {
    dispatch(
      UserCreators.duplicateNickCheckDB({ nickname: userInfo.nickname }),
    );
  };

  const updateProfile = () => {
    const updateInfo = {
      ...modifyInfo,
      region,
      city,
      profileImg,
    };

    dispatch(MypageCreators.UpdateProfileDB(updateInfo));
  };

  useEffect(() => {
    if (userInfo.profileImg)
      dispatch(ImageCreators.setProfilePre(userInfo.profileImg));
  }, []);

  return (
    <>
      <Grid>
        <MainTitle MainTitle fs="sxl">
          프로필 수정
        </MainTitle>

        <InputImage setProfileImg={setProfileImg} />
      </Grid>

      <Grid>
        <SubTitle fs="la" margin="0 0 12px">
          닉네임
        </SubTitle>

        <Grid display="flex" hoz="space-between">
          <ValidateInput
            id="nickname"
            placeholder="닉네임 입력"
            width="55%"
            value={modifyInfo.nickname}
            _onChange={e => {
              setModifyInfo({ ...modifyInfo, nickname: e.target.value });
            }}
            status={
              (!nickRegExp() && 'danger') || (nickDupCheck.status && 'safe')
            }
          />

          <Button width="42%" _onClick={duplicateNickCheck}>
            중복 확인
          </Button>
        </Grid>

        {!nickRegExp() ? (
          <Text fs="sm" color="danger" margin="8px 0 0">
            닉네임은 16자까지 입력할 수 있습니다
          </Text>
        ) : null}

        {nickRegExp() && !nickDupCheck.status ? (
          <Text fs="sm" color="danger" margin="8px 0 0">
            {nickDupCheck.errorMsg}
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
          _onChange={e => {
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
