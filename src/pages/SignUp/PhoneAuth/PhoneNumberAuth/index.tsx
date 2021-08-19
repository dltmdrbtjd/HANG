import React from 'react';
// apis
import apis from 'src/shared/api';
// elements
import { Grid, Button, Text } from '../../../../elements';
// components
import ValidateInput from '../../ValidateInput';

interface Props {
  status: number;
  errorMsg?: string;
}

const PhoneNumberAuth: React.FC<Props> = ({ errorMsg, status }) => {
  const [phoneVali, setPhoneVali] = React.useState<Props>({
    status: 0,
    errorMsg: '',
  });

  const PhoneNUmberVerification = (pNum: number) => {
    apis
      .PhoneVerification({ pNum, status })
      .then(() => {
        setPhoneVali({ status: 1, errorMsg: '' });
      })
      .catch(() => {
        setPhoneVali({ status: 2, errorMsg: '이미 등록된 전화번호입니다.' });
      });
  };

  return (
    <>
      <Grid isFlex hoz="space-between" margin="0 0 15px">
        <ValidateInput
          placeholder="전화번호 입력"
          type="tel"
          width="58%"
          status={errorMsg && 'danger'}
        />

        <Button width="40%" disabled _onClick={() => PhoneNUmberVerification()}>
          인증번호 받기
        </Button>
      </Grid>

      {!errorMsg || phoneVali.status === 2 ? (
        <Text fs="sm" color="danger">
          {phoneVali.errorMsg}
        </Text>
      ) : null}
    </>
  );
};

PhoneNumberAuth.propTypes = {};

export default PhoneNumberAuth;
