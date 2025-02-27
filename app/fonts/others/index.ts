import localFont from "next/font/local";

const logo = localFont({
  src: "./Stone_Crusher.ttf",
  variable: "--font-logo",
  weight: "100 900",
});

const Fonts = {
  logoFont: logo.variable,
};

export default Fonts;
