import React from 'react';
// elements
import { Strong } from '../../elements';
// style
import NameplateStyle from './style';

export interface Props {
  children: string;
}

const GuideNameplate = ({ children }: Props) => {
  return (
    <Strong color="brandColor" margin="0 4px" addstyle={NameplateStyle}>
      {children}
    </Strong>
  );
};

export default GuideNameplate;
