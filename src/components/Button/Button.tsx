import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styled from 'styled-components';

enum ColorButton {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
}

type ButtonColorType = `${ColorButton}`;

interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'color'
  > {
  color?: ButtonColorType;
}

// const colorMap = proxyWithDefault(
//   {
//     [ColorButton.PRIMARY]: '#007bff',
//     [ColorButton.SECONDARY]: '#6c757d',
//     [ColorButton.SUCCESS]: '#28a745',
//     [ColorButton.DANGER]: '#dc3545',
//     [ColorButton.WARNING]: '#ffc107',
//     [ColorButton.INFO]: '#17a2b8',
//     [ColorButton.LIGHT]: '#f8f9fa',
//     [ColorButton.DARK]: '#343a40',
//   },
//   '#007bff',
// );

const ButtonSty = styled.button<{ color: ButtonColorType }>`
  background-color: ${(props) => `var(--${props.color})`};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: ${(props) => `var(--${props.color})`};
  }
`;

export const Button = ({ children, color = ColorButton.PRIMARY, ...props }: ButtonProps) => {
  return (
    <ButtonSty color={color} {...props}>
      {children}
    </ButtonSty>
  );
};
