import styled, { css } from 'styled-components';
// mixin
import {
  flexBox,
  floatBox,
  borderBox,
  textProps,
  outlineBox,
} from '../../styles/Mixin';

const makeItFlexBox = css`
  ${props =>
    props.isFlex &&
    css`
      ${flexBox(props.hoz, props.ver)};
      flex-direction: ${props.column ? 'column' : 'row'};
    `}
`;

const GridStyle = styled.div`
  ${makeItFlexBox};
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};
  height: ${props => props.height};
  max-height: ${props => props.maxHeight};
  margin: ${props => props.margin};
  background-color: ${props => props.theme.color[props.bgColor]};
  border-radius: ${props => props.radius};
  overflow: ${props => props.overflow};
  box-shadow: ${props => props.shadow};
  transform: translate(${props => props.translate});
  cursor: pointer;
  ${props => borderBox(props.padding)};
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

  ${props => props.addstyle};

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default GridStyle;
