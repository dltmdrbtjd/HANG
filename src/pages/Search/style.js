import styled from 'styled-components';

const CategoryBtn = styled.button`
  background-color: ${props => props.bgColor};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.theme.fontWeight[props.fw]};
  box-shadow: ${props => props.shadow};
  border: ${props => props.border};
  border-radius: ${props => props.radius};
  box-sizing: border-box;
  cursor: pointer;
`;

export default CategoryBtn;
