import React from 'react';

import { Grid, Text, Button, BlurBox } from 'src/elements';

export interface Props {
  open?: any;
  close?: any;
  agree?: any;
  mainText: string;
  subText?: string;
  subText2?: string;
  agreeText: string;
}

const Modal = ({
  open,
  close,
  agree,
  mainText,
  subText,
  subText2,
  agreeText,
}: Props): React.ReactElement => {
  return (
    <>
      {open ? (
        <BlurBox isFlex hoz="center" ver="center">
          <Grid
            bgColor="white"
            width="296px"
            height="216px"
            position="relative"
            radius="14px"
            overflow="hidden"
            textAlign="center"
          >
            <Text margin="18px 0 0 0" fs="xl" fw="extraBold">
              {mainText}
            </Text>
            <Text margin="37px 0 0 0">
              {subText} {subText ? <br /> : null} {subText2}
            </Text>
            <Grid
              isFlex
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
      ) : null}
    </>
  );
};

export default Modal;
