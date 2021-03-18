module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'white-gray': '#f7f7f7',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}