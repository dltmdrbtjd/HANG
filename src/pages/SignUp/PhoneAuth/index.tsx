import React from 'react';
// elements
import { Grid, Button, MainTitle } from 'src/elements';
// components
import PhoneAuth, { Status } from './PhoneAuth';
// style
import SignUpWrapperHeight from '../style';

const PhoneValidationCheck = ({ pNum, setPnum, errorMsg, setPage }) => {
  const [smsVeri, setSMSVeri] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });

  return (
    <Grid isFlex column hoz="space-between" addstyle={SignUpWrapperHeight}>
      <MainTitle fs="xl" fw="extraBold" margin="0 0 60px">
        번호 인증이
        <br />
        필요한 서비스 입니다
      </MainTitle>

      <PhoneAuth
        pNum={pNum}
        setPnum={setPnum}
        status={1}
        errorMsg={errorMsg}
        smsVeri={smsVeri}
        setSMSVeri={setSMSVeri}
      />

      <Button
        fs="la"
        fw="bold"
        width="100%"
        margin="60px 0 20px"
        disabled={smsVeri.status !== 1}
        _onClick={() => setPage((page: number) => page + 1)}
      >
        다음
      </Button>
    </Grid>
  );
};

export default PhoneValidationCheck;
