import styled from 'styled-components';

const HrStyle = styled.hr`
  width: 84px;
  height: 1px;
  border: none;
  background-color: ${props => props.hrColor};
`;

export default HrStyle;
