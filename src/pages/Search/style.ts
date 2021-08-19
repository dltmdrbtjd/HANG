import styled from 'styled-components';

interface Prop {
  theme: {
    [PropName: string]: any;
  }
  color?: string;
  fs?: string;
  fw?: string;
  bgColo?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  shadow?: string;
  border?: string;
  bgColor?: string;
  radius?: string;
}

const CategoryBtn = styled.button<Prop>`
  background-color: ${({bgColor}) => bgColor};
  width: ${({width}) => width};
  height: ${({height}) => height};
  padding: ${({padding}) => padding};
  margin: ${({margin}) => margin};
  color: ${({theme, color}) => theme.color[color]};
  font-size: ${({theme, fs}) => theme.fontSize[fs]};
  font-weight: ${({theme, fw}) => theme.fontWeight[fw]};
  box-shadow: ${({shadow}) => shadow};
  border: ${({border}) => border};
  border-radius: ${({radius}) => radius};
  box-sizing: border-box;
  cursor: pointer;
`;

export default CategoryBtn;
