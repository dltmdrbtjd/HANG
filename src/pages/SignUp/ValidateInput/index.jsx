import React from 'react';
// icon
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// elements
import { Grid, Input } from '../../../elements';
// style
import SpanStyle from './style';

const ValidateInput = ({
  id,
  type,
  name,
  value,
  placeholder,
  _onChange,
  status,
  width,
}) => {
  return (
    <Grid
      width={width}
      position="relative"
      radius="14px"
      shadow="inset 0px 2px 3px rgba(136, 136, 136, 0.25)"
      padding={status ? '0 12px 0 0' : 0}
      bgColor="white"
      display="flex"
      hoz="space-between"
      ver="center"
      border={status === 'danger' ? 'solid #FF0005' : 'none'}
    >
      <Input
        width={status ? '90%' : '100%'}
        shadow="none"
        padding={status ? '0 0 0 12px' : '0 12px'}
        bgColor="none"
        placeholder={placeholder}
        value={value}
        type={type}
        name={name}
        id={id}
        _onChange={_onChange}
      />

      {status ? (
        <SpanStyle status={status}>
          {status === 'danger' ? (
            <HighlightOffIcon />
          ) : (
            <CheckCircleOutlineIcon />
          )}
        </SpanStyle>
      ) : null}
    </Grid>
  );
};

ValidateInput.defaultProps = {};

export default ValidateInput;
