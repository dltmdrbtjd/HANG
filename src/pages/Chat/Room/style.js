import { css } from 'styled-components';

const WarningText = css`
  background-color: ${({ theme }) => theme.color.lightG};
  margin-bottom: 20px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.color.semiLightG};
`;

export default WarningText;
