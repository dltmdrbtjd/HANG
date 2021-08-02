import styled, { css } from 'styled-components';

const TextStyle = styled.p`
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.theme.fontWeight[props.fw]};
  color: ${props => props.theme.color[props.color]};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  line-height: ${props => props.lh};
  letter-spacing: ${props => props.ls};
  text-align: ${props => props.textAlign};
  overflow: ${props => props.overflow};
  word-break: ${props => props.wb};
  white-space: ${props => props.ws};
  box-sizing: border-box;
  text-overflow: ellipsis;

  ${props => {
    if (props.clamp) {
      return css`
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${props.clamp};
      `;
    }

    return null;
  }}

  ${props => props.addstyle};
`;

export default TextStyle;
