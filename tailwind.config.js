module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Your app's source files
    './node_modules/flowbite/**/*.js' // Add Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Add Flowbite as a plugin
  ],
}
