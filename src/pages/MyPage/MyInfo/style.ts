import { css } from 'styled-components';
// mixin
import { textOverflow } from '../../../styles/Mixin';

const SubTitleTextHidden = css`
  display: inline-block;
  max-width: 140px;
  ${textOverflow()};
`;

export default SubTitleTextHidden;
