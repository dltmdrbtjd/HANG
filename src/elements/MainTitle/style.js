import styled from 'styled-components';

const MainTitleStyle = styled.h2`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.theme.fontWeight[props.fw]};
  letter-spacing: ${props => props.ls};
  line-height: ${props => props.ls};
  text-align: ${props => props.textAlign};
  word-break: keep-all;
  box-sizing: border-box;

  ${props => props.addstyle};
`;

export default MainTitleStyle;
