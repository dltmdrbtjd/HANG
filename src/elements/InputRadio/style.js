import styled from 'styled-components';

const RadioStyle = styled.input`
  &[type='radio'],
  &[type='radio']:checked {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    margin-right: 10px;
    cursor: pointer;
  }

  &[type='radio'] {
    background-color: ${({ theme }) => theme.color.white};
    border: 5px solid ${({ theme }) => theme.color.semiLightG};
  }
  &[type='radio']:checked {
    background-color: ${({ theme }) => theme.color.brandColor};
  }
`;

export default RadioStyle;
