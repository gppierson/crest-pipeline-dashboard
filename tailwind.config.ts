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
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'rgba(255, 255, 255, 0.05)',
        ring: 'rgba(52, 211, 153, 0.4)',
        background: '#030712', // Rich Black
        foreground: '#F9FAFB', // Gray 50

        primary: {
          DEFAULT: '#34D399', // Emerald 400
          foreground: '#022C22', // Emerald 950
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669', // Emerald 600
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        secondary: {
          DEFAULT: '#6366F1', // Indigo 500
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#EF4444', // Red 500
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#1F2937', // Gray 800
          foreground: '#9CA3AF', // Gray 400
        },
        accent: {
          DEFAULT: '#1F2937', // Gray 800
          foreground: '#F9FAFB', // Gray 50
          blue: '#60A5FA',
          purple: '#A78BFA',
          amber: '#FBBF24',
          rose: '#FB7185',
        },
        card: {
          DEFAULT: 'rgba(17, 24, 39, 0.6)', // Translucent Gray 900
          foreground: '#F9FAFB',
        },
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(52, 211, 153, 0.3)',
        'glow-blue': '0 0 20px -5px rgba(96, 165, 250, 0.3)',
        'glow-purple': '0 0 20px -5px rgba(167, 139, 250, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to bottom right, #030712, #111827)',
        'gradient-card': 'linear-gradient(180deg, rgba(31, 41, 55, 0.6) 0%, rgba(17, 24, 39, 0.6) 100%)',
        'shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.05) 50%, transparent 75%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
