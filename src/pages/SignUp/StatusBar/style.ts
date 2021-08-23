import { css } from 'styled-components';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const setSmallMobileMargin = css<Prop>`
  ${({ theme }) => theme.media.mobile`
    padding: 30px 0;
  `};
`;

export default setSmallMobileMargin;
