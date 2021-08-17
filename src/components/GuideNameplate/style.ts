import { css } from 'styled-components';
// mixin
import { borderBox } from 'src/styles/Mixin';

const NameplateStyle = css`
  border: 1.5px solid ${({ theme }) => theme.color.brandColor};
  border-radius: 20px;
  ${borderBox('3px 10px')};
`;

export default NameplateStyle;
