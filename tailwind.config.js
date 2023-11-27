/** @type {import('tailwindcss').Config} */

export default {
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
      map[index] = `${index}px`;
      return map;
    }, {}),
    extend: {
      fontSize: ({ theme }) => ({
        ...theme('spacing'),
      }),
      borderRadius: ({ theme }) => ({
        ...theme('spacing'),
      }),
      minWidth: ({ theme }) => ({
        ...theme('spacing'),
      }),
      maxWidth: ({ theme }) => ({
        ...theme('spacing'),
      }),
      minHeight: ({ theme }) => ({
        ...theme('spacing'),
      }),
      maxHeight: ({ theme }) => ({
        ...theme('spacing'),
      }),
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  content: ['./src/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
};
