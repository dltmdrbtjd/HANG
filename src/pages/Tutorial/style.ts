import { css } from 'styled-components';

const ButtonStyle = css`
  max-width: 550px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const ImageStyle = css`
  max-width: 600px;
  margin: 0 auto;
`;

const boxWidth = css`
  max-width: 768px;
`;

export { ButtonStyle, ImageStyle, boxWidth };
