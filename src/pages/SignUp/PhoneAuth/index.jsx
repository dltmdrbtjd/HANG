import React, { useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// elements
import { Grid, Button, Text } from '../../../elements';
// components
import ValidateInput from '../ValidateInput';
// reducer
import { UserCreators } from '../../../redux/modules/user';
// style
import { TabMargin } from '../style';

const PhoneAuth = ({ pNum, setPnum, setPage, errorMsg }) => {
  const phoneAuth = useSelector(state => state.user.phoneAuth);
  const dispatch = useDispatch();

  const [authNum, setAuthNum] = useState('');

  const userPhoneAuth = () => {
    dispatch(UserCreators.smsAuthDB({ pNum }));
  };

  const smsAuth = authInfo => {
    dispatch(UserCreators.phoneAuthDB(authInfo));
  };

  return (
    <>
      <Grid position="absolute" top="50%" left="0" translate="0, -50%">
        <Grid
          isFlex
          hoz="space-between"
          margin="0 0 15px"
          tab={TabMargin('20px')}
        >
          <ValidateInput
            placeholder="전화번호 입력"
            type="tel"
            width="58%"
            name="pNum"
            value={pNum}
            _onChange={setPnum}
            status={
              (errorMsg && 'danger') || (phoneAuth.phoneVali.status && 'safe')
            }
          />

          <Button
            width="40%"
            disabled={!pNum || errorMsg}
            _onClick={() => {
              userPhoneAuth();
            }}
          >
            인증번호 받기
          </Button>
        </Grid>

        {phoneAuth.phoneVali.status ? (
          <Grid isFlex hoz="space-between" margin="0 0 24px">
            <ValidateInput
              placeholder="인증번호 입력"
              type="number"
              width="58%"
              value={authNum}
              _onChange={e => {
                setAuthNum(e.target.value);
              }}
              status={phoneAuth.smsVali.status && 'safe'}
            />

            <Button
              width="40%"
              disabled={!authNum}
              _onClick={() => {
                smsAuth({ pNum, aNum: authNum });
              }}
            >
              인증 확인
            </Button>
          </Grid>
        ) : null}

        {errorMsg ? (
          <Text fs="sm" color="danger">
            {errorMsg}
          </Text>
        ) : null}

        {!errorMsg && !phoneAuth.phoneVali.status ? (
          <Text fs="sm" color="danger">
            {phoneAuth.phoneVali.errorMsg}
          </Text>
        ) : null}

        {!phoneAuth.smsVali.status ? (
          <Text fs="sm" color="danger">
            {phoneAuth.smsVali.errorMsg}
          </Text>
        ) : null}
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Button
          fs="la"
          fw="bold"
          width="100%"
          disabled={!phoneAuth.smsVali.status}
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
