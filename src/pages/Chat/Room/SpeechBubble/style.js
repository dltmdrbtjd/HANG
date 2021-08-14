import { css } from 'styled-components';

const SpeechBubbleStyle = css`
  ${props => {
    const bgColor = props.person ? 'brandColor' : 'semiLightG';

    return css`
      background-color: ${props.theme.color[bgColor]};
    `;
  }}

  display: inline-block;
  max-width: 232px;
  border-radius: 8px;
  white-space: pre-line;
`;

const TabSpeechBubble = css`
  max-width: 238px;
`;

export { SpeechBubbleStyle, TabSpeechBubble };
