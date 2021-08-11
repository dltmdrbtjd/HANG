import styled from 'styled-components';

const PromiseCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 14px;
  box-shadow: 0px 2px 3px rgba(196, 196, 196, 0.25);
  background-color: ${({ theme }) => theme.color.white};
  padding: 20px;
`;

export default PromiseCard;
