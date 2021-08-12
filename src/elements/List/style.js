import styled, { css } from 'styled-components';
// mixin
import { flexBox, borderBox, outlineBox } from '../../styles/Mixin';

const makeItFlexBox = css`
  ${props =>
    props.isFlex &&
    css`
      ${flexBox(props.hoz, props.ver)};
    `}
`;

const ListStyle = styled.li`
  ${makeItFlexBox};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius};
  background-color: ${({ bgColor }) => bgColor};
  font-size: ${props => props.theme.fontSize[props.fs]};
  cursor: pointer;
  ${({ padding }) => borderBox(padding)};
  ${props => outlineBox(props.border, props.borDirection)};

  ${({ addstyle }) => addstyle};
`;

export default ListStyle;
