import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// elements
import { Grid, Button, Text, Label } from '../../../elements';
// components
import ValidateInput from '../ValidateInput';
// reducer
import { UserCreators } from '../../../redux/modules/user';

const EnterIdPwd = ({
  userId,
  setUserId,
  password,
  setPassword,
  setPage,
  pwdCheck,
  setPwdCheck,
  idErrorMsg,
  pwdErrorMsg,
}) => {
  const idDupCheck = useSelector(state => state.user.duplicateCheck.id);
  const dispatch = useDispatch();

  const duplicateIdCheck = () => {
    dispatch(UserCreators.duplicateIdCheckDB({ userId }));
  };

  return (
    <>
      <Grid position="absolute" top="50%" left="0" translate="0, -50%">
        <Grid margin="0 0 15px">
          <Label fs="lg" id="id" lh="2" fw="semiBold">
            아이디
          </Label>

          <Grid display="flex" hoz="space-between">
            <ValidateInput
              id="id"
              placeholder="아이디 입력"
              width="55%"
              name="userId"
              value={userId}
              _onChange={setUserId}
              status={(idErrorMsg && 'danger') || (idDupCheck.status && 'safe')}
            />

            <Button
              width="42%"
              disabled={!userId || idErrorMsg}
              _onClick={() => {
                duplicateIdCheck();
              }}
            >
              중복 확인
            </Button>
          </Grid>

          {idErrorMsg ? (
            <Text fs="sm" color="danger" margin="8px 0 0">
              {idErrorMsg}
            </Text>
          ) : null}

          {!idErrorMsg && !idDupCheck.status ? (
            <Text fs="sm" color="danger" margin="8px 0 0">
              {idDupCheck.errorMsg}
            </Text>
          ) : null}
        </Grid>

        <Grid>
          <Label fs="lg" id="password" lh="2" fw="semiBold">
            비밀번호
          </Label>

          <Grid margin="0 0 15px">
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
              _onChange={e => setPwdCheck(e.target.value)}
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

      <Grid position="absolute" bottom="20px" left="0">
        <Button
          fs="la"
          fw="bold"
          width="100%"
          disabled={!idDupCheck.status || pwdErrorMsg || pwdCheck !== password}
          _onClick={() => {
            setPage(3);
          }}
        >
          다음
        </Button>
      </Grid>
    </>
  );
};

export default EnterIdPwd;
