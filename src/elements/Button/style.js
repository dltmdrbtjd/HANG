import styled, { css } from 'styled-components';
// mixin
import { borderBox, textProps, outlineBox } from '../../styles/Mixin';

const buttonShapeSetting = form => {
  switch (form) {
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
        ${props => borderBox(props.padding)};
      `;
  }
};

const ButtonStyle = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  box-shadow: ${props => props.shadow};
  border-radius: ${props => props.radius};
  cursor: pointer;
  ${props =>
    textProps(props.fs, props.fw, props.color, props.lh, props.textAlign)};
  ${props => outlineBox(props.border, props.borDirection)};
  ${props => buttonShapeSetting(props.form)};

  ${props => props.addstyle};

  &:disabled {
    background-color: ${props => props.theme.color[props.disColor]};
  }

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default ButtonStyle;
