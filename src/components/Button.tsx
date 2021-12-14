import styled from 'styled-components';

interface IButtonProps {
  alert?: boolean;
}

export const Button = styled.div<IButtonProps>`
  display: inline-block;
  border: ${(props) => `1px solid ${props.alert ? 'red' : 'black'}`};
  color: ${(props) => `${props.alert ? 'red' : 'black'}`};
  border-radius: 3px;
  padding: 0.25rem 1rem;
  margin: 0.25rem;
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: var(--color-bg);
  }
`;
