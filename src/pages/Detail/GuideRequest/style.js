import styled from 'styled-components';

const RadioBtn = styled.input`
  &[type='radio'],
  &[type='radio']:checked {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    cursor: pointer;
    margin-right: 22px;
  }

  &[type='radio'] {
    background-color: ${({ theme }) => theme.color.white};
    border: 5px solid ${({ theme }) => theme.color.semiLightG};
  }

  &[type='radio']:checked {
    background-color: ${({ theme }) => theme.color.brandColor};
  }
`;

export default RadioBtn;
