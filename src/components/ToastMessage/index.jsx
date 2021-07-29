import React from 'react';
import ToastMessageStyle from './style';
import { Text } from '../../elements/index';

const ToastMessage = ({ msg }) => {
  return (
    <ToastMessageStyle>
      <Text fw="bold">{msg}</Text>
    </ToastMessageStyle>
  );
};

export default ToastMessage;
