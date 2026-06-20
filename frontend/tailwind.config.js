/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        background: {
          DEFAULT: '#0F172A',
          secondary: '#111E36',
        },
        foreground: '#F8FAFC',
        card: {
          DEFAULT: '#1E293B',
          elevated: '#334155',
        },
        primary: {
          DEFAULT: '#38BDF8',
          foreground: '#0F172A',
        },
        accent: {
          DEFAULT: '#22C55E',
          orange: '#F97316',
          purple: '#A78BFA',
        },
        // 'text' como familia de color -> habilita text-text-secondary / text-text-muted
        text: {
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        'muted-foreground': '#94A3B8',
        border: '#334155',
        ring: '#38BDF8',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
    },
  },
  plugins: [],
}
