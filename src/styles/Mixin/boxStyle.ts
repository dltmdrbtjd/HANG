import { css } from 'styled-components';

const flexBox = (hoz: string, ver: string, display = 'flex') => {
  return css`
    display: ${display};
    ${hoz && `justify-content: ${hoz}`};
    ${ver && `align-items: ${ver}`};
  `;
};

const floatBox = (
  position: string,
  top: string | number,
  right: string | number,
  bottom: string | number,
  left: string | number,
  zIndex: string | number,
) => {
  return css`
    position: ${position};
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
    ${zIndex && `z-index: ${zIndex}`};
  `;
};

const borderBox = (padding: string) => {
  return css`
    padding: ${padding};
    box-sizing: border-box;
  `;
};

const outlineBox = (border: string, direction: string) => {
  switch (direction) {
    case 'top':
      return css`
        border-top: ${border};
      `;

    case 'right':
      return css`
        border-right: ${border};
      `;

    case 'bottom':
      return css`
        border-bottom: ${border};
      `;

    case 'left':
      return css`
        border-left: ${border};
      `;

    default:
      return css`
        border: ${border};
      `;
  }
};

const limitWidth = css`
  flex: 1;
`;

export { flexBox, floatBox, borderBox, outlineBox, limitWidth };
