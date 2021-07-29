import React from 'react';
// icon
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// elements
import { Grid, Input } from '../../../elements/index';
// style
import SpanStyle from './style';

const ValidateInput = ({
  placeholder,
  type,
  id,
  status,
  name,
  value,
  _onChange,
}) => {
  if (!status)
    return (
      <Input
        placeholder={placeholder}
        value={value}
        name={name}
        type={type}
        id={id}
        _onChange={_onChange}
      />
    );

  return (
    <Grid
      position="relative"
      radius="14px"
      shadow="inset 0px 2px 3px rgba(136, 136, 136, 0.25)"
      padding="0 12px 0 0"
      bgColor="white"
      display="flex"
      hoz="space-between"
      ver="center"
      border={status === 'danger' ? 'solid #FF0005' : 'none'}
    >
      <Input
        width="90%"
        shadow="none"
        padding="0 0 0 12px"
        bgColor="none"
        placeholder={placeholder}
        value={value}
        type={type}
        name={name}
        id={id}
        _onChange={_onChange}
      />

      <SpanStyle status={status}>
        {status === 'danger' ? (
          <HighlightOffIcon />
        ) : (
          <CheckCircleOutlineIcon />
        )}
      </SpanStyle>
    </Grid>
  );
};

ValidateInput.defaultProps = {};

export default ValidateInput;
