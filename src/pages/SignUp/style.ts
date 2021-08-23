import { css } from 'styled-components';

const SignUpWrapperHeight = css`
  min-height: calc(100vh - 130px);

  @media ${({ theme }) => theme.deviceSize.tablet} {
    min-height: calc(100vh - 90px);
  }
`;

export default SignUpWrapperHeight;
