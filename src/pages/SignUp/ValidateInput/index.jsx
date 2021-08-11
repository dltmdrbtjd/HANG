import React from 'react';
// icon
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// elements
import { Grid, Input } from '../../../elements';
// style
import { setGridWithStatus, setInputWithStatus, SpanStyle } from './style';

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
      radius="14px"
      bgColor="white"
      isFlex
      hoz="space-between"
      ver="center"
      addstyle={setGridWithStatus(status)}
    >
      <Input
        bgColor="none"
        border="none"
        placeholder={placeholder}
        value={value}
        type={type}
        name={name}
        id={id}
        _onChange={_onChange}
        addstyle={setInputWithStatus(status)}
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
