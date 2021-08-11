import styled, { css } from 'styled-components';

const HrStyle = styled.hr`
  width: 84px;
  height: 1px;
  border: none;
  background-color: ${props => props.hrColor};
`;

const SetSmallMobile = css`
  padding-top: 30px;
  margin-bottom: 30px;
`;

export { HrStyle, SetSmallMobile };
