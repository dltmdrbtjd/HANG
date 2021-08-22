import React from 'react';
// apis
import apis from 'src/shared/api';
// elements
import { Grid, Input, Button, Text } from 'src/elements';
// page
import PhoneAuth, { Status } from '../../PhoneAuth/PhoneAuth';

const EnterUserInfo = ({
  pNum,
  setPnum,
  errorMsg,
  userId,
  setUserId,
  setPage,
}) => {
  const [existsStatus, setExistsStatus] = React.useState({
    status: true,
    errorMsg: '',
  });
  const [smsVeri, setSMSVeri] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });

  const ExistsIdAndPhoneNumberDB = () => {
    apis
      .Exists({ userId, pNum })
      .then(() => setPage((page: number) => page + 1))
      .catch(() =>
        setExistsStatus({
          status: false,
          errorMsg: '가입되지 않은 아이디이거나 등록되지 않은 전화번호입니다.',
        }),
      );
  };

  return (
    <>
      <Grid position="absolute" top="50%" left="0" translate="0, -50%">
        <Grid margin="0 0 15px">
          <Input
            placeholder="아이디 입력"
            value={userId}
            _onChange={(e) => setUserId(e.target.value)}
          />
        </Grid>

        <PhoneAuth
          pNum={pNum}
          setPnum={setPnum}
          errorMsg={errorMsg}
          status={0}
          smsVeri={smsVeri}
          setSMSVeri={setSMSVeri}
        />

        {!existsStatus.status ? (
          <Text fs="sm" color="danger">
            {existsStatus.errorMsg}
          </Text>
        ) : null}
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Button
          fs="la"
          fw="bold"
          width="100%"
          disabled={smsVeri.status !== 1}
          _onClick={ExistsIdAndPhoneNumberDB}
        >
          다음
        </Button>
      </Grid>
    </>
  );
};

export default EnterUserInfo;
