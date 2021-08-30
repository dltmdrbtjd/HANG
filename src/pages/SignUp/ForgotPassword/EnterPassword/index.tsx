import React from 'react';
// elements
import { Grid, Text, Button, MainTitle } from 'src/elements';
// components
import ValidateInput from '../../ValidateInput';
// style
import { ForgotPwdWrapperHeight } from '../../style';
import { setMediaMargin } from '../../../../styles/Media';

const EnterPassword = ({ formik }) => {
  const [pwdCheck, setPwdCheck] = React.useState<string>('');

  return (
    <Grid isFlex column hoz="space-between" addstyle={ForgotPwdWrapperHeight}>
      <MainTitle fs="xl" fw="extraBold" margin="0 0 60px">
        비밀번호 재설정
      </MainTitle>

      <Grid>
        <Grid margin="0 0 15px" addstyle={setMediaMargin('0 0 20px')}>
          <ValidateInput
            id="password"
            placeholder="비밀번호 입력"
            type="password"
            name="password"
            value={formik.values.password}
            _onChange={formik.handleChange('password')}
            status={
              (formik.errors.password && 'danger') ||
              (formik.values.password && !formik.errors.password && 'safe')
            }
          />

          {formik.errors.password ? (
            <Text fs="sm" color="danger" margin="8px 0 0">
              {formik.errors.password}
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
              (pwdCheck !== formik.values.password && 'danger') ||
              (pwdCheck && pwdCheck === formik.values.password && 'safe')
            }
          />

          {pwdCheck !== formik.values.password ? (
            <Text fs="sm" color="danger" margin="8px 0 0">
              비밀번호가 일치하지 않습니다
            </Text>
          ) : null}
        </Grid>
      </Grid>

      <Button
        type="submit"
        fs="la"
        fw="bold"
        width="100%"
        margin="60px 0 0"
        disabled={
          !(
            formik.values.password &&
            !formik.errors.password &&
            pwdCheck === formik.values.password
          )
        }
      >
        비밀번호 변경
      </Button>
    </Grid>
  );
};

export default EnterPassword;
