import styled, { css } from 'styled-components';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const WarningText = css<Prop>`
  background-color: ${({ theme }) => theme.color.white};
  margin-bottom: 20px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.color.lightGray};
`;

const ChatInputArea = styled.textarea`
  width: calc(100% - 100px);
  padding: 12px;
  border: none;
  resize: none;
  background: none;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.gray};
    border-radius: 15px;
  }

  &:focus {
    outline: none;
  }
`;

export { WarningText, ChatInputArea };
