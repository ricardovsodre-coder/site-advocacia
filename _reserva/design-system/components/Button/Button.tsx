// design-system/components/Button/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@design-system/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'phone' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const baseStyles = `
  inline-flex items-center justify-center font-medium rounded-lg
  transition-all duration-200 ease-power2-out
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
`;

const variants = {
  primary: `
    bg-primary-800 text-white
    hover:bg-primary-700 active:bg-primary-900
    focus:ring-primary-500
    shadow-button
  `,
  secondary: `
    bg-neutral-100 text-neutral-900 border border-neutral-200
    hover:bg-neutral-200 active:bg-neutral-300
    focus:ring-neutral-400
  `,
  ghost: `
    bg-transparent text-neutral-700
    hover:bg-neutral-100 active:bg-neutral-200
    focus:ring-neutral-400
  `,
  whatsapp: `
    bg-[#25D366] text-white
    hover:bg-[#1EBE5A] active:bg-[#18A04E]
    focus:ring-[#25D366]
    shadow-button
  `,
  phone: `
    bg-primary-800 text-white
    hover:bg-primary-700 active:bg-primary-900
    focus:ring-primary-500
    shadow-button
  `,
  outline: `
    bg-transparent border-2 border-primary-800 text-primary-800
    hover:bg-primary-50 active:bg-primary-100
    focus:ring-primary-500
  `,
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
  xl: 'px-8 py-4 text-xl gap-3',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && iconLeft && <span aria-hidden="true">{iconLeft}</span>}
        <span>{children}</span>
        {!loading && iconRight && <span aria-hidden="true">{iconRight}</span>}
      </button>
    )
  }
);

Button.displayName = 'Button';