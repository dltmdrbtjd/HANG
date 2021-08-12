import React from 'react';
// elements
import { Strong } from '../../elements';
// style
import NameplateStyle from './style';

const GuideNameplate = ({ children }) => {
  return <Strong addstyle={NameplateStyle}>{children}</Strong>;
};

export default GuideNameplate;
