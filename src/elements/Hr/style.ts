import styled from 'styled-components';

export interface Prop {
  width?: string;
  height?: string;
  margin?: string;
  bgColor?: string;
  theme: {
    [propName: string]: any;
  };
}

const HrStyle = styled.hr<Prop>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  background-color: ${({ bgColor, theme }) => theme.color[bgColor]};
  border: none;
`;

export default HrStyle;
