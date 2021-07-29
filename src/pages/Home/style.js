import styled from 'styled-components';

const PromiseCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 14px;
  box-shadow: 0 4px 4px rgba(134, 134, 134, 0.3);
  background-color: ${({ theme }) => theme.color.white};
  padding: 14px 23px 40px 23px;
`;

export default PromiseCard;
