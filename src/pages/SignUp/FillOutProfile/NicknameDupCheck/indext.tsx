import React from 'react';
// apis
import apis from 'src/shared/api';
// type
import { currentType } from '../../PhoneAuth/PhoneAuth';
// elements
import { Grid, Label, Button, Text } from '../../../../elements';
// components
import ValidateInput from '../../ValidateInput';

const NicknameDupCheck = ({
  nickname,
  setNickname,
  nickErrorMsg,
  nickDupCheck,
  setNickDupCheck,
}) => {
  const NickDuplicateCheck = () => {
    apis
      .Duplicate({ nickname })
      .then(() => setNickDupCheck({ status: 1, errorMsg: '' }))
      .catch(() =>
        setNickDupCheck({ status: 2, errorMsg: '중복되는 닉네임이 있습니다.' }),
      );
  };

  return (
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
  );
};

export default NicknameDupCheck;
