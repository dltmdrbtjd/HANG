import React from 'react';
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

const FillOutProfile = ({
  nickname,
  setNickname,
  nickErrorMsg,
  age,
  setAge,
  setGender,
  setRegion,
  setCity,
  setProfile,
}) => {
  const [nickDupCheck, setNickDupCheck] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });
  const [radio, setRadio] = React.useState<number>(0);
  const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

  return (
    <Grid isFlex column hoz="space-between" addstyle={SignUpWrapperHeight}>
      <MainTitle fs="xl" fw="extraBold" margin="0 0 60px">
        행에서 사용할
        <br />
        프로필을 설정해주세요
      </MainTitle>

      <InputImage setProfile={setProfile} />

      <NicknameDupCheck
        nickname={nickname}
        setNickname={setNickname}
        nickErrorMsg={nickErrorMsg}
        nickDupCheck={nickDupCheck}
        setNickDupCheck={setNickDupCheck}
      />

      <Grid isFlex hoz="space-between" addstyle={setMediaMargin('0 0 20px')}>
        <Grid>
          <Text lh="2" fw="semiBold" fs="lg" addstyle={setMediaFontSize('sxl')}>
            연령대
          </Text>

          <SelectBox
            initailOption="연령대 선택"
            contents={ageOptions}
            setState={setAge}
          />
        </Grid>

        <Grid>
          <Text lh="2" fw="semiBold" fs="lg" addstyle={setMediaFontSize('sxl')}>
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
                  checked={radio === idx}
                  _onChange={() => {
                    setRadio(idx);
                    setGender(idx);
                  }}
                />

                <Label id={gender.id}>{gender.text}</Label>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid margin="0 0 15px" addstyle={setMediaMargin('0 0 40px')}>
        <Text lh="2" fw="semiBold" fs="lg" addstyle={setMediaFontSize('sxl')}>
          지역 선택
        </Text>

        <AreaSelectBox setGu={setCity} setCity={setRegion} />
      </Grid>

      <Button
        disabled={!(nickDupCheck.status && age)}
        type="submit"
        fs="la"
        fw="bold"
        width="100%"
        margin="0 0 20px"
      >
        다음
      </Button>
    </Grid>
  );
};

export default FillOutProfile;
