import styled, { css } from 'styled-components';

const AlarmWrapperStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid ${({ theme }) => theme.color.semiLightG};
  padding: 20px 0;
`;

const AlarmTypeStyle = styled.strong`
  ${({ theme }) => {
    const style = {
      color: theme.color.brandColor,
      weight: theme.fontWeight.semiBold,
    };

    return css`
      color: ${style.color};
      border: 1.5px solid ${style.color};
      font-weight: ${style.weight};
    `;
  }}

  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 5px;
  box-sizing: border-box;
`;

export { AlarmWrapperStyle, AlarmTypeStyle };
