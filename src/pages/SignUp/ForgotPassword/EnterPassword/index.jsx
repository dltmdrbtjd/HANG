import React, { useState } from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// elements
import { Grid, Button, MainTitle, Input, Text } from '../../../../elements';
// reducer
import { UserCreators } from '../../../../redux/modules/user';
// validation
import { pwdRegExp } from '../../../../shared/validation';

const EnterPassword = ({ id }) => {
  const [pwdCheck, setPwdCheck] = useState('');

  const resetPassword = pwd => {
    UserCreators.ForgotPasswordDB({ userId: id, newPassword: pwd });
  };

  return (
    <>
      <MainTitle fs="xl" fw="extraBold" ls="-1px" padding="50px 0 0">
        비밀번호 재설정
      </MainTitle>

      <Formik
        initialValues={{ password: '' }}
        validationSchema={yup.object({
          password: yup
            .string()
            .matches(
              pwdRegExp,
              '비밀번호는 숫자, 영문자, 특수문자(!@#$%^&*()?_~)만 사용할 수 있습니다',
            )
            .min(8, '비밀번호를 8자 이상 입력해 주세요'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values.password);
          setSubmitting(false);
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Grid position="absolute" top="50%" left="0" translate="0, -50%">
              <Grid margin="0 0 15px">
                <Input
                  placeholder="비밀번호 입력"
                  type="password"
                  {...formik.getFieldProps('password')}
                />

                {formik.touched.password && formik.errors.password ? (
                  <Text fs="sm" color="danger">
                    {formik.errors.password}
                  </Text>
                ) : null}
              </Grid>

              <Grid margin="0 0 24px">
                <Input
                  placeholder="비밀번호 재확인"
                  type="password"
                  value={pwdCheck}
                  _onChange={e => setPwdCheck(e.target.value)}
                />

                {pwdCheck !== formik.values.password ? (
                  <Text fs="sm" color="danger" margin="8px 0 0">
                    비밀번호가 일치하지 않습니다
                  </Text>
                ) : null}
              </Grid>
            </Grid>

            <Grid position="absolute" bottom="20px" left="0">
              <Button fs="la" fw="bold" width="100%" type="submit">
                비밀번호 변경
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EnterPassword;
