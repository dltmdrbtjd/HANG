import React from 'react';
// elements
import { Text } from '../../elements';

const NoInfo = ({ children, list, contents }) => {
  if (list.length) {
    return <>{children}</>;
  }

  return <Text fs="la">{contents}</Text>;
};

NoInfo.defaultProps = {
  contents: '아무런 정보가 없네요',
};

export default NoInfo;
