
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom game colors
				dbz: {
					orange: '#FF6B00',
					blue: '#0090FF',
					yellow: '#FFD700',
					red: '#FF3A30',
					green: '#34C759',
					purple: '#AF52DE',
					black: '#1C1C1E',
					darkblue: '#044389',
					lightblue: '#5BC0EB',
					lightgray: '#F2F2F7',
					darkgray: '#3A3A3C'
				},
				energy: {
					ki: '#FFD700',
					health: '#34C759'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			textShadow: {
				sm: '1px 1px 2px rgba(0, 0, 0, 0.1)',
				DEFAULT: '2px 2px 0px rgba(0, 0, 0, 0.2)',
				lg: '3px 3px 0px rgba(0, 0, 0, 0.2)',
				xl: '4px 4px 0px rgba(0, 0, 0, 0.2)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1', boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)' },
					'50%': { opacity: '0.8', boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'attack-shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
				},
				'opponent-flash': {
					'0%, 50%, 100%': { opacity: '1' },
					'25%, 75%': { opacity: '0.5' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'slide-out': 'slide-out 0.4s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'attack-shake': 'attack-shake 0.5s ease-in-out',
				'opponent-flash': 'opponent-flash 0.5s ease-in-out'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'energy-pattern': 'linear-gradient(to right, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.5), rgba(255, 215, 0, 0.2))'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		// Add text shadow plugin
		function({ addUtilities, theme, variants }) {
			const textShadows = theme('textShadow', {});
			const textShadowUtilities = Object.entries(textShadows).reduce(
				(utilities, [key, value]) => ({
					...utilities,
					[`.text-shadow${key === 'DEFAULT' ? '' : `-${key}`}`]: {
						'text-shadow': value,
					},
				}),
				{}
			);
			addUtilities(textShadowUtilities, variants('textShadow'));
		}
	],
} satisfies Config;
