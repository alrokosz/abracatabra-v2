import { PropsWithChildren } from 'react';
import '../../styles/Button.scss';

type ButtonProps = {
  className?: string;
};

export default function Button({
  children,
  className
}: PropsWithChildren<ButtonProps>) {
  return <button className={`rounded-button ${className}`}>{children}</button>;
}
