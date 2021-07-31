import styled from 'styled-components';

const TopBtnStyle = styled.button`
  position: fixed;
  bottom: 120px;
  right: 20px;
  z-index: 10;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: none;
  box-shadow: 1px 1px 6px 4px rgba(134, 134, 134, 0.3);
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default TopBtnStyle;
