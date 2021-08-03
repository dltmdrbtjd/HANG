import React from 'react';
// redux
import { useDispatch } from 'react-redux';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Button, Text, Label } from '../../../elements';
// components
import ValidateInput from '../ValidateInput';
// reducer
import { UserCreators } from '../../../redux/modules/user';

const EnterIdPwd = ({ userId, setUserId, password, setPassword }) => {
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
            />

            <Button
              width="42%"
              _onClick={() => {
                duplicateIdCheck();
              }}
            >
              중복 확인
            </Button>
          </Grid>
        </Grid>

        <Grid>
          <Label fs="lg" id="password" lh="2" fw="semiBold">
            비밀번호
          </Label>

          <Grid
            display="flex"
            hoz="space-between"
            ver="center"
            margin="0 0 15px"
          >
            <ValidateInput
              id="password"
              placeholder="비밀번호 입력"
              type="password"
              width="55%"
              name="password"
              value={password}
              _onChange={setPassword}
            />

            <Text fs="xs" width="42%">
              *8자&nbsp;이상,
              <br />
              문자/숫자/기호&nbsp;포함
            </Text>
          </Grid>

          <Grid display="flex" hoz="space-between" ver="center">
            <ValidateInput
              placeholder="비밀번호 재확인"
              type="password"
              width="55%"
            />

            <Text fs="xs" width="42%">
              비밀번호를
              <br />
              다시 한번 입력해주세요
            </Text>
          </Grid>
        </Grid>
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Button
          fs="la"
          fw="bold"
          width="100%"
          disabled={!(userId && password)}
          _onClick={() => {
            history.push('/signup/3');
          }}
        >
          다음
        </Button>
      </Grid>
    </>
  );
};

export default EnterIdPwd;
