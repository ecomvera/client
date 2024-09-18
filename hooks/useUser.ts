import { useUserStore } from "@/stores/user";
import { useEffect, useState } from "react";

export const useUser = () => {
  const { user, setUser, token, setToken } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const localUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (localUser) setUser(JSON.parse(localUser));
        if (accessToken && refreshToken) {
          setToken({ access: accessToken, refresh: refreshToken });
        }
      }
      setIsLoading(false);
    };

    if (typeof window !== "undefined") fetchUser();
  }, [user]);

  return { user, isLoading, token };
};
