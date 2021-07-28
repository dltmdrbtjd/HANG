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
  type: 'button',
  shadow: '0 4px 4px rgba(134,134,134,0.3)',
  radius: '14px',
  padding: '12px 0',
  bgColor: 'brandColor',
  disColor: 'semiLightG',
  color: 'white',
};

export default Button;
