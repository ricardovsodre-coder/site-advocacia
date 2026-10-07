// design-system/components/Modal/Modal.tsx
import { forwardRef, type HTMLAttributes, useEffect } from 'react';
import { cn } from '@design-system/utils/cn';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [isOpen, closeOnEscape, onClose]);

    if (!isOpen) return null;

    const modalContent = (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            'relative w-full bg-white rounded-2xl shadow-modal animate-scale-in',
            sizes[size],
            className
          )}
          {...props}
        >
          {(title || showCloseButton) && (
            <header className="flex items-start justify-between p-6 border-b border-neutral-100">
              <div>
                {title && (
                  <h2
                    id="modal-title"
                    className="text-lg font-semibold text-neutral-900"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-sm text-neutral-500"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    'p-1 rounded-lg text-neutral-400 hover:text-neutral-600',
                    'hover:bg-neutral-100 transition-colors duration-150',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500'
                  )}
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </header>
          )}

          <div className="p-6">{children}</div>
        </div>
      </div>
    );

    // Portal para body (evita problemas de z-index)
    if (typeof window !== 'undefined') {
      return createPortal(modalContent, document.body);
    }

    return null;
  }
);

Modal.displayName = 'Modal';

// Modal composto para formulários
export interface FormModalProps extends Omit<ModalProps, 'children'> {
  children: React.ReactNode;
  submitLabel?: string;
  onSubmit?: (e: React.FormEvent) => void;
  loading?: boolean;
}

export function FormModal({
  submitLabel = 'Salvar',
  onSubmit,
  loading = false,
  children,
  ...props
}: FormModalProps) {
  return (
    <Modal {...props}>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
          <button
            type="button"
            onClick={props.onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-800 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Salvando...' : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// BottomSheet para mobile
export interface BottomSheetProps extends Omit<ModalProps, 'size'> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  handle?: boolean;
}

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      isOpen,
      onClose,
      title,
      handle = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    if (!isOpen) return null;

    const sheetContent = (
      <div
        className="fixed inset-0 z-50 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottomsheet-title' : undefined}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          ref={ref}
          className={cn(
            'relative flex-1 bg-white rounded-t-2xl shadow-2xl animate-slide-up',
            'max-h-[90vh] flex flex-col',
            className
          )}
          {...props}
        >
          {handle && (
            <div className="flex items-center justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-neutral-300 rounded-full" />
            </div>
          )}
          {title && (
            <header className="px-6 py-3 border-b border-neutral-100">
              <h2 id="bottomsheet-title" className="text-lg font-semibold text-neutral-900">
                {title}
              </h2>
            </header>
          )}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    );

    if (typeof window !== 'undefined') {
      return createPortal(sheetContent, document.body);
    }

    return null;
  }
);

BottomSheet.displayName = 'BottomSheet';