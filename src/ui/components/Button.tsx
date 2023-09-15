import { PropsWithChildren } from 'react';
import '../../styles/Button.scss';

type ButtonProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  className,
  onClick
}: PropsWithChildren<ButtonProps>) {
  return (
    <button onClick={onClick} className={`rounded-button ${className || ''}`}>
      {children}
    </button>
  );
}
