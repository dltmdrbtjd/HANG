import { css } from 'styled-components';
// mixin
import { textOverflow } from '../../../styles/Mixin';

const LimitWidth = css`
  flex: 1;
  ${textOverflow()};
`;

const BackgroundOpacity = css`
  background-color: rgba(255, 0, 5, 0.2);
`;

export { LimitWidth, BackgroundOpacity };
