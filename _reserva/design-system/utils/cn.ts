// design-system/utils/cn.ts — classnames helper (clsx + tailwind-merge)
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Variantes de componente tipadas
export type ComponentVariants<T extends Record<string, string>> = {
  [K in keyof T]?: T[K];
};

// Helper para criar variantes
export function createVariants<T extends Record<string, Record<string, string>>>(
  base: string,
  variants: T
) {
  return (
    props: { class?: string } & Partial<{ [K in keyof T]: keyof T[K] }>
  ) => {
    const { class: className, ...variantProps } = props;
    const variantClasses = Object.entries(variantProps)
      .map(([key, value]) => variants[key]?.[value as string])
      .filter(Boolean)
      .join(' ');
    return cn(base, variantClasses, className);
  };
}