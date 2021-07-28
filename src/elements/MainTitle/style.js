import styled from 'styled-components';

const MainTitleStyle = styled.h2`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.theme.fontWeight[props.fw]};
  line-height: ${props => props.ls};
  text-align: ${props => props.textAlign};
  box-sizing: border-box;
`;

export default MainTitleStyle;
