import { css } from 'styled-components';

const SpeechBubbleStyle = css`
  ${props => {
    const bgColor = props.person === 'me' ? 'brandColor' : 'semiLightG';

    return css`
      background-color: ${props.theme.color[bgColor]};
    `;
  }}

  display: inline-block;
  max-width: 232px;
  border-radius: 8px;
`;

export default SpeechBubbleStyle;