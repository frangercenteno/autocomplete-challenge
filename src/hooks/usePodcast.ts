import { useMemo } from "react";
import useGetAllUsers from "./useGetAllUsers";
import { TUserNormalized } from "../types";

const usePodcast = (search: string | null) => {
  const { users, error } = useGetAllUsers();

  const normalizeData: TUserNormalized[] = users?.map((data) => ({
    id: data.id,
    name: data.name,
    email: data.email,
  }));

  const usersList = useMemo(() => {
    if (search) {
      return normalizeData.filter(
        ({ name, email }) =>
          name.toLowerCase().includes(search.toLowerCase()) ||
          email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return normalizeData;
  }, [normalizeData, search]);

  return { users: usersList || users, error };
};

export default usePodcast;
