import { css } from 'styled-components';
// mixin
import { setMediaFontSize } from 'src/styles/Media';

const PreLine = css`
  white-space: pre-line;
  ${setMediaFontSize('tab')}
`;

export default PreLine;
