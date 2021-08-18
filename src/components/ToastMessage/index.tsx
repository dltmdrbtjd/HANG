import React from 'react';
import { Text } from 'src/elements';
import ToastMessageStyle from './style';

interface Props {
  msg: string;
}

const ToastMessage = ({ msg }: Props): React.ReactElement => {
  return (
    <ToastMessageStyle>
      <Text fw="bold">{msg}</Text>
    </ToastMessageStyle>
  );
};

export default ToastMessage;
