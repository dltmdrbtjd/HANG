import styled, { css } from 'styled-components';

const ButtonStyle = css`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const ToggleLabelStyle = styled.span`
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.white};
  transition: right, 0.5s;
  position: relative;
  left: ${props => (props.checked ? '100%' : 0)};
  transform: translateX(${props => (props.checked ? '-30px' : 0)});
  box-shadow: 2px 0px 3px rgba(136, 82, 0, 0.25);
`;

const ToggleNameStyle = styled.span`
  ${({ theme }) => {
    const font = {
      weight: theme.fontWeight.semiBold,
      size: theme.fontSize.xs,
      color: theme.color.white,
    };

    return css`
      font-size: ${font.size};
      font-weight: ${font.weight};
      color: ${font.color};
    `;
  }}

  position: absolute;
  left: ${props => (props.checked ? '9px' : '100%')};
  transform: translateX(${props => (props.checked ? 0 : '-29px')});
`;

export { ButtonStyle, ToggleLabelStyle, ToggleNameStyle };
