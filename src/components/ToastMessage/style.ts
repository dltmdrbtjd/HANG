import styled, {keyframes} from 'styled-components';

interface Prop {
  theme: {
    [PropName: string]: any;
  }
}

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

const ToastMessageStyle = styled.div<Prop>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 54px;
  text-align: center;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.color.skyblue};
  position: fixed;
  z-index: 10;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${toast} 2.0s;
`;

export default ToastMessageStyle;