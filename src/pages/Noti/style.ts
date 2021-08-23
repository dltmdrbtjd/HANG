import { css } from 'styled-components';
// media
import { setMediaLimitBoxSize } from '../../styles/Media';

const maxWidth = css`
  max-width: 600px;

  ${setMediaLimitBoxSize('768px')}
`;

export default maxWidth;
