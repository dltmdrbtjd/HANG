import styled from 'styled-components';

const SubTitleStyle = styled.h3`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.fw};
  line-height: ${props => props.ls};
  text-align: ${props => props.textAlign};
  box-sizing: border-box;
`;

export default SubTitleStyle;
