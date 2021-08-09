import styled, { css } from 'styled-components';

const buttonShapeSetting = shape => {
  switch (shape) {
    case 'text':
      return css`
        background: none;
        padding: 0;
        color: ${props =>
          props.color ? props.theme.color[props.color] : 'inherit'};
      `;

    default:
      return css`
        background-color: ${props => props.theme.color[props.bgColor]};
        color: ${props =>
          props.color
            ? props.theme.color[props.color]
            : props.theme.color.white};
        padding: ${props => props.padding};
      `;
  }
};

const ButtonStyle = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.theme.fontWeight[props.fw]};
  box-shadow: ${props => props.shadow};
  border: ${props => props.border};
  border-radius: ${props => props.radius};
  box-sizing: border-box;
  cursor: pointer;
  ${props => buttonShapeSetting(props.shape)};

  ${props => props.addstyle};

  &:disabled {
    background-color: ${props => props.theme.color[props.disColor]};
  }
`;

export default ButtonStyle;
