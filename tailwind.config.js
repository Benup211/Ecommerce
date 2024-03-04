module.exports = {
  content: ["./src/**/*.{html,jsx,tsx,js,ts,css,scss,svelte,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {themes:["cyberpunk","luxury","synthwave","retro","dracula","nord","emerald"]}
}