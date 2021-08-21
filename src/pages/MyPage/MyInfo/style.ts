import { css } from 'styled-components';
// mixin
import { textOverflow } from '../../../styles/Mixin';

const SubTitleTextHidden = css`
  max-width: 70%;
  ${textOverflow()};
`;

export default SubTitleTextHidden;
