import { css } from 'styled-components';
// mixin
import { limitWidth, textOverflow } from '../../../styles/Mixin';

const LimitWidth = css`
  ${limitWidth};
  ${textOverflow()};
`;

const BackgroundOpacity = css`
  background-color: rgba(255, 0, 5, 0.2);
`;

export { LimitWidth, BackgroundOpacity };
