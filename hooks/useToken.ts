import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/user";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useToken = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { token, setToken } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = async (access: string, refresh: string) => {
    return await fetch("/api/auth/validate-token", {
      method: "POST",
      body: JSON.stringify({ access, refresh }),
    }).then((data) => data.json());
  };

  const redirectToSignIn = () => {
    router.push(`/sign-in?src=${pathname}`);
  };

  const getLocalStorageTokens = () => ({
    access: localStorage.getItem("accessToken"),
    refresh: localStorage.getItem("refreshToken"),
  });

  useEffect(() => {
    const fetchUser = async () => {
      let accessToken = token.access;
      let refreshToken = token.refresh;

      // Get tokens from localStorage if not in state
      if (!accessToken || !refreshToken) {
        const storedTokens = getLocalStorageTokens();
        accessToken = storedTokens.access || "";
        refreshToken = storedTokens.refresh || "";
        setToken({ access: accessToken, refresh: refreshToken });
      }

      // // If no user or tokens, redirect to sign-in
      // if (!accessToken || !refreshToken) {
      //   toast({ title: "Error", variant: "destructive", description: "Please sign in" });
      //   return redirectToSignIn();
      // }

      // // Validate tokens
      // const res = await validateToken(accessToken, refreshToken);
      // if (!res.ok) {
      //   toast({ title: "Error", variant: "destructive", description: res.error });
      //   return redirectToSignIn();
      // }

      setIsLoading(false);
    };

    if (typeof window !== "undefined") fetchUser();
  }, []);

  return { isLoading, token };
};
