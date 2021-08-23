import { css } from 'styled-components';

const SignUpWrapperHeight = css`
  min-height: calc(100vh - 130px);

  @media ${({ theme }) => theme.deviceSize.tablet} {
    min-height: calc(100vh - 90px);
  }
`;

export const ForgotPwdWrapperHeight = css`
  min-height: calc(100vh - 70px);
`;

export default SignUpWrapperHeight;
