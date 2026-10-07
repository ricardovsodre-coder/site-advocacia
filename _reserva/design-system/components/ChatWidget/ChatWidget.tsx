// design-system/components/ChatWidget/ChatWidget.tsx
import { useState, useEffect, useRef, type HTMLAttributes } from 'react';
import { cn } from '@design-system/utils/cn';
import { MessageSquare, X, Send, Loader2, CheckCircle, AlertCircle, LogIn, Chrome } from 'lucide-react';

export interface ChatWidgetProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  authenticated?: boolean;
  user?: { name: string; picture?: string };
  messages?: Array<{ role: 'user' | 'assistant'; content: string }>;
  onSendMessage: (message: string) => Promise<void>;
  loading?: boolean;
  questionsLeft?: number;
  error?: string;
  variant?: 'desktop' | 'mobile';
  areaChips?: string[];
}

const AREAS = [
  'Verbas rescisórias', 'Horas extras', 'Assédio moral',
  'Sem registro', 'Justa causa', 'Insalubridade',
  'Acidente/doença', 'Rescisão indireta', 'Acordo coletivo',
];

export const ChatWidget = forwardRef<HTMLDivElement, ChatWidgetProps>(
  (
    {
      isOpen,
      onClose,
      onLogin,
      authenticated = false,
      user,
      messages = [],
      onSendMessage,
      loading = false,
      questionsLeft = 5,
      error,
      variant = 'desktop',
      areaChips = AREAS,
      className,
      ...props
    },
    ref
  ) => {
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && !authenticated) {
      setShowWelcome(true);
    }
  }, [isOpen, authenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const message = input.trim();
    setInput('');
    setShowWelcome(false);
    await onSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const setArea = (area: string) => {
    setInput(`Sobre ${area}: `);
    textareaRef.current?.focus();
  };

  if (!isOpen) return null;

  const isMobile = variant === 'mobile';

  return (
    <div
      ref={ref}
      className={cn(
        'fixed z-50 flex',
        isMobile ? 'inset-0' : 'bottom-6 right-6',
        className
      )}
      {...props}
    >
      {/* Overlay (mobile) */}
      {isMobile && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Modal */}
      <div
        className={cn(
          'bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up',
          isMobile
            ? 'w-full max-w-sm h-[90vh] max-h-[700px] mx-auto my-auto'
            : 'w-96 h-[600px] max-h-[80vh]'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Chat com IA Trabalhista"
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary-900 to-primary-700 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">IA Trabalhista</h3>
              <p className="text-xs opacity-80">Dr. Ricardo Sodré — OAB/SP 441.049</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Fechar chat"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Auth Screen */}
        {!authenticated && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <Chrome className="w-16 h-16 text-blue-100 mb-4" aria-hidden="true" />
            <h4 className="text-lg font-medium mb-1">Entre com o Google para conversar</h4>
            <p className="text-sm text-neutral-500 mb-6 max-w-xs">
              Suas perguntas são confidenciais (LGPD). Limite de 5 perguntas por dia.
            </p>
            <button
              onClick={onLogin}
              className="w-full max-w-xs flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition font-medium text-neutral-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuar com o Google
            </button>
            <p className="text-xs text-neutral-400 mt-3">
              Ao continuar, você aceita nossa <a href="/politica-de-privacidade" className="underline text-primary-600">Política de Privacidade</a>
            </p>
          </div>
        )}

        {/* Chat Screen */}
        {authenticated && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite">
              {messages.length === 0 && showWelcome && (
                <div className="text-center text-neutral-500 text-sm py-8">
                  <p className="font-medium text-neutral-700 mb-1">Olá! Como posso ajudar?</p>
                  <p className="text-xs">Escolha uma área ou digite sua dúvida.</p>
                  <div className="flex flex-wrap gap-1 justify-center mt-3">
                    {areaChips.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setArea(area)}
                        className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    'max-w-[85%] px-4 py-2 rounded-2xl',
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-neutral-100 text-neutral-800 rounded-bl-none'
                  )}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 text-neutral-800 rounded-2xl rounded-bl-none px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Counter */}
            <div className="px-4 pb-2 text-xs text-neutral-500 text-right">
              Perguntas restantes hoje: <span className="font-medium text-primary-700">{questionsLeft}</span> de 5
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-neutral-50">
              {error && (
                <p className="text-error-600 text-sm mb-2" role="alert">{error}</p>
              )}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite sua pergunta..."
                  className={cn(
                    'flex-1 px-4 py-2 border border-neutral-300 rounded-full text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500',
                    'resize-none min-h-[44px] max-h-32'
                  )}
                  rows={1}
                  disabled={loading}
                  aria-label="Sua pergunta"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className={cn(
                    'px-6 py-2 bg-primary-600 text-white rounded-full text-sm font-medium',
                    'hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                  )}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-1" aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-xs text-neutral-400 text-center mt-2">
                Orientação informativa. Análise completa com advogado:{' '}
                <a href={formatWhatsAppLink('15988033000')} target="_blank" rel="noopener" className="underline text-primary-600">
                  WhatsApp
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

ChatWidget.displayName = 'ChatWidget';