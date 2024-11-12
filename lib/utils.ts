import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
// export const postFetcher = (url: string, method = "POST", body = {}) => {
//   console.log(url);
//   return fetch(url, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   }).then((res) => res.json());
// };
export const fetchOpt = {
  revalidateOnFocus: false,
  dedupingInterval: 60000,
  revalidateOnMount: false,
};
export const noCache = {
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 0,
};

export function generateOrderNumber() {
  return crypto.randomUUID().replace(/-/g, "");
}

export const getDiscount = (mrp: number, price: number) => {
  return ((mrp - price / mrp) / 100).toFixed(2);
};

export function boldNumbersInString(str: string) {
  return str.replace(/\d+/g, (match) => `<b>${match}</b>`);
}
