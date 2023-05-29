import { useEffect, useState } from "react";
import { IUser } from "../types";
import { ENV } from "../constants";

const useGetAllUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(ENV.BASE_PATH);
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error(error);
        setError(error as string);
      }
    };
    fetchUsers();
  }, []);

  return { users, error };
};

export default useGetAllUsers;
