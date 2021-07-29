import styled, { css } from 'styled-components';

const setSpanWithStatus = status => {
  switch (status) {
    case 'danger':
      return css`
        color: #ff0005;
      `;
    case 'safe':
      return css`
        color: #00c314;
      `;
    default:
      return null;
  }
};

const SpanStyle = styled.span`
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  ${props => setSpanWithStatus(props.status)};
`;

export default SpanStyle;
