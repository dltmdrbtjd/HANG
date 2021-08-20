import React from 'react';
// api
import apis from 'src/shared/api';
// types
import { Status, currentType } from '../PhoneAuth';
// elements
import { Grid, Button, Text, Label, InputRadio } from '../../../elements';
// components
import ValidateInput from '../ValidateInput';
import InputImage from '../../../components/SelectImage';
import AreaSelectBox from '../../../components/AreaSelectBox';
import SelectBox from './SelectBox';

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

  const NickDuplicateCheck = () => {
    apis
      .Duplicate({ nickname })
      .then(() => setNickDupCheck({ status: 1, errorMsg: '' }))
      .catch(() =>
        setNickDupCheck({ status: 2, errorMsg: '중복되는 닉네임이 있습니다.' }),
      );
  };

  const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

  return (
    <>
      <InputImage setProfile={setProfile} />

      <Grid margin="0 0 15px">
        <Label fs="lg" id="nickname" lh="2" fw="semiBold">
          닉네임
        </Label>

        <Grid isFlex hoz="space-between">
          <ValidateInput
            id="nickname"
            placeholder="닉네임 입력"
            width="58%"
            name="nickname"
            value={nickname}
            _onChange={setNickname}
            status={currentType[nickDupCheck.status]}
          />

          <Button
            width="40%"
            disabled={!(nickname && !nickErrorMsg)}
            _onClick={NickDuplicateCheck}
          >
            중복 확인
          </Button>
        </Grid>

        {nickErrorMsg || nickDupCheck.status === 2 ? (
          <Text fs="sm" color="danger" margin="8px 0 0">
            {nickErrorMsg || nickDupCheck.errorMsg}
          </Text>
        ) : null}
      </Grid>

      <Grid isFlex hoz="space-between">
        <Grid>
          <Text lh="2" fw="semiBold" fs="lg">
            연령대
          </Text>

          <SelectBox
            initailOption="연령대 선택"
            contents={ageOptions}
            setState={setAge}
          />
        </Grid>

        <Grid>
          <Text lh="2" fw="semiBold" fs="lg">
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

      <Grid margin="0 0 15px">
        <Text lh="2" fw="semiBold" fs="lg">
          지역 선택
        </Text>

        <AreaSelectBox toggle setGu={setCity} setCity={setRegion} />
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
    </>
  );
};

export default FillOutProfile;
