import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'cash' | 'transfer' | 'card' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'bg-[#22C55E] text-white hover:bg-[#16a34a] shadow-sm shadow-green-100',
  outline: 'border border-[#e8e8e4] bg-white text-[#111827] hover:bg-gray-50',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  cash: 'bg-green-50 text-green-700 border border-green-100 hover:bg-green-100',
  transfer: 'bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100',
  card: 'bg-orange-50 text-orange-700 border border-orange-100 hover:bg-orange-100',
  destructive: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs rounded-xl',
  md: 'h-11 px-5 text-sm rounded-xl',
  lg: 'h-13 px-7 text-base rounded-2xl',
  icon: 'h-10 w-10 rounded-xl',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export { Button };
