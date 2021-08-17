import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// elements
import { Grid, Button, MainTitle, Input, Text } from '../../../../elements';
// reducer
import { UserCreators } from '../../../../redux/modules/user';

const PhoneAuth = ({ setPage, id, setId }) => {
  const dispatch = useDispatch();

  const { phoneVali, smsVali } = useSelector(
    state => ({
      phoneVali: state.user.phoneAuth.phoneVali,
      smsVali: state.user.phoneAuth.smsVali,
    }),
    shallowEqual,
  );

  const [pNum, setPnum] = useState('');
  const [authNum, setAuthNum] = useState('');

  const existsIdAndPhoneNumber = () => {
    UserCreators.ExistsIdAndPhoneNumberDB({ userId: id, pNum });
  };

  const userPhoneAuth = () => {
    dispatch(UserCreators.smsAuthDB({ pNum, status: 0 }));
  };

  const smsAuth = authInfo => {
    dispatch(UserCreators.phoneAuthDB(authInfo));
  };

  return (
    <>
      <MainTitle fs="xl" fw="extraBold" ls="-1px" padding="50px 0 0">
        비밀번호 찾기
      </MainTitle>

      <Grid position="absolute" top="50%" left="0" translate="0, -50%">
        <Grid margin="0 0 15px">
          <Grid isFlex hoz="space-between">
            <Input
              placeholder="아이디 입력"
              value={id}
              _onChange={e => setId(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid
          isFlex
          hoz="space-between"
          margin="0 0 15px"
          //   tab={TabMargin('20px')}
        >
          <Input
            placeholder="전화번호 입력"
            type="tel"
            width="58%"
            value={pNum}
            _onChange={e => setPnum(e.target.value)}
          />

          <Button width="40%" disabled={!pNum} _onClick={() => userPhoneAuth()}>
            인증번호 받기
          </Button>
        </Grid>

        {phoneVali.status ? (
          <Grid isFlex hoz="space-between" margin="0 0 24px">
            <Input
              placeholder="인증번호 입력"
              width="58%"
              value={authNum}
              _onChange={e => setAuthNum(e.target.value)}
            />

            <Button
              width="40%"
              disabled={!authNum}
              _onClick={() => smsAuth({ pNum, aNum: authNum })}
            >
              인증 확인
            </Button>
          </Grid>
        ) : null}

        {!phoneVali.status ? (
          <Text fs="sm" color="danger">
            {phoneVali.errorMsg}
          </Text>
        ) : null}

        {!smsVali.status ? (
          <Text fs="sm" color="danger">
            {smsVali.errorMsg}
          </Text>
        ) : null}
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Button
          fs="la"
          fw="bold"
          width="100%"
          disabled={!smsVali.status}
          _onClick={() => {
            existsIdAndPhoneNumber();
            setPage(1);
          }}
        >
          다음
        </Button>
      </Grid>
    </>
  );
};

export default PhoneAuth;
