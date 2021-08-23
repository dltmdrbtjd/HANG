import { css } from 'styled-components';
// mixin
import { flexBox } from 'src/styles/Mixin';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const TextHidden = css<Prop>`
  @media ${({ theme }) => theme.deviceSize.tablet} {
    width: 80%;
    left: 50%;
    transform: translate(-50%, -40%);
  }

  a {
    text-indent: -9999px;
    overflow: hidden;
    display: block;
    ${flexBox('center', 'center')};
  }
`;

export default TextHidden;
