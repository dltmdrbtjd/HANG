import React, { useState } from 'react';
// elements
import { Grid, Button } from '../../../elements';
// components
import ValidateInput from '../ValidateInput';
// reducer
import { UserCreators } from '../../../redux/modules/user';

const PhoneAuth = ({ pNum, setPnum, setPage }) => {
  const [authNum, setAuthNum] = useState('');

  const userPhoneAuth = () => {
    UserCreators.smsAuthDB({ pNum });
  };

  const smsAuth = authInfo => {
    UserCreators.phoneAuthDB(authInfo);
  };

  return (
    <>
      <Grid position="absolute" top="50%" left="0" translate="0, -50%">
        <Grid display="flex" hoz="space-between" margin="0 0 15px">
          <ValidateInput
            placeholder="전화번호 입력"
            type="tel"
            width="55%"
            name="pNum"
            value={pNum}
            _onChange={setPnum}
          />

          <Button
            width="42%"
            disabled={!pNum}
            _onClick={() => {
              userPhoneAuth();
            }}
          >
            인증번호 받기
          </Button>
        </Grid>

        <Grid display="flex" hoz="space-between">
          <ValidateInput
            placeholder="인증번호 입력"
            type="number"
            width="55%"
            value={authNum}
            _onChange={e => {
              setAuthNum(e.target.value);
            }}
          />

          <Button
            width="42%"
            disabled={!authNum}
            _onClick={() => {
              smsAuth({ pNum: formik.values.pNum, aNum: authNum });
            }}
          >
            인증 확인
          </Button>
        </Grid>
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Button
          fs="la"
          fw="bold"
          width="100%"
          disabled={!pNum}
          _onClick={() => {
            setPage(2);
          }}
        >
          다음
        </Button>
      </Grid>
    </>
  );
};

export default PhoneAuth;
