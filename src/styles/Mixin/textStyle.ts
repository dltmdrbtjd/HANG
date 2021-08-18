import { css } from 'styled-components';
import theme from '../theme';

const textProps = (
  fontSize: string,
  fontWeight: string,
  color: string,
  lineHeight: string,
  textAlign: string,
) => {
  return css`
    font-size: ${theme.fontSize[fontSize]};
    font-weight: ${theme.fontWeight[fontWeight]};
    color: ${theme.color[color]};
    ${lineHeight && `line-height: ${lineHeight}`};
    ${textAlign && `text-align: ${textAlign}`};
  `;
};

const addTextSettings = (
  letterSpacing: string,
  wordBreak: string,
  whiteSpace: string,
) => {
  return css`
    ${letterSpacing && `letter-spacing: ${letterSpacing}`};
    ${wordBreak && `word-break: ${wordBreak}`};
    ${whiteSpace && `white-space: ${whiteSpace}`};
  `;
};

const textOverflow = () => {
  return css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `;
};

const textOverflowWrap = (clamp: string | number) => {
  return css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${clamp};
    text-overflow: ellipsis;
  `;
};

export { textProps, addTextSettings, textOverflow, textOverflowWrap };
