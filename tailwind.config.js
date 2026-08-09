/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'on-background': 'var(--color-on-background)',

        // ── Monolithic Precision Surface Tokens ──
        surface: {
          DEFAULT: 'var(--color-surface)',
          dim: 'var(--color-surface-dim)',
          'container-lowest': 'var(--color-surface-container-lowest)',
          'container-low': 'var(--color-surface-container-low)',
          container: 'var(--color-surface-container)',
          'container-high': 'var(--color-surface-container-high)',
          'container-highest': 'var(--color-surface-container-highest)',
          variant: 'var(--color-surface-variant)',
        },
        'on-surface': {
          DEFAULT: 'var(--color-on-surface)',
          variant: 'var(--color-on-surface-variant)',
        },
        
        outline: {
          DEFAULT: 'var(--color-outline)',
          variant: 'var(--color-outline-variant)',
        },

        // ── Primary ──
        primary: {
          DEFAULT: 'var(--color-primary)',
          container: 'var(--color-primary-container)',
          brand: 'var(--color-primary-brand)', 
          
          // Legacy mappings for backward compatibility
          300: 'var(--color-primary)',
          400: 'var(--color-primary)', 
          500: 'var(--color-primary-container)', 
          600: 'var(--color-primary)', 
          800: 'var(--color-primary-container)', 
          950: 'var(--color-on-primary)', 
        },
        // Top-level alias so @apply bg-primary-brand works
        'primary-brand': 'var(--color-primary-brand)',
        'on-primary': {
          DEFAULT: 'var(--color-on-primary)',
          container: 'var(--color-on-primary-container)',
        },

        // ── Text Overrides (Surgical Minimalism) ──
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          disabled: 'var(--color-text-disabled)',
        },
        
        // Semantic Aliases
        'surface-border': 'var(--color-surface-border)',
        'surface-low': 'var(--color-surface-low)',
        'surface-card': 'var(--color-surface-card)',
        'surface-high': 'var(--color-surface-high)',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.03em', fontWeight: '600' }],
        'headline-lg-mobile': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '500' }],
        'body-lg': ['16px', { lineHeight: '1.6', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' }],
        'label-mono': ['12px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem', // 4px Standard Structural Radius
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '0.75rem', 
        '3xl': '1rem',
        full: '9999px',
      },
      spacing: {
        unit: '4px',
        gutter: '24px',
        'margin-mobile': '16px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
      },
      boxShadow: {
        'level-2': 'var(--shadow-level-2)',
        'ai-glow': 'var(--shadow-ai-glow)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
        'slideInRight': 'slideInRight 0.3s ease-out forwards',
        'slideUp': 'slideUp 0.3s ease-out forwards',
        'scaleIn': 'scaleIn 0.2s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
