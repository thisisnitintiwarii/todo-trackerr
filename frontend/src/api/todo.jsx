import axios from "axios";
import { API_BASE_URL } from "../main";

export const fetchTodos = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/user/`, {
    withCredentials: true,
  });
  return res.data.todos;
};

export const addTodo = async (data) => {
  return axios.post(
    `${API_BASE_URL}/api/user/addTodo`,
    data,
    { withCredentials: true }
  );
};

export const updateTodo = async (id) => {
  return axios.patch(
    `${API_BASE_URL}/api/user/updateTodo/${id}`,
    {},
    { withCredentials: true }
  );
};

export const deleteTodo = async (id) => {
  return axios.post(
    `${API_BASE_URL}/api/user/deleteTodo/${id}`,
    {},
    { withCredentials: true }
  );
};
