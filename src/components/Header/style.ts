import styled from 'styled-components';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const HeaderStyle = styled.header<Prop>`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  box-shadow: 0px 2px 3px rgba(196, 196, 196, 0.25);
  background-color: ${({ theme }) => theme.color.bgColor};
`;

export default HeaderStyle;
