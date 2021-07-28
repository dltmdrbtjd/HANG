import React from 'react';

import { Grid, Text, Button } from '../../elements/index';
import ModalStyle from './style';

const Modal = props => {
  const { open, close, agree } = props;
  return (
    <>
      {open ? (
        <ModalStyle>
          <Grid
            bgColor="white"
            width="296px"
            height="216px"
            border="1px solid #c4c4c4"
            position="fixed"
            top="50%"
            left="50%"
            translate="-50%,-50%"
            radius="14px"
          >
            <Text margin="18px 0 0 0" fs="xl" fw="extraBold">
              가이디 되어주기
            </Text>
            <Text margin="37px 0 0 0">
              닉네임 님에게 <br /> 가이디가 되어주시겠습니까?
            </Text>
            <Grid display="flex" margin="33px 0 0 0">
              <Button _onClick={agree} width="100%">
                신청
              </Button>
              <Button _onClick={close} width="100%">
                취소
              </Button>
            </Grid>
          </Grid>
        </ModalStyle>
      ) : null}
    </>
  );
};

export default Modal;
