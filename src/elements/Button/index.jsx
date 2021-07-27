import React from 'react';
import ButtonStyle from './style';

const Button = ({ disabled = false, _onClick, children, ...props }) => {
  return (
    <ButtonStyle onClick={_onClick} disabled={disabled} {...props}>
      {children}
    </ButtonStyle>
  );
};

Button.defaultProps = {
  shadow: '0 4px 4px rgba(134,134,134,0.3)',
  radius: '14px',
  padding: '12px 0',
  bgColor: 'brandColor',
  color: 'white',
};

export default Button;
