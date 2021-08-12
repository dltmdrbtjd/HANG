import styled from 'styled-components';

const HrStyle = styled.hr`
  width: ${({ width }) => width};
  height: 1px;
  margin: ${({ margin }) => margin};
  background-color: ${props => props.theme.color[props.bgColor]};
  border: none;
`;

export default HrStyle;
