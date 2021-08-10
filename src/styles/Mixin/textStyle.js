import { css } from 'styled-components';

const textProps = (fontSize, fontWeight, color, lineHeight, textAlign) => {
  return css`
    font-size: ${({ theme }) => theme.fontSize[fontSize]};
    font-weight: ${({ theme }) => theme.fontWeight[fontWeight]};
    color: ${({ theme }) => theme.color[color]};
    ${lineHeight && `line-height: ${lineHeight}`};
    ${textAlign && `text-align: ${textAlign}`};
  `;
};

const addTextSettings = (letterSpacing, wordBreak, whiteSpace) => {
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

const textOverflowWrap = clamp => {
  return css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${clamp};
    text-overflow: ellipsis;
  `;
};

export { textProps, addTextSettings, textOverflow, textOverflowWrap };
