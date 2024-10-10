import { useUserStore } from "@/stores/user";
import { useEffect, useState } from "react";

export const useUser = () => {
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  const getLocalStorageUser = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const localUser = getLocalStorageUser();
        if (localUser) setUser(localUser);
      }

      setIsLoading(false);
    };

    if (typeof window !== "undefined") fetchUser();
  }, [user]);

  return { user, isLoading };
};
