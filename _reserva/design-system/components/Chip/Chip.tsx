// design-system/components/Chip/Chip.tsx
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@design-system/utils/cn';

export interface ChipProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'accent' | 'outline' | 'selected';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const baseStyles = `
  inline-flex items-center gap-1.5 font-medium rounded-full
  transition-all duration-200 ease-power2-out
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const variants = {
  default: `
    bg-neutral-100 text-neutral-700
    hover:bg-neutral-200 active:bg-neutral-300
    focus:ring-neutral-400
  `,
  primary: `
    bg-primary-100 text-primary-800
    hover:bg-primary-200 active:bg-primary-300
    focus:ring-primary-500
  `,
  accent: `
    bg-accent-100 text-accent-800
    hover:bg-accent-200 active:bg-accent-300
    focus:ring-accent-500
  `,
  outline: `
    bg-transparent border border-neutral-300 text-neutral-700
    hover:bg-neutral-50 active:bg-neutral-100
    focus:ring-neutral-400
  `,
  selected: `
    bg-primary-800 text-white
    hover:bg-primary-700
    focus:ring-primary-500
  `,
};

const sizes = {
  sm: 'px-2.5 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-base gap-2',
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      dismissible = false,
      onDismiss,
      children,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent) => {
      if (dismissible && onDismiss) {
        e.stopPropagation();
        onDismiss();
      } else {
        onClick?.(e);
      }
    };

    return (
      <button
        ref={ref}
        type={dismissible ? 'button' : undefined}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={handleClick}
        {...props}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        <span>{children}</span>
        {dismissible && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
            className={cn(
              'ml-0.5 p-0.5 rounded-full hover:bg-black/10',
              variant === 'selected' && 'hover:bg-white/20'
            )}
            aria-label="Remover"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </button>
    );
  }
);

Chip.displayName = 'Chip';

// ChipGroup para gerenciar seleção múltipla
export interface ChipGroupProps {
  options: Array<{ value: string; label: string; icon?: React.ReactNode }>;
  value: string[];
  onChange: (value: string[]) => void;
  variant?: ChipProps['variant'];
  size?: ChipProps['size'];
  className?: string;
  'aria-label'?: string;
}

export function ChipGroup({
  options,
  value,
  onChange,
  variant = 'primary',
  size = 'md',
  className,
  'aria-label': ariaLabel = 'Opções',
}: ChipGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <Chip
          key={option.value}
          variant={value.includes(option.value) ? 'selected' : variant}
          size={size}
          icon={option.icon}
          onClick={() => {
            const newValue = value.includes(option.value)
              ? value.filter((v) => v !== option.value)
              : [...value, option.value];
            onChange(newValue);
          }}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
}