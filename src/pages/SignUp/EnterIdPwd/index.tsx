import React from 'react';
// api
import apis from 'src/shared/api';
// context
import { signUpStatus } from '../SignUpContext';
// types
import { Status, currentType } from '../PhoneAuth/PhoneAuth';
// elements
import { Grid, Button, Text, Label, MainTitle } from '../../../elements';
// components
import ValidateInput from '../ValidateInput';
// style
import { setMediaMargin, setMediaFontSize } from '../../../styles/Media';
import SignUpWrapperHeight from '../style';

const EnterIdPwd = ({ formik }) => {
  const { pageState } = React.useContext(signUpStatus);

  const [idDupCheck, setIdDupCheck] = React.useState<Status>({
    status: 0,
    errorMsg: '',
  });
  const [pwdCheck, setPwdCheck] = React.useState<string>('');

  const IdDuplicateCheck = () => {
    apis
      .Duplicate({ userId: formik.values.userId })
      .then(() => setIdDupCheck({ status: 1, errorMsg: '' }))
      .catch(() =>
        setIdDupCheck({ status: 2, errorMsg: '이미 등록된 아이디입니다.' }),
      );
  };

  return (
    <>
      {pageState.page === 2 ? (
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
                  value={formik.values.userId}
                  _onChange={formik.handleChange('userId')}
                  status={currentType[idDupCheck.status]}
                />

                <Button
                  width="40%"
                  disabled={!formik.values.userId || formik.errors.userId}
                  _onClick={IdDuplicateCheck}
                >
                  중복 확인
                </Button>
              </Grid>

              {formik.errors.userId || idDupCheck.status === 2 ? (
                <Text fs="sm" color="danger" margin="8px 0 0">
                  {formik.errors.userId || idDupCheck.errorMsg}
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
                  value={formik.values.password}
                  _onChange={formik.handleChange('password')}
                  status={
                    (formik.errors.password && 'danger') ||
                    (formik.values.password &&
                      !formik.errors.password &&
                      'safe')
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
          </Grid>

          <Button
            fs="la"
            fw="bold"
            width="100%"
            margin="60px 0 20px"
            disabled={
              !(
                idDupCheck.status === 1 &&
                formik.values.password &&
                !formik.errors.password &&
                pwdCheck === formik.values.password
              )
            }
            _onClick={() => pageState.setPage((page: number) => page + 1)}
          >
            다음
          </Button>
        </Grid>
      ) : null}
    </>
  );
};

export default EnterIdPwd;
