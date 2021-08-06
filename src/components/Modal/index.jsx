import React from 'react';

import { Grid, Text, Button, BlurBox } from '../../elements/index';
import ModalStyle from './style';

const Modal = props => {
  const { open, close, agree, mainText, subText, subText2, agreeText } = props;
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
                {mainText}
              </Text>
              <Text margin="37px 0 0 0">
                {subText} {subText ? <br /> : null} {subText2}
              </Text>
              <Grid
                display="flex"
                margin="33px 0 0 0"
                position="absolute"
                left="0"
                bottom="0"
              >
                <Button radius="none" _onClick={agree} width="100%">
                  {agreeText}
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

Modal.defaultProps = {
  mainText: '길잡이 되어주기',
  agreeText: '신청',
};

export default Modal;
