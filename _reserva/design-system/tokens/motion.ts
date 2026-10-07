// design-system/tokens/motion.ts — Animações (GSAP-friendly)
export const motionTokens = {
  // Durações
  duration: {
    instant: '0ms',
    fastest: '75ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '700ms',
    enter: '300ms',
    exit: '200ms',
  },
  // Easings (GSAP power approximations)
  easing: {
    linear: 'linear',
    // CSS native
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // GSAP power curves (approximados em CSS)
    'power1-in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    'power1-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'power1-in-out': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
    'power2-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
    'power2-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'power2-in-out': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    'power3-in': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    'power3-out': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
    'power3-in-out': 'cubic-bezier(0.49, 0.05, 0.405, 0.985)',
    'power4-in': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
    'power4-out': 'cubic-bezier(0.005, 1, 0.165, 1)',
    'power4-in-out': 'cubic-bezier(0.875, 0.03, 0.41, 0.995)',
    // Expo
    'expo-in': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
    'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
    'expo-in-out': 'cubic-bezier(1, 0, 0, 1)',
    // Back
    'back-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    'back-in-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    // Elastic (apenas GSAP)
    // Bounce (apenas GSAP)
  },
  // Stagger
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
  // Keyframes reutilizáveis
  keyframes: {
    'fade-in': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    'fade-out': {
      '0%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
    'slide-up': {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
    'slide-down': {
      '0%': { opacity: 0, transform: 'translateY(-20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
    'slide-left': {
      '0%': { opacity: 0, transform: 'translateX(20px)' },
      '100%': { opacity: 1, transform: 'translateX(0)' },
    },
    'slide-right': {
      '0%': { opacity: 0, transform: 'translateX(-20px)' },
      '100%': { opacity: 1, transform: 'translateX(0)' },
    },
    'scale-in': {
      '0%': { opacity: 0, transform: 'scale(0.95)' },
      '100%': { opacity: 1, transform: 'scale(1)' },
    },
    'scale-out': {
      '0%': { opacity: 1, transform: 'scale(1)' },
      '100%': { opacity: 0, transform: 'scale(0.95)' },
    },
    'text-reveal': {
      '0%': { transform: 'translateY(100%)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
    'rotate-in': {
      '0%': { opacity: 0, transform: 'rotate(-5deg) scale(0.95)' },
      '100%': { opacity: 1, transform: 'rotate(0) scale(1)' },
    },
  },
} as const;

export type MotionTokens = typeof motionTokens;

// Presets GSAP para uso direto
export const gsapPresets = {
  // Entrada de seção
  sectionEnter: {
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1,
  },
  // Entrada de card/item
  cardEnter: {
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.08,
  },
  // Texto reveal
  textReveal: {
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.05,
  },
  // Botão hover
  buttonHover: {
    duration: 0.2,
    ease: 'power2.out',
  },
  // Modal
  modalEnter: {
    duration: 0.3,
    ease: 'power3.out',
  },
  modalExit: {
    duration: 0.2,
    ease: 'power2.in',
  },
} as const;