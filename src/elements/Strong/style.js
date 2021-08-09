import styled from 'styled-components';

const StrongStyle = styled.strong`
  margin: ${props => props.margin};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props =>
    props.fs ? props.theme.fontSize[props.fs] : 'inherit'};
  font-weight: ${props => props.theme.fontWeight[props.fw]};
  line-height: ${props => props.ls};

  ${props => props.addstyle};
`;

export default StrongStyle;
