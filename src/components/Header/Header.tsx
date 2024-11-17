import clsx from 'clsx';
import { ReactNode } from 'react';

interface HeaderProps {
  color?: string;
  type?: 'primary' | 'secondary' | 'tertiary'; // Add a type for different header styles
  children: ReactNode;
}

export const Header = ({
  color = 'text-slate-100',
  type = 'primary',
  children,
}: HeaderProps) => {
  const styles = {
    primary: 'text-4xl font-medium tracking-tight sm:text-6xl',
    secondary: 'text-3xl font-semibold tracking-wide sm:text-5xl',
    tertiary: 'text-2xl font-semibold tracking-loose sm:text-2xl',
  };

  return (
    <h1 className={clsx('text-balance', styles[type], color)}>{children}</h1>
  );
};
