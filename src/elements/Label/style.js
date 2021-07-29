import styled from 'styled-components';

const LabelStyle = styled.label`
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.theme.fontWeight[props.fw]};
  color: ${props => props.theme.color[props.color]};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  line-height: ${props => props.lh};
  box-sizing: border-box;
`;

export default LabelStyle;
