import { css } from 'styled-components';

const WarningText = css`
  background-color: ${({ theme }) => theme.color.white};
  margin-bottom: 20px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.color.semiLightG};
`;

const ChatInputAreaSize = css`
  width: calc(100% - 75px);
`;

export { WarningText, ChatInputAreaSize };
