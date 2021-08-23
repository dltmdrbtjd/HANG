import { css } from 'styled-components';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const setSmallMobileMargin = css<Prop>`
  @media ${({ theme }) => theme.deviceSize.tablet} {
    padding: 30px 0;
  }
`;

export default setSmallMobileMargin;
