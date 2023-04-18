/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  daisyui: {
    darkTheme: 'light',
  },
  important: true,
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'new-white': '#fffafa',
        'new-black': '#343434',
        'new-purple': 'hsl(243, 90%, 64%)'
      },
      height: {
				inherit: 'inherit',
			},
			width: {
				inherit: 'inherit',
			},
    },
  },
  plugins: [require("daisyui")],
}

