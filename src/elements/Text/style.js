import styled from 'styled-components';

const TextStyle = styled.p`
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.fw};
  color: ${props => props.theme.color[props.color]};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  line-height: ${props => props.lh};
  letter-spacing: ${props => props.ls};
  text-align: ${props => props.textAlign};
  overflow: ${props => props.overflow};
  white-space: pre-line;
  word-break: ${props => props.wb};
  box-sizing: border-box;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props => props.clamp};
`;

export default TextStyle;
