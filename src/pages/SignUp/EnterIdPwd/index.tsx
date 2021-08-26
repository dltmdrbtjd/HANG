import React from 'react';
// api
import apis from 'src/shared/api';
// types
import { Status, currentType } from '../PhoneAuth/PhoneAuth';
// elements
import { Grid, Button, Text, Label, MainTitle } from '../../../elements';
// components
import ValidateInput from '../ValidateInput';
// style
import { setMediaMargin, setMediaFontSize } from '../../../styles/Media';
import SignUpWrapperHeight from '../style';

interface Props {
  userId: string;
  setUserId: any;
  idErrorMsg: string;
  password: string;
  setPassword: any;
  pwdErrorMsg: string;
  setPage: any;
}

const EnterIdPwd: React.FC<Props> = ({
  userId,
  setUserId,
  idErrorMsg,
  password,
  setPassword,
  pwdErrorMsg,
  setPage,
}) => {
  const [idDupCheck, setIdDupCheck] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });
  const [pwdCheck, setPwdCheck] = React.useState<string>('');

  const IdDuplicateCheck = () => {
    apis
      .Duplicate({ userId })
      .then(() => setIdDupCheck({ status: 1, errorMsg: '' }))
      .catch(() =>
        setIdDupCheck({ status: 2, errorMsg: '이미 등록된 아이디입니다.' }),
      );
  };

  return (
    <Grid isFlex column hoz="space-between" addstyle={SignUpWrapperHeight}>
      <MainTitle fs="xl" fw="extraBold" margin="0 0 60px">
        행에서 사용할
        <br />
        아이디와 비밀번호를 입력해주세요
      </MainTitle>

      <Grid>
        <Grid margin="0 0 15px" addstyle={setMediaMargin('0 0 36px')}>
          <Label
            fs="lg"
            id="id"
            lh="2"
            fw="semiBold"
            addstyle={setMediaFontSize('sxl')}
          >
            아이디
          </Label>

          <Grid isFlex hoz="space-between">
            <ValidateInput
              id="id"
              placeholder="아이디 입력"
              width="58%"
              name="userId"
              value={userId}
              _onChange={setUserId}
              status={currentType[idDupCheck.status]}
            />

            <Button
              width="40%"
              disabled={!userId || idErrorMsg}
              _onClick={IdDuplicateCheck}
            >
              중복 확인
            </Button>
          </Grid>

          {idErrorMsg || idDupCheck.status === 2 ? (
            <Text fs="sm" color="danger" margin="8px 0 0">
              {idErrorMsg || idDupCheck.errorMsg}
            </Text>
          ) : null}
        </Grid>

        <Grid>
          <Label
            fs="lg"
            id="password"
            lh="2"
            fw="semiBold"
            addstyle={setMediaFontSize('sxl')}
          >
            비밀번호
          </Label>

          <Grid margin="0 0 15px" addstyle={setMediaMargin('0 0 20px')}>
            <ValidateInput
              id="password"
              placeholder="비밀번호 입력"
              type="password"
              name="password"
              value={password}
              _onChange={setPassword}
              status={
                (pwdErrorMsg && 'danger') ||
                (password && !pwdErrorMsg && 'safe')
              }
            />

            {pwdErrorMsg ? (
              <Text fs="sm" color="danger" margin="8px 0 0">
                {pwdErrorMsg}
              </Text>
            ) : null}
          </Grid>

          <Grid>
            <ValidateInput
              placeholder="비밀번호 재확인"
              type="password"
              value={pwdCheck}
              _onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPwdCheck(e.target.value)
              }
              status={
                (pwdCheck !== password && 'danger') ||
                (pwdCheck && pwdCheck === password && 'safe')
              }
            />

            {pwdCheck !== password ? (
              <Text fs="sm" color="danger" margin="8px 0 0">
                비밀번호가 일치하지 않습니다
              </Text>
            ) : null}
          </Grid>
        </Grid>
      </Grid>

      <Button
        fs="la"
        fw="bold"
        width="100%"
        margin="60px 0 20px"
        disabled={
          !(
            idDupCheck.status === 1 &&
            password &&
            !pwdErrorMsg &&
            pwdCheck === password
          )
        }
        _onClick={() => setPage((page: number) => page + 1)}
      >
        다음
      </Button>
    </Grid>
  );
};

export default EnterIdPwd;
