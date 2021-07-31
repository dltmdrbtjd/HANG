import React from 'react';

import { Grid, Text, Button, BlurBox } from '../../elements/index';
import ModalStyle from './style';

const Modal = props => {
  const { open, close, agree, subText, subText2 } = props;
  return (
    <>
      {open ? (
        <ModalStyle>
          <BlurBox>
            <Grid
              bgColor="white"
              width="296px"
              height="216px"
              position="fixed"
              top="50%"
              left="50%"
              translate="-50%,-50%"
              radius="14px"
              overflow="hidden"
              z="1"
            >
              <Text margin="18px 0 0 0" fs="xl" fw="extraBold">
                길잡이 되어주기
              </Text>
              <Text margin="37px 0 0 0">
                {subText} <br /> {subText2}
              </Text>
              <Grid display="flex" margin="33px 0 0 0">
                <Button radius="none" _onClick={agree} width="100%">
                  신청
                </Button>
                <Button
                  bgColor="gray"
                  radius="none"
                  _onClick={close}
                  width="100%"
                >
                  취소
                </Button>
              </Grid>
            </Grid>
          </BlurBox>
        </ModalStyle>
      ) : null}
    </>
  );
};

export default Modal;
