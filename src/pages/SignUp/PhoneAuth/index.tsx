import React from 'react';
// apis
import apis from 'src/shared/api';
// elements
import { Grid, Button, Text } from '../../../elements';
// components
import ValidateInput from '../ValidateInput';

interface Props {
  pNum: string;
  setPnum: any;
  status: number;
  errorMsg: string;
}

export interface Status {
  status: number;
  errorMsg: string;
}

export const currentType: string[] = ['primary', 'safe', 'danger'];

const PhoneAuth: React.FC<Props> = ({ pNum, setPnum, status, errorMsg }) => {
  const [phoneVeri, setPhoneVeri] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });
  const [smsVeri, setSMSVeri] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });
  const [aNum, setaNum] = React.useState<string>('');
  const phoneAuthErrMsg = [
    '등록되지 않은 전화번호입니다.',
    '이미 등록된 전화번호입니다.',
  ];

  const PhoneVerification = () => {
    apis
      .PhoneVerification({ pNum, status })
      .then(() => setPhoneVeri({ status: 1, errorMsg: '' }))
      .catch(() =>
        setPhoneVeri({ status: 2, errorMsg: phoneAuthErrMsg[status] }),
      );
  };

  const SMSVerification = () => {
    apis
      .Pauth({ pNum, aNum })
      .then(() => setSMSVeri({ status: 1, errorMsg: '' }))
      .catch(() =>
        setSMSVeri({ status: 2, errorMsg: '인증 번호가 유효하지 않습니다.' }),
      );
  };

  return (
    <>
      <Grid isFlex hoz="space-between" margin="0 0 15px">
        <ValidateInput
          placeholder="전화번호 입력"
          type="tel"
          width="58%"
          name="pNum"
          value={pNum}
          _onChange={setPnum}
          status={currentType[phoneVeri.status]}
        />

        <Button
          width="40%"
          disabled={!(pNum && !errorMsg)}
          _onClick={PhoneVerification}
        >
          인증번호 받기
        </Button>
      </Grid>

      {errorMsg || phoneVeri.status === 2 ? (
        <Text fs="sm" color="danger">
          {errorMsg || phoneVeri.errorMsg}
        </Text>
      ) : null}

      {phoneVeri.status === 1 ? (
        <>
          <Grid isFlex hoz="space-between" margin="0 0 24px">
            <ValidateInput
              placeholder="인증번호 입력"
              width="58%"
              value={aNum}
              status={currentType[smsVeri.status]}
              _onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setaNum(e.target.value)
              }
            />

            <Button width="40%" disabled={!aNum} _onClick={SMSVerification}>
              인증 확인
            </Button>
          </Grid>

          {smsVeri.status === 2 ? (
            <Text fs="sm" color="danger">
              {smsVeri.errorMsg}
            </Text>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default PhoneAuth;
