import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-outfit)'],
      },
      colors: {
        border: '#E2E8F0', // Slate 200
        input: '#F1F5F9', // Slate 100
        ring: '#10B981', // Emerald 500
        background: '#FFFFFF', // White
        foreground: '#0F172A', // Slate 900

        primary: {
          DEFAULT: '#10B981', // Emerald 500
          foreground: '#FFFFFF',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        secondary: {
          DEFAULT: '#F1F5F9', // Slate 100
          foreground: '#0F172A', // Slate 900
        },
        destructive: {
          DEFAULT: '#EF4444', // Red 500
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F8FAFC', // Slate 50
          foreground: '#64748B', // Slate 500
        },
        accent: {
          DEFAULT: '#F1F5F9', // Slate 100
          foreground: '#0F172A', // Slate 900
          blue: '#3B82F6',
          purple: '#8B5CF6',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F172A',
        },
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.02)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px -5px rgba(16, 185, 129, 0.2)', // subtler glow
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(to bottom right, #FFFFFF, #F8FAFC)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
