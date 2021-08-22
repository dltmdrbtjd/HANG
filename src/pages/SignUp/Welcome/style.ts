import { css } from 'styled-components';
// mixin
import { flexBox } from 'src/styles/Mixin';

const TextHidden = css`
  a {
    text-indent: -9999px;
    overflow: hidden;
    display: block;
    ${flexBox('center', 'center')};
  }
`;

export default TextHidden;
