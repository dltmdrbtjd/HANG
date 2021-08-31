import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { disableAlert } from 'src/redux/modules/AlertModule/alert';
// icon
import CancelIcon from '@material-ui/icons/Cancel';
// elements
import { Grid, SubTitle, Text, Button, BlurBox } from 'src/elements';
import { useTypedSelector } from 'src/redux/configureStore';

export interface Props {
  open?: any;
  close?: any;
  agree?: any;
  mainText?: string;
  subText?: string;
  subText2?: string;
  agreeText?: string;
}

const Alert = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { status, errorMsg } = useTypedSelector((state) => state.alert);

  const DisalbeAlert = () => {
    dispatch(disableAlert());
  };

  return (
    <>
      {status ? (
        <BlurBox isFlex hoz="center" ver="center">
          <Grid
            bgColor="white"
            width="296px"
            position="relative"
            radius="16px"
            overflow="hidden"
            textAlign="center"
            border="0.5px solid #FF0000"
            isFlex
            column
            hoz="space-between"
          >
            <Grid padding="18px 20px">
              <Grid color="danger">
                <CancelIcon style={{ fontSize: '40px' }} />
              </Grid>

              <SubTitle fw="semiBold" color="danger" margin="0px 0 10px">
                이런!
              </SubTitle>

              <Text fw="semiBold" wb="keep-all" ws="pre-line">
                {errorMsg}
              </Text>
            </Grid>

            <Button
              color="darkGray"
              bgColor="lightGray"
              radius="none"
              width="100%"
              _onClick={DisalbeAlert}
            >
              닫기
            </Button>
          </Grid>
        </BlurBox>
      ) : null}
    </>
  );
};

export default Alert;
