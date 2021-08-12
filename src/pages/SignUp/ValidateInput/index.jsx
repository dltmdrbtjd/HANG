import React from 'react';
// icon
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// elements
import { Grid, Input, Span } from '../../../elements';
// style
import {
  setGridWithStatus,
  setInputWithStatus,
  setSpanWithStatus,
} from './style';

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
        <Span width="24px" height="24px" addstyle={setSpanWithStatus(status)}>
          {status === 'danger' ? (
            <HighlightOffIcon />
          ) : (
            <CheckCircleOutlineIcon />
          )}
        </Span>
      ) : null}
    </Grid>
  );
};

export default ValidateInput;
