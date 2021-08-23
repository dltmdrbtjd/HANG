import { css } from 'styled-components';
// media
import { setTabletLimitBoxSize } from '../../../../styles/Media';

const SpeechBubbleStyle = (person: boolean) => {
  return css`
    ${({ theme }) => {
      const bgColor = person ? 'brandColor' : 'lightGray';

      return css`
        background-color: ${theme.color[bgColor]};
      `;
    }}

    display: inline-block;
    max-width: 232px;
    border-radius: 8px;
    white-space: pre-line;
    word-wrap: break-word;
    word-break: keep-all;

    ${setTabletLimitBoxSize('238px')}
  `;
};

export { SpeechBubbleStyle };
