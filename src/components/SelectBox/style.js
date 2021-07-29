import styled, { css } from 'styled-components';

const commonStyle = css`
  box-shadow: 0px 2px 3px rgba(136, 136, 136, 0.25);
  background-color: ${({ theme }) => theme.color.white};
`;

export const SpanStyle = styled.span`
  width: 100%;
  padding: 14px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  ${commonStyle};

  img {
    transition-duration: 0.5s;
    transform: rotate(${props => props.angle}deg);
  }
`;

const ListWrapper = styled.ul`
  width: 100%;
  padding-top: 24px;
  margin-top: -24px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;
  background-color: ${({ theme }) => theme.color.white};
  ${commonStyle};
`;

export const ListStyle = styled.li`
  width: 100%;
  height: 32px;
  padding: 0 12px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  background-color: ${props => props.theme.color[props.bgColor]};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.skyblue};
  }
`;

export default ListWrapper;
