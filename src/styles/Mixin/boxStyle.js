import { css } from 'styled-components';

const flexBox = (hoz, ver) => {
  return css`
    display: flex;
    ${hoz && `justify-content: ${hoz}`};
    ${ver && `align-items: ${ver}`};
  `;
};

const floatBox = (position, top, right, bottom, left, zIndex) => {
  return css`
    position: ${position};
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
    ${zIndex && `z-index: ${zIndex}`};
  `;
};

const borderBox = padding => {
  return css`
    padding: ${padding};
    box-sizing: border-box;
  `;
};

const outlineBox = (border, direction) => {
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

export { flexBox, floatBox, borderBox, outlineBox };
