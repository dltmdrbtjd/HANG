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
import { Status } from '../../SignUp/PhoneAuth/PhoneAuth';
// elements
import {
  Grid,
  MainTitle,
  SubTitle,
  Button,
  TextArea,
  Container,
  Text,
} from '../../../elements';
// components
import InputImage from '../../../components/SelectImage';
import AreaSelectBox from '../../../components/AreaSelectBox';
import NicknameDupCheck from '../../../pages/SignUp/FillOutProfile/NicknameDupCheck/indext';
import Tag from '../../../components/Tag';
import { tendencyKeyword, mbti } from '../../../components/Tag/tagList';
// style
import { limitWidth } from '../../../styles/Mixin';
import { setMediaBoxSize, setMediaFontSize } from '../../../styles/Media';
import FlexWrapper from './style';

const MyPageModify = () => {
  const dispatch = useDispatch();
  const userInfo: any = useTypedSelector((state) => state.mypage.myInfo);

  const [region, setRegion] = React.useState(userInfo.region);
  const [city, setCity] = React.useState(userInfo.city);
  const [profileImg, setProfileImg] = React.useState(userInfo.profileImg);
  const [nickname, setNickname] = React.useState(userInfo.nickname);
  const [intro, setIntro] = React.useState(
    userInfo.intro && userInfo.intro === 'none'
      ? `안녕하세요 ${nickname}입니다`
      : userInfo.intro,
  );

  const [nickDupCheck, setNickDupCheck] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });

  const isDisabled = !(
    nickname &&
    nickname.length <= 16 &&
    intro.length <= 100
  );

  const updateProfile = () => {
    const updateInfo = {
      ...userInfo,
      nickname,
      intro,
      region,
      city,
    };

    uploadProfileImage(profileImg).then((res) => {
      const updateProfile = {
        ...updateInfo,
        profileImg: res,
      };

      apis
        .UpdateProfile(updateProfile)
        .then(() => {
          const userInfo = getUserInfo('userInfo');

          if (nickname !== userInfo.nickname)
            setUserInfo('userInfo', { ...userInfo, nickname });
        })
        .then(() => dispatch(UpdateProfile(updateProfile)))
        .then(() => history.replace('/mypage'))
        .catch((err) => console.log(err));
    });
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
        setNickname={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNickname(e.target.value)
        }
        nickErrorMsg={
          (nickname.length < 1 && '닉네임을 입력해주세요.') ||
          (nickname.length > 16 && '닉네임은 16자까지 입력할 수 있습니다')
        }
        nickDupCheck={nickDupCheck}
        setNickDupCheck={setNickDupCheck}
      />

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 12px" addstyle={setMediaFontSize('sxl')}>
          지역 선택
        </SubTitle>

        <AreaSelectBox
          setCity={setRegion}
          setGu={setCity}
          city={regionArr[userInfo.region]}
          region={userInfo.city}
        />
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 18px" addstyle={setMediaFontSize('sxl')}>
          본인을 소개해 주세요
        </SubTitle>

        <Grid margin="0 0 24px">
          <Grid isFlex hoz="space-between" ver="center" margin="0 0 12px">
            <SubTitle addstyle={setMediaFontSize('la')}>성향 키워드</SubTitle>

            <Text fs="xs" color="darkGray">
              *3개까지 선택할 수 있어요
            </Text>
          </Grid>

          <Grid addstyle={limitWidth('500px')}>
            <Tag
              fs="sm"
              bgColor="white"
              cursor="pointer"
              tabFont="lg"
              padding="7px 19px"
              list={tendencyKeyword}
            />
          </Grid>
        </Grid>

        <Grid margin="0 0 50px">
          <SubTitle margin="0 0 12px" addstyle={setMediaFontSize('la')}>
            MBTI
          </SubTitle>

          <Grid addstyle={FlexWrapper}>
            <Tag
              fs="sm"
              bgColor="white"
              cursor="pointer"
              tabFont="lg"
              padding="7px 19px"
              list={mbti}
            />
          </Grid>
        </Grid>

        <Grid>
          <SubTitle margin="0 0 12px" addstyle={setMediaFontSize('la')}>
            자기소개
          </SubTitle>

          <TextArea
            value={intro}
            _onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIntro(e.target.value)
            }
            addstyle={setMediaBoxSize(null, '170px')}
          />

          <Grid fs="xs" textAlign="right">
            {intro.length} / 100자
          </Grid>
        </Grid>
      </Grid>

      <Button
        width="100%"
        fs="la"
        margin="24px 0 40px"
        disabled={
          isDisabled ||
          (userInfo.nickname !== nickname && nickDupCheck.status !== 1)
        }
        _onClick={updateProfile}
      >
        수정하기
      </Button>
    </Container>
  );
};

export default MyPageModify;
