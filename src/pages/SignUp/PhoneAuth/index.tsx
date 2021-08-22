import React from 'react';
// elements
import { Grid, Button } from 'src/elements';
// components
import PhoneAuth, { Status } from './PhoneAuth';

const PhoneValidationCheck = ({ pNum, setPnum, errorMsg, setPage }) => {
  const [smsVeri, setSMSVeri] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });

  return (
    <>
      <Grid position="absolute" top="50%" left="0" translate="0, -50%">
        <PhoneAuth
          pNum={pNum}
          setPnum={setPnum}
          status={1}
          errorMsg={errorMsg}
          smsVeri={smsVeri}
          setSMSVeri={setSMSVeri}
        />
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Button
          fs="la"
          fw="bold"
          width="100%"
          disabled={smsVeri.status !== 1}
          _onClick={() => setPage((page: number) => page + 1)}
        >
          다음
        </Button>
      </Grid>
    </>
  );
};

export default PhoneValidationCheck;
