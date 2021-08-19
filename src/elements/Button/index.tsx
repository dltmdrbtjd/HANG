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
  border?: string;
  fs?: string;
  fw?: string;
  color?: string;
  disColor?: string;
  shadow?: string;
  disabled?: any;
  addstyle?: any;
  type?: 'submit' | 'reset' | 'button' | undefined;
  _onClick?: any;
}

const Button: React.FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  (
    { disabled, type, _onClick, children, ...props },
    ref,
  ): React.ReactElement => {
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
