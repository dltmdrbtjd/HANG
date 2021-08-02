import styled, { css } from 'styled-components';

const BorderBottom = css`
  border-bottom: 0.5px solid ${({ theme }) => theme.color.semiLightG};
`;

const LimitWidth = css`
  flex: 1;
`;

const ShowTimeSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export { BorderBottom, LimitWidth, ShowTimeSpan };
