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
