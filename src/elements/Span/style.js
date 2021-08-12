import styled, { css } from 'styled-components';
// mixin
import {
  flexBox,
  floatBox,
  textProps,
  borderBox,
  outlineBox,
} from '../../styles/Mixin';

const makeItFlexBox = css`
  ${props =>
    props.isFlex &&
    css`
      ${flexBox(props.hoz, props.ver, 'inline-flex')};
    `}
`;

const SpanStyle = styled.span`
  ${makeItFlexBox};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-shadow: ${({ shadow }) => shadow};
  border-radius: ${({ radius }) => radius};
  background-color: ${({ bgColor }) => bgColor};
  display: ${({ display }) => display};
  ${({ padding }) => borderBox(padding)};
  ${props =>
    textProps(props.fs, props.fw, props.color, props.lh, props.textAlign)};
  ${props => outlineBox(props.border, props.borDirection)};
  ${props =>
    floatBox(
      props.position,
      props.top,
      props.right,
      props.bottom,
      props.left,
      props.z,
    )};

  ${({ addstyle }) => addstyle};
`;

export default SpanStyle;
