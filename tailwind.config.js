import { Config } from "tailwindcss";

const config = {
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
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: 'var(--card)',
  			'card-foreground': 'var(--card-foreground)',
  			muted: 'var(--muted)',
  			'muted-foreground': 'var(--muted-foreground)',
  			border: 'var(--border)',
  			primary: 'var(--primary)',
  			'primary-dark': 'var(--primary-dark)',
  			secondary: 'var(--secondary)',
  			accent: 'var(--accent)'
  		},
  		fontFamily: {
  			sans: [
  				'Inconsolata',
  				'monospace'
  			],
  			heading: [
  				'Quicksand',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: 'class',
};

export default config;
