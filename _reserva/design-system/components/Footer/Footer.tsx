// design-system/components/Footer/Footer.tsx
import { cn } from '@design-system/utils/cn';
import { formatWhatsAppLink, formatPhone } from '@design-system/utils/formatters';
import { Scale, MapPin, Mail, Phone as PhoneIcon, MessageSquare, ChevronUp } from 'lucide-react';

export interface FooterProps {
  logo: React.ReactNode;
  companyName: string;
  oab?: string;
  email: string;
  phones: Array<{ label: string; number: string }>;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    mapsUrl?: string;
  };
  socialLinks?: Array<{ label: string; href: string; icon: React.ReactNode }>;
  navigation?: {
    main?: Array<{ label: string; href: string }>;
    legal?: Array<{ label: string; href: string }>;
    areas?: Array<{ label: string; href: string }>;
  };
  variant?: 'desktop' | 'mobile';
  className?: string;
}

const defaultNavigation = {
  main: [
    { label: 'Início', href: '/' },
    { label: 'Áreas de Atuação', href: '/areas' },
    { label: 'Como Atuamos', href: '/como-atuamos' },
    { label: 'Artigos', href: '/artigos' },
    { label: 'Equipe', href: '/equipe' },
    { label: 'Contato', href: '/contato' },
  ],
  legal: [
    { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
    { label: 'Termos de Uso', href: '/termos-de-uso' },
    { label: 'LGPD', href: '/lgpd' },
  ],
  areas: [
    { label: 'Verbas Rescisórias', href: '/areas/verbas-rescisorias' },
    { label: 'Horas Extras', href: '/areas/horas-extras' },
    { label: 'Assédio Moral', href: '/areas/assedio-moral' },
    { label: 'Sem Registro', href: '/areas/sem-registro' },
    { label: 'Justa Causa', href: '/areas/justa-causa' },
    { label: 'Insalubridade', href: '/areas/insalubridade' },
    { label: 'Acidente/Doença', href: '/areas/acidente-doenca' },
    { label: 'Rescisão Indireta', href: '/areas/rescisao-indireta' },
    { label: 'Acordo Coletivo', href: '/areas/acordo-coletivo' },
  ],
};

export function Footer({
  logo,
  companyName,
  oab,
  email,
  phones,
  address,
  socialLinks,
  navigation = defaultNavigation,
  variant = 'desktop',
  className,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const whatsappHref = phones[0] ? formatWhatsAppLink(phones[0].number) : '#';

  if (variant === 'mobile') {
    return (
      <footer className={cn('bg-neutral-50 border-t border-neutral-100', className)}>
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          {/* Logo + Info */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10">{logo}</div>
              <span className="text-lg font-bold text-primary-800">{companyName}</span>
            </div>
            {oab && <p className="text-sm text-neutral-600">{oab}</p>}
          </div>

          {/* CTAs Fixos Mobile */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#1EBE5A] transition-colors"
            >
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
              Falar no WhatsApp
            </a>
            {phones.map((phone, i) => (
              <a
                key={i}
                href={`tel:+55${phone.number.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary-800 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                <PhoneIcon className="w-5 h-5" aria-hidden="true" />
                {phone.label}
              </a>
            ))}
          </div>

          {/* Endereço */}
          {address.mapsUrl && (
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-neutral-600 hover:text-primary-800 hover:bg-neutral-100 transition-colors"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              {address.street}, {address.neighborhood}, {address.city}/{address.state}
            </a>
          )}

          {/* Links rápidos */}
          <details className="mt-6 group">
            <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-neutral-700">
              Links úteis
              <ChevronUp className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <nav className="mt-3 space-y-2">
              {navigation.main?.map((item, i) => (
                <a key={i} href={item.href} className="block text-sm text-neutral-600 hover:text-primary-800">{item.label}</a>
              ))}
            </nav>
          </details>

          {/* Legal */}
          <details className="mt-4">
            <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-neutral-700">
              Legal
              <ChevronUp className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>
            <nav className="mt-3 space-y-2">
              {navigation.legal?.map((item, i) => (
                <a key={i} href={item.href} className="block text-sm text-neutral-600 hover:text-primary-800">{item.label}</a>
              ))}
            </nav>
          </details>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-neutral-200 text-center text-xs text-neutral-500">
            <p>© {currentYear} {companyName}. Todos os direitos reservados.</p>
            <p className="mt-1">Orientação informativa. Análise completa com advogado.</p>
          </div>
        </div>
      </footer>
    );
  }

  // Desktop footer
  return (
    <footer className={cn('bg-neutral-50 border-t border-neutral-100', className)}>
      <div className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12">{logo}</div>
              <span className="text-2xl font-bold text-primary-800">{companyName}</span>
            </div>
            <p className="text-neutral-600 text-sm max-w-xs">
              Advocacia trabalhista especializada na defesa do trabalhador.
              Atendimento humanizado, tecnologia e resultados.
            </p>
            {oab && <p className="text-sm text-neutral-500">{oab}</p>}
            <div className="flex items-center gap-4 pt-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href={`mailto:${email}`} className="text-neutral-400 hover:text-primary-600 transition-colors" aria-label="E-mail">
                <Mail className="w-5 h-5" />
              </a>
              {socialLinks?.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-600 transition-colors" aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navegação Principal */}
          <nav aria-label="Navegação principal">
            <h3 className="font-semibold text-neutral-900 mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navigation.main?.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-sm text-neutral-600 hover:text-primary-800 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Áreas de Atuação */}
          <nav aria-label="Áreas de atuação">
            <h3 className="font-semibold text-neutral-900 mb-4">Áreas de Atuação</h3>
            <ul className="space-y-2">
              {navigation.areas?.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-sm text-neutral-600 hover:text-primary-800 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Contato</h3>
            <address className="not-italic space-y-3 text-sm text-neutral-600">
              {phones.map((phone, i) => (
                <a key={i} href={`tel:+55${phone.number.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-primary-800 transition-colors">
                  <PhoneIcon className="w-4 h-4" aria-hidden="true" />
                  <span>{phone.label}: {formatPhone(phone.number)}</span>
                </a>
              ))}
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary-800 transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>{email}</span>
              </a>
              {address.mapsUrl && (
                <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-800 transition-colors">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>{address.street}, {address.neighborhood}</span>
                </a>
              )}
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>{address.city}/{address.state}</span>
              </span>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500 text-center md:text-left">
              © {currentYear} {companyName}. Todos os direitos reservados.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-4" aria-label="Links legais">
              {navigation.legal?.map((item, i) => (
                <a key={i} href={item.href} className="text-xs text-neutral-500 hover:text-primary-800 transition-colors">{item.label}</a>
              ))}
            </nav>
            <p className="text-xs text-neutral-500 text-center md:text-right">
              Orientação informativa. Análise completa com advogado.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}