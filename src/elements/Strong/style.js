import styled from 'styled-components';

const StrongStyle = styled.strong`
  margin: ${props => props.margin};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.theme.fontWeight[props.fw]};
  line-height: ${props => props.ls};
`;

export default StrongStyle;
