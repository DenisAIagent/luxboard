/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@headlessui/react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroicons/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-gold': 'rgb(212 175 55)',
        'white-pearl': 'rgb(248 248 255)',
        'dark-luxury': 'rgb(10 10 10)',
        'gray-elegant': 'rgb(42 42 42)',
        'accent-gold': 'rgb(244 232 193)',
        'luxboard': {
          'noir': 'rgb(0 0 0)',
          'rouge': 'rgb(214 48 49)',
          'or': 'rgb(243 156 18)',
          'gris': 'rgb(44 62 80)',
          'gris-clair': 'rgb(248 249 250)',
          'blanc': 'rgb(255 255 255)',
        },
        primary: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2C3E50',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#D63031',
          foreground: '#FFFFFF',
        },
        background: '#FFFFFF',
        foreground: '#000000',
        accent: {
          DEFAULT: '#F8F9FA',
          foreground: '#2C3E50',
        },
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'scale': 'scale 0.3s ease-in-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'luxe': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'luxe-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'luxe-inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'luxe-gold': '0 4px 20px rgba(243, 156, 18, 0.15)',
      },
      backdropBlur: {
        'luxe': '20px',
      },
      transitionTimingFunction: {
        'luxe': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} 