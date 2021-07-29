import styled from 'styled-components';

const LabelStyle = styled.label`
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.theme.fontWeight[props.fw]};
  color: ${props => props.theme.color[props.color]};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  line-height: ${props => props.lh};
  width: ${props => props.width};
  height: ${props => props.height};
  position: ${props => props.position};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  box-sizing: border-box;
  z-index: ${props => props.z};
`;

export default LabelStyle;
