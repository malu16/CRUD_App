import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers, addUser, updateUser, deleteUser } from '../api/userApi';

interface UserContextProps {
  users: User[];
  loading: boolean;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  loadMore: () => void;
  page: number;
  PAGE_SIZE: number;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('UserContext must be used within a UserProvider');
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddUser = async (user: Omit<User, 'id'>) => {
    const newUser = await addUser(user);
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleUpdateUser = async (user: User) => {
    const updated = await updateUser(user);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        addUser: handleAddUser,
        updateUser: handleUpdateUser,
        deleteUser: handleDeleteUser,
        loadMore,
        page,
        PAGE_SIZE,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };