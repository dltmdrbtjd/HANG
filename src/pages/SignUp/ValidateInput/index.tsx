import React from 'react';
// icon
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// elements
import { Grid, Span } from '../../../elements';
// style
import {
  setGridWithStatus,
  setSpanWithStatus,
  InputInitialized,
} from './style';

interface Props {
  status?: string;
  width?: string;
  id?: string;
  type?: string;
  name?: string;
  value?: string | number;
  placeholder: string;
  _onChange?: any;
}

const ValidateInput: React.FC<Props> = ({
  status,
  width,
  id,
  type,
  name,
  value,
  placeholder,
  _onChange,
}): React.ReactElement => {
  return (
    <Grid
      width={width}
      radius="14px"
      bgColor="white"
      isFlex
      hoz="space-between"
      ver="center"
      padding="12px"
      addstyle={setGridWithStatus(status)}
    >
      <InputInitialized
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={_onChange}
      />

      {status && status !== 'primary' ? (
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

ValidateInput.defaultProps = {
  type: 'text',
  _onChange: () => {},
};

export default ValidateInput;
