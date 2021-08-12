import React, { forwardRef } from 'react';
import ButtonStyle from './style';

const Button = forwardRef(
  ({ disabled, type, _onClick, children, ...props }, ref) => {
    return (
      <ButtonStyle
        type={type}
        ref={ref}
        onClick={_onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </ButtonStyle>
    );
  },
);

Button.defaultProps = {
  disabled: false,
  fw: 'bold',
  type: 'button',
  radius: '14px',
  padding: '12px 0',
  bgColor: 'brandColor',
  disColor: 'semiLightG',
  border: 'none',
  _onClick: () => {},
};

export default Button;
