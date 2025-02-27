import localFont from "next/font/local";

const montserratThin = localFont({
  src: "./Montserrat-Thin.ttf",
  variable: "--font-thin",
  weight: "100 900",
});

const montserratExtraLight = localFont({
  src: "./Montserrat-ExtraLight.ttf",
  variable: "--font-extralight",
  weight: "100 900",
});

const montserratLight = localFont({
  src: "./Montserrat-Light.ttf",
  variable: "--font-light",
  weight: "100 900",
});

const montserratRegular = localFont({
  src: "./Montserrat-Regular.ttf",
  variable: "--font-regular",
  weight: "100 900",
});

const montserratMedium = localFont({
  src: "./Montserrat-Medium.ttf",
  variable: "--font-medium",
  weight: "100 900",
});

const montserratSemiBold = localFont({
  src: "./Montserrat-SemiBold.ttf",
  variable: "--font-semibold",
  weight: "100 900",
});

const montserratBold = localFont({
  src: "./Montserrat-Bold.ttf",
  variable: "--font-bold",
  weight: "100 900",
});

const montserratExtraBold = localFont({
  src: "./Montserrat-ExtraBold.ttf",
  variable: "--font-extrabold",
  weight: "100 900",
});

const montserratBlack = localFont({
  src: "./Montserrat-Black.ttf",
  variable: "--font-black",
  weight: "100 900",
});

export const Fonts = {
  Thin: montserratThin.variable,
  ExtraLight: montserratExtraLight.variable,
  Light: montserratLight.variable,
  Regular: montserratRegular.variable,
  Medium: montserratMedium.variable,
  SemiBold: montserratSemiBold.variable,
  Bold: montserratBold.variable,
  ExtraBold: montserratExtraBold.variable,
  Black: montserratBlack.variable,
};

export default Fonts;
