/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary brand: Cinematic Cyan/Teal (Cinmapro identity)
        brand: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        // Warm cinematic dark surfaces (slight blue undertone)
        surface: {
          0: '#04070a',
          1: '#070b10',
          2: '#0c1218',
          3: '#121a23',
          4: '#1a2330',
          5: '#243042',
          6: '#324259',
        },
        // Cinematic accents — Amber/Gold (cinema-poster vibe)
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // Accent — Coral/Sunset for CTAs
        accent: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        neon: {
          cyan: '#22d3ee',
          teal: '#14b8a6',
          amber: '#fbbf24',
          coral: '#fb7185',
        },
      },
      boxShadow: {
        card: '0 10px 32px -10px rgba(0,0,0,.7)',
        'card-hover': '0 28px 64px -12px rgba(0,0,0,.85), 0 0 0 1px rgba(34,211,238,.22)',
        glow: '0 0 0 1px rgba(6,182,212,.35), 0 10px 40px -8px rgba(6,182,212,.45)',
        'glow-lg': '0 0 0 2px rgba(6,182,212,.45), 0 18px 64px -8px rgba(6,182,212,.55)',
        'glow-cyan': '0 0 30px -5px rgba(34,211,238,.65)',
        'glow-amber': '0 0 30px -5px rgba(251,191,36,.55)',
        'glow-coral': '0 0 30px -5px rgba(251,113,133,.55)',
        glass: '0 8px 32px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.06)',
        'inset-glow': 'inset 0 0 30px rgba(6,182,212,.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)",
        'radial-cyan': 'radial-gradient(circle at 50% 0%, rgba(6,182,212,.20), transparent 60%)',
        'aurora': 'radial-gradient(at 20% 0%, rgba(6,182,212,0.28) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(251,191,36,0.16) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(20,184,166,0.18) 0px, transparent 50%)',
        'cinema-stripes': 'repeating-linear-gradient(45deg, rgba(251,191,36,0.04) 0 2px, transparent 2px 14px)',
      },
      animation: {
        'fade-in': 'fadeIn .5s ease-out both',
        'slide-up': 'slideUp .6s cubic-bezier(0.16,1,0.3,1) both',
        'slide-down': 'slideDown .35s ease-out both',
        'scale-in': 'scaleIn .4s cubic-bezier(0.34,1.56,0.64,1) both',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        'hero-slide': 'heroSlide 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'tilt': 'tilt 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.94)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(6,182,212,.35)', transform: 'scale(1)' },
          '50%': { boxShadow: '0 0 40px rgba(6,182,212,.65)', transform: 'scale(1.02)' },
        },
        heroSlide: {
          '0%': { opacity: 0, transform: 'scale(1.06) translateY(8px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
};
