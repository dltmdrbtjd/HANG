import { css } from 'styled-components';

const setProfileImageSize = (size: string) => {
  switch (size) {
    case 'large':
      return css`
        width: 100px;
        padding-bottom: 100px;
      `;

    case 'medium':
      return css`
        width: 60px;
        padding-bottom: 60px;
      `;

    case 'small':
      return css`
        width: 40px;
        padding-bottom: 40px;
      `;

    default:
      return css`
        width: 60px;
        padding-bottom: 60px;
      `;
  }
};

const ImagePosition = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export { setProfileImageSize, ImagePosition };
