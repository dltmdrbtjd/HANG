import { flexBox } from 'src/styles/Mixin';
import { css } from 'styled-components';

const FlexWrapper = css`
  ${flexBox('space-between', 'center')};
  flex-wrap: wrap;
  max-width: 410px;
`;

export default FlexWrapper;
