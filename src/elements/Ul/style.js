import styled, { css } from 'styled-components';
// mixin
import {
  flexBox,
  textProps,
  borderBox,
  outlineBox,
  floatBox,
} from '../../styles/Mixin';

const makeItFlexBox = css`
  ${props =>
    props.isFlex &&
    css`
      ${flexBox(props.hoz, props.ver)};
    `}
`;

const UlStyle = styled.ul`
  ${makeItFlexBox};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  overflow: ${({ overflow }) => overflow};
  margin: ${({ margin }) => margin};
  border-radius: ${({ radius }) => radius};
  box-shadow: ${({ shadow }) => shadow};
  background-color: ${({ bgColor }) => bgColor};
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

export default UlStyle;
