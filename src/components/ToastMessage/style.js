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
  border-radius: 14px;
  background-color: ${({ theme }) => theme.color.skyblue};
  box-shadow: 0 4px 4px rgba(134, 134, 134, 0.3);
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${toast} 2s;
`;

export default ToastMessageStyle;
