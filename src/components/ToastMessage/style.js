import styled, { keyframes } from 'styled-components';

const toast = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ToastMessageStyle = styled.div`
  display: flex;
  align-items: center;
  width: 376px;
  height: 54px;
  text-align: center;
  border: 1px solid #c4c4c4;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.color.white};
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${toast} 2s;
`;

export default ToastMessageStyle;
