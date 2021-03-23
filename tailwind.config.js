module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
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