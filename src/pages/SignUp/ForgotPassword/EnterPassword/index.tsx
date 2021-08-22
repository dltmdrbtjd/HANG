import React from 'react';
// elements
import { Grid, Text, Button } from 'src/elements';
// components
import ValidateInput from '../../ValidateInput';

const EnterPassword = ({ password, setPassword, pwdErrorMsg }) => {
  const [pwdCheck, setPwdCheck] = React.useState<string>('');

  return (
    <>
      <Grid position="absolute" top="50%" left="0" translate="0, -50%">
        <Grid margin="0 0 15px">
          <ValidateInput
            id="password"
            placeholder="비밀번호 입력"
            type="password"
            name="password"
            value={password}
            _onChange={setPassword}
            status={
              (pwdErrorMsg && 'danger') || (password && !pwdErrorMsg && 'safe')
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

      <Grid position="absolute" bottom="20px" left="0">
        <Button
          type="submit"
          fs="la"
          fw="bold"
          width="100%"
          disabled={!(password && !pwdErrorMsg && pwdCheck === password)}
        >
          비밀번호 변경
        </Button>
      </Grid>
    </>
  );
};

export default EnterPassword;
