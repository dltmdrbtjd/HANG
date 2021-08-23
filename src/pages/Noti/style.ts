import { css } from 'styled-components';
// media
import { setTabletLimitBoxSize } from '../../styles/Media';

const maxWidth = css`
  max-width: 600px;

  ${setTabletLimitBoxSize('768px')}
`;

export default maxWidth;
