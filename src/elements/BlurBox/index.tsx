import React from 'react';
// style
import BlurBoxStyle from './style';

export interface Props {
  children: any;
  hoz?: string;
  ver?: string;
  isFlex?: any;
  _onClick?: any;
}

const BlurBox: React.FC<Props> = ({
  children,
  _onClick,
  ...props
}): React.ReactElement => {
  return (
    <BlurBoxStyle onClick={_onClick} {...props}>
      {children}
    </BlurBoxStyle>
  );
};

BlurBox.defaultProps = {
  _onClick: () => {},
};

export default BlurBox;
