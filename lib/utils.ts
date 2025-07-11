import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getData(url: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log("error -", "failed to fetch data");
      return [];
    }

    const data = await res.json();
    if (!data.ok) {
      console.log("error -", data.error);
      return [];
    }

    return data.data;
  } catch (error) {
    console.log("error -", error);
    return [];
  }
}

// default 5 mins
export async function fetchISR(url: string, revalidate = 300) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      next: { revalidate },
    });
    if (!res.ok) {
      console.log("error -", "failed to fetch data");
      return [];
    }

    const data = await res.json();
    if (!data.ok) {
      console.log("error -", data.error);
      return [];
    }

    return data.data;
  } catch (error) {
    console.log("error -", error);
    return [];
  }
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
  const prefix = process.env.NEXT_PUBLIC_ORDER_PREFIX;
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const id = nanoid(6).toUpperCase();
  return `${prefix}-${date}-${id}`;
}

export const getDiscount = (mrp: number, price: number) => {
  return (((mrp - price) / mrp) * 100).toFixed(2);
};

export function boldNumbersInString(str: string) {
  return str.replace(/\d+/g, (match) => `<b>${match}</b>`);
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export const devLog = (...args: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

// export const formatPaymentLabel = (status: string) => {
//   const paymentLabels: Record<string, string> = {
//     ONLINE: "Online",
//     CASH_ON_DELIVERY: "Cash on Delivery",
//   };

//   return paymentLabels[status] || null;
// };
