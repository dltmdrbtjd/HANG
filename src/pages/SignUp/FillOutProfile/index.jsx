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
// style
import { TabMargin } from '../style';

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

      <Grid margin="0 0 15px" tab={TabMargin('20px')}>
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
            status={
              (nickErrorMsg && 'danger') || (nickDupCheck.status && 'safe')
            }
          />

          <Button
            width="40%"
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

      <Grid isFlex hoz="space-between" tab={TabMargin('20px')}>
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

      <Grid margin="0 0 15px" tab={TabMargin('40px')}>
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
