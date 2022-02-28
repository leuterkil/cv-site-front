module.exports = {
  darkMode: 'class',
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {},
    fontFamily:{'sans': ['Montserrat', 'Arial', 'sans-serif'],},
  },
  plugins: [require("daisyui")],
}
