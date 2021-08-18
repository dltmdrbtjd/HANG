import React from 'react';
import ButtonStyle from './style';

export interface Props {
  form?: string;
  width?: string;
  height?: string;
  margin?: string;
  bgColor?: string;
  radius?: string;
  padding?: string;
  fs?: string;
  fw?: string;
  color?: string;
  disColor?: string;
  shadow?: string;
  disabled?: boolean;
  addstyle?: any;
  type?: string;
  _onClick?: any;
  children?: React.ReactElement | React.ReactElement[] | string;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
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
  _onClick: () => {},
};

export default Button;
