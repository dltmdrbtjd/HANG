import styled, { css, keyframes } from 'styled-components';
import { limitWidth } from 'src/styles/Mixin';

interface Prop {
  cursor: string;
  size: string;
}

interface Theme {
  theme: {
    [propName: string]: any;
  };
}

const setProfileImageSize = (size: string) => {
  switch (size) {
    case 'large':
      return css`
        width: 100px;
        height: 100px;
      `;

    case 'medium':
      return css`
        width: 80px;
        height: 80px;
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

const ImageLazyLoadingWrapper = styled.div<Prop>`
  overflow: hidden;
  border-radius: 50%;
  cursor: ${({ cursor }) => cursor};
  ${({ size }) => setProfileImageSize(size)};
`;

const loading = keyframes`
  to {
    background-position-x: -200%;
  }
`;

const ImagePlaceholder = styled.div<Theme>`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1s ${loading} linear infinite;
`;

const ImageFit = css`
  object-fit: cover;
`;

const DetailImageWrapper = styled.div`
  ${limitWidth('80%')};
`;

export {
  ImageLazyLoadingWrapper,
  ImageFit,
  ImagePlaceholder,
  DetailImageWrapper,
};
