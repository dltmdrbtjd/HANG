import { css } from 'styled-components';
// mixin
import { textOverflow, flexBox } from '../../../styles/Mixin';

const SubTitleTextHidden = css`
  max-width: 70%;
  ${textOverflow()};
`;

const TabEventWrapper = css`
  ${flexBox('space-between')};
  flex-wrap: wrap;
`;

export { SubTitleTextHidden, TabEventWrapper };
