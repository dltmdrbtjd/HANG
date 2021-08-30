import React from 'react';
// context
import { signUpStatus } from '../SignUpContext';
// elements
import { Grid, Button, MainTitle } from '../../../elements';
// components
import PhoneAuth, { Status } from './PhoneAuth';
// style
import SignUpWrapperHeight from '../style';

const PhoneValidationCheck = ({ formik }) => {
  const { pageState } = React.useContext(signUpStatus);

  const [smsVeri, setSMSVeri] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });

  return (
    <>
      {pageState.page === 1 ? (
        <Grid isFlex column hoz="space-between" addstyle={SignUpWrapperHeight}>
          <MainTitle fs="xl" fw="extraBold" margin="0 0 60px">
            번호 인증이
            <br />
            필요한 서비스 입니다
          </MainTitle>

          <PhoneAuth
            pNum={formik.values.pNum}
            setPnum={formik.handleChange('pNum')}
            status={1}
            errorMsg={formik.errors.pNum}
            smsVeri={smsVeri}
            setSMSVeri={setSMSVeri}
          />

          <Button
            fs="la"
            fw="bold"
            width="100%"
            margin="60px 0 20px"
            disabled={smsVeri.status !== 1}
            _onClick={() => pageState.setPage((page: number) => page + 1)}
          >
            다음
          </Button>
        </Grid>
      ) : null}
    </>
  );
};

export default PhoneValidationCheck;
