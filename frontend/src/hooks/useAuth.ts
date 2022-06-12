import { useEffect } from "react";
import { nanoid } from "nanoid";

export const useAuth = (options: { autoGenerate?: boolean } = {}) => {
  const { autoGenerate = false } = options;

  useEffect(() => {
    if (autoGenerate) {
      const user = getUser();
      setUser(user);
    }
  }, [autoGenerate]);

  const getUser = () => {
    const userString: string | null = localStorage.getItem("user");
    if (userString) {
      return JSON.parse(userString);
    } else {
      return { id: nanoid(), name: `user-${nanoid(3)}` };
    }
  };

  const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const setName = (name: string) => {
    const user = getUser();
    user.name = name;
    localStorage.setItem("name", name);
  };

  return { user: getUser(), setName };
};
