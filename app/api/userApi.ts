import axios from 'axios';
import { User } from '../types/User';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post(BASE_URL, user);
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put(`${BASE_URL}/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
