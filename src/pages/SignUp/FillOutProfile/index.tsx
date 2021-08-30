import React from 'react';
// context
import { signUpStatus } from '../SignUpContext';
// type
import { Status } from '../PhoneAuth/PhoneAuth';
// elements
import {
  Grid,
  Button,
  Text,
  Label,
  InputRadio,
  MainTitle,
} from '../../../elements';
// components
import NicknameDupCheck from './NicknameDupCheck/indext';
import InputImage from '../../../components/SelectImage';
import AreaSelectBox from '../../../components/AreaSelectBox';
import SelectBox from './SelectBox';
// style
import { setMediaFontSize, setMediaMargin } from '../../../styles/Media';
import SignUpWrapperHeight from '../style';

const FillOutProfile = ({ formik }) => {
  const {
    pageState,
    regionState,
    cityState,
    genderState,
    ageState,
    profileState,
  } = React.useContext(signUpStatus);

  const [nickDupCheck, setNickDupCheck] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });

  return (
    <>
      {pageState.page === 3 ? (
        <Grid isFlex column hoz="space-between" addstyle={SignUpWrapperHeight}>
          <MainTitle fs="xl" fw="extraBold" margin="0 0 60px">
            행에서 사용할
            <br />
            프로필을 설정해주세요
          </MainTitle>

          <InputImage setProfile={profileState.setState} />

          <NicknameDupCheck
            nickname={formik.values.nickname}
            setNickname={formik.handleChange('nickname')}
            nickErrorMsg={formik.errors.nickname}
            nickDupCheck={nickDupCheck}
            setNickDupCheck={setNickDupCheck}
          />

          <Grid
            isFlex
            hoz="space-between"
            addstyle={setMediaMargin('0 0 20px')}
          >
            <Grid>
              <Text
                lh="2"
                fw="semiBold"
                fs="lg"
                addstyle={setMediaFontSize('sxl')}
              >
                연령대
              </Text>

              <SelectBox />
            </Grid>

            <Grid>
              <Text
                lh="2"
                fw="semiBold"
                fs="lg"
                addstyle={setMediaFontSize('sxl')}
              >
                성별
              </Text>

              <Grid isFlex hoz="space-between" ver="center" height="48px">
                {[
                  { id: 'woman', text: '여성' },
                  { id: 'man', text: '남성' },
                ].map((gender, idx) => (
                  <Grid
                    key={(idx + Date.now() + Math.random()).toString(36)}
                    isFlex
                    ver="center"
                  >
                    <InputRadio
                      id={gender.id}
                      checked={genderState.state === idx}
                      _onChange={() => {
                        genderState.setState(idx);
                      }}
                    />

                    <Label id={gender.id}>{gender.text}</Label>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid margin="0 0 15px" addstyle={setMediaMargin('0 0 40px')}>
            <Text
              lh="2"
              fw="semiBold"
              fs="lg"
              addstyle={setMediaFontSize('sxl')}
            >
              거주지 선택
            </Text>

            <AreaSelectBox
              setGu={cityState.setState}
              setCity={regionState.setState}
            />
          </Grid>

          <Button
            disabled={
              !(
                nickDupCheck.status &&
                ageState.state &&
                genderState.state !== null
              )
            }
            type="submit"
            fs="la"
            fw="bold"
            width="100%"
            margin="0 0 20px"
          >
            다음
          </Button>
        </Grid>
      ) : null}
    </>
  );
};

export default FillOutProfile;
