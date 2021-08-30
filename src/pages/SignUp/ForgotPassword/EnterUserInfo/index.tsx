import React from 'react';
// apis
import apis from 'src/shared/api';
// elements
import { Grid, Input, Button, Text, MainTitle } from 'src/elements';
// page
import PhoneAuth, { Status } from '../../PhoneAuth/PhoneAuth';
// style
import { ForgotPwdWrapperHeight } from '../../style';
import { setMediaMargin } from '../../../../styles/Media';

const EnterUserInfo = ({ formik, setPage }) => {
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
      .Exists({ userId: formik.values.userId, pNum: formik.values.pNum })
      .then(() => setPage((page: number) => page + 1))
      .catch(() =>
        setExistsStatus({
          status: false,
          errorMsg: '가입되지 않은 아이디이거나 등록되지 않은 전화번호입니다.',
        }),
      );
  };

  return (
    <Grid isFlex column hoz="space-between" addstyle={ForgotPwdWrapperHeight}>
      <MainTitle fs="xl" fw="extraBold" margin="0 0 60px">
        비밀번호 찾기
      </MainTitle>

      <Grid>
        <Grid margin="0 0 15px" addstyle={setMediaMargin('0 0 20px')}>
          <Input
            placeholder="아이디 입력"
            value={formik.values.userId}
            _onChange={formik.handleChange('userId')}
          />
        </Grid>

        <PhoneAuth
          formik={formik}
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

      <Button
        fs="la"
        fw="bold"
        width="100%"
        margin="60px 0 0"
        disabled={smsVeri.status !== 1}
        _onClick={ExistsIdAndPhoneNumberDB}
      >
        다음
      </Button>
    </Grid>
  );
};

export default EnterUserInfo;
