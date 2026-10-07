// design-system/components/Header/Header.tsx
import { cn } from '@design-system/utils/cn';
import { Menu, X, Scale, Phone, MessageSquare } from 'lucide-react';

export interface HeaderProps {
  logo: React.ReactNode;
  navigation?: Array<{ label: string; href: string }>;
  ctaPrimary?: { label: string; href: string; onClick?: () => void };
  ctaSecondary?: { label: string; href: string };
  mobileCtaButtons?: Array<{ label: string; href: string; icon?: React.ReactNode; variant?: 'primary' | 'whatsapp' | 'phone' }>;
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function Header({
  logo,
  navigation = [],
  ctaPrimary,
  ctaSecondary,
  mobileCtaButtons = [],
  variant = 'desktop',
  className,
}: HeaderProps) {
  const isMobile = variant === 'mobile';

  if (isMobile) {
    return (
      <header className={cn('fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100', className)}>
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="Veríssimo Sodré - Início">
            <div className="w-8 h-8">{logo}</div>
          </a>

          <nav className="flex items-center gap-2">
            {mobileCtaButtons.map((btn, i) => (
              <a
                key={i}
                href={btn.href}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
                  btn.variant === 'whatsapp'
                    ? 'bg-[#25D366] text-white hover:bg-[#1EBE5A]'
                    : btn.variant === 'phone'
                    ? 'bg-primary-800 text-white hover:bg-primary-700'
                    : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                )}
              >
                {btn.icon && <span aria-hidden="true">{btn.icon}</span>}
                {btn.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    );
  }

  // Desktop header
  return (
    <header className={cn('fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100', className)}>
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2" aria-label="Veríssimo Sodré - Início">
          <div className="w-10 h-10">{logo}</div>
          <span className="hidden sm:block text-xl font-bold text-primary-800">Veríssimo Sodré</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navigation.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-sm font-medium text-neutral-600 hover:text-primary-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          {ctaSecondary && (
            <a
              href={ctaSecondary.href}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              {ctaSecondary.label}
            </a>
          )}
          {ctaPrimary && (
            <a
              href={ctaPrimary.href}
              onClick={ctaPrimary.onClick}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-primary-800 text-white hover:bg-primary-700 transition-colors shadow-button"
            >
              {ctaPrimary.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

// Mobile Navigation Drawer
import { useState, createPortal } from 'react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: Array<{ label: string; href: string }>;
  ctaPrimary?: { label: string; href: string; onClick?: () => void };
  ctaSecondary?: { label: string; href: string };
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  navigation,
  ctaPrimary,
  ctaSecondary,
}: MobileNavDrawerProps) {
  if (!isOpen) return null;

  const drawerContent = (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Menu de navegação">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex-1 max-w-sm bg-white animate-slide-right">
        <header className="flex items-center justify-between p-4 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-neutral-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </header>
        <nav className="p-4 space-y-2" aria-label="Navegação mobile">
          {navigation.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100 hover:text-primary-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-100 bg-white/95 backdrop-blur-sm space-y-2">
          {ctaSecondary && (
            <a
              href={ctaSecondary.href}
              onClick={onClose}
              className="block w-full text-center px-4 py-3 rounded-lg text-base font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              {ctaSecondary.label}
            </a>
          )}
          {ctaPrimary && (
            <a
              href={ctaPrimary.href}
              onClick={() => { ctaPrimary.onClick?.(); onClose(); }}
              className="block w-full text-center px-4 py-3 rounded-lg text-base font-medium bg-primary-800 text-white hover:bg-primary-700 transition-colors"
            >
              {ctaPrimary.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(drawerContent, document.body);
  }
  return null;
}