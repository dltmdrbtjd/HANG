import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// elements
import { Grid, Button, Text, Label, InputRadio } from '../../../elements';
// components
import SelectBox from '../../../components/SelectBox';
import ValidateInput from '../ValidateInput';
import InputImage from '../../../components/SelectImage';
import AreaSelectBox from '../../../components/AreaSelectBox';
// reducer
import { UserCreators } from '../../../redux/modules/user';

const FillOutProfile = ({
  nickname,
  nickErrorMsg,
  setNickname,
  age,
  setAge,
  setGender,
  setRegion,
  setCity,
  setProfile,
}) => {
  const nickDupCheck = useSelector(state => state.user.duplicateCheck.nickname);
  const dispatch = useDispatch();

  const duplicateNickCheck = () => {
    dispatch(UserCreators.duplicateNickCheckDB({ nickname }));
  };

  const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

  return (
    <>
      <InputImage setProfile={setProfile} />

      <Grid margin="0 0 15px">
        <Label fs="lg" id="nickname" lh="2" fw="semiBold">
          닉네임
        </Label>

        <Grid display="flex" hoz="space-between">
          <ValidateInput
            id="nickname"
            placeholder="닉네임 입력"
            width="55%"
            name="nickname"
            value={nickname}
            _onChange={setNickname}
            status={
              (nickErrorMsg && 'danger') || (nickDupCheck.status && 'safe')
            }
          />

          <Button
            width="42%"
            disabled={!nickname || nickErrorMsg}
            _onClick={() => {
              duplicateNickCheck();
            }}
          >
            중복 확인
          </Button>
        </Grid>

        {nickErrorMsg ? (
          <Text fs="sm" color="danger" margin="8px 0 0">
            {nickErrorMsg}
          </Text>
        ) : null}

        {!nickErrorMsg && !nickDupCheck.status ? (
          <Text fs="sm" color="danger" margin="8px 0 0">
            {nickDupCheck.errorMsg}
          </Text>
        ) : null}
      </Grid>

      <Grid display="flex" hoz="space-between">
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

          <Grid display="flex" hoz="space-between" ver="center" height="48px">
            <InputRadio
              name="gender"
              list={[
                { id: 'woman', text: '여성' },
                { id: 'man', text: '남성' },
              ]}
              setState={setGender}
            />
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
        disabled={!nickDupCheck.status || !age}
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
