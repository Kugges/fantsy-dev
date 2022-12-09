/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'shade': {
        '50': '#f7f7f7',
        '100': '#e3e3e3',
        '200': '#c8c8c8',
        '300': '#a4a4a4',
        '400': '#818181',
        '500': '#666666',
        '600': '#515151',
        '700': '#434343',
        '800': '#383838',
        '900': '#000000',
      },
      'fantsy-green': {
        '50': '#fafcf4',
        '100': '#f4f9e9',
        '200': '#e5f0c7',
        '300': '#d5e6a5',
        '400': '#b5d462',
        '500': '#95c11f',
        '600': '#86ae1c',
        '700': '#709117',
        '800': '#597413',
        '900': '#495f0f'
      }, 'fantsy-blue': {
        '50': '#f5fbfe',
        '100': '#ebf6fc',
        '200': '#cdeaf8',
        '300': '#afddf3',
        '400': '#72c3ea',
        '500': '#36a9e1',
        '600': '#3198cb',
        '700': '#297fa9',
        '800': '#206587',
        '900': '#1a536e'
      }, 'fantsy-orange': {
        'shade': '#E54E22',
        'tint': '#FF955C',
        '50': '#fefaf2',
        '100': '#fef4e6',
        '200': '#fce4bf',
        '300': '#fad399',
        '400': '#f7b34d',
        '500': '#f39200',
        '600': '#db8300',
        '700': '#b66e00',
        '800': '#925800',
        '900': '#774800'
      },
      // ...
    },
    extend: {
      fontFamily: {
        'soleto': ["Soleto", 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif'],
        'soleto-bold': ["Soleto-Medium", 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif'],
        'lofty-goals': ["Lofty Goals Regular", 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif'],
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide", "flowbite/plugin")
  ],
}
