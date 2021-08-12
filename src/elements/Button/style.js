import styled, { css } from 'styled-components';
// mixin
import { borderBox, textProps, outlineBox, flexBox } from '../../styles/Mixin';

const makeItFlexBox = css`
  ${props =>
    props.isFlex &&
    css`
      ${flexBox(props.hoz, props.ver, 'inline-flex')};
    `}
`;

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
        font-weight: ${props =>
          props.fw
            ? props.theme.fontWeight[props.fw]
            : props.theme.fontWeight.bold};
        ${props => borderBox(props.padding)};
      `;
  }
};

const ButtonStyle = styled.button`
  ${makeItFlexBox};
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  box-shadow: ${props => props.shadow};
  border-radius: ${props => props.radius};
  cursor: pointer;
  ${props =>
    textProps(
      props.fs ? props.fs : 'inherit',
      props.fw ? props.fw : 'inherit',
      props.color,
      props.lh,
      props.textAlign,
    )};
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
