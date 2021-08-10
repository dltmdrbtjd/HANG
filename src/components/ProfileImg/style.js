import { css } from 'styled-components';

const setProfileImageSize = size => {
  switch (size) {
    case 'large':
      return css`
        width: 100px;
        height: 100px;
      `;

    case 'medium':
      return css`
        width: 60px;
        height: 60px;
      `;

    case 'small':
      return css`
        width: 40px;
        height: 40px;
      `;

    default:
      return css`
        width: 60px;
        height: 60px;
      `;
  }
};

export default setProfileImageSize;
