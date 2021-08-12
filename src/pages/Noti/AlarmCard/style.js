import { css } from 'styled-components';

const StrongAddStyle = css`
  ${({ theme }) => {
    const style = {
      color: theme.color.brandColor,
    };

    return css`
      color: ${style.color};
      border: 1.5px solid ${style.color};
    `;
  }}

  border-radius: 20px;
  padding: 3px 10px;
  margin-right: 3px;
  box-sizing: border-box;
`;

export default StrongAddStyle;
