import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../main";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContest";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [work, setwork] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  useEffect(() => {
    const extractTodo = async () => {
      try {
        const respond = await axios.get(`${API_BASE_URL}/api/user/`, {
          withCredentials: true,
        });
        setTodos(respond?.data?.todos || []);
        setCompleted(respond?.data?.completed || []);
      } catch (error) {
        console.log(error);
      }
    };
    extractTodo();
  }, []);

  const handleAddTodo = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/user/addTodo`,
        { title, work, status: "p" },
        { withCredentials: true }
      );
      setShowModal(false);
      setTitle("");
      setwork("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTodo = async (todoId) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/user/updateTodo/${todoId}`,
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/user/deleteTodo/${todoId}`,
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      setIsAuth(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black px-6 py-6 text-white">
      {/* HEADER */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide text-orange-500">
          Todo Tracker
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-black hover:bg-orange-600"
          >
            + Add Todo
          </button>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-orange-500 px-4 py-2 text-orange-400 hover:bg-orange-500 hover:text-black"
          >
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="grid h-[calc(100vh-96px)] gap-8 md:grid-cols-2">
        {/* TODOS */}
        <section className="flex min-h-0 flex-col rounded-2xl bg-zinc-900/80 p-5 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-orange-400">
            📝 Todos
          </h2>

          <div className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-2">
            {todos.map(
              (todo) =>
                todo.status === "p" && (
                  <div
                    key={todo._id}
                    onClick={() => setSelectedTodo(todo)}
                    className="group flex cursor-pointer gap-4 rounded-xl bg-zinc-800 p-4 hover:bg-zinc-700"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{todo.title}</h3>
                      <p className="text-sm text-gray-400">{todo.work}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateTodo(todo._id);
                        }}
                        className="rounded-md bg-green-600 px-2 py-1 text-xs"
                      >
                        ✓
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTodo(todo._id);
                        }}
                        className="rounded-md bg-red-600 px-2 py-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </section>

        {/* COMPLETED */}
        <section className="flex min-h-0 flex-col rounded-2xl bg-zinc-900/80 p-5 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-green-400">
            ✅ Completed
          </h2>

          <div className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-2">
            {todos.map(
              (todo) =>
                todo.status === "c" && (
                  <div
                    key={todo._id}
                    onClick={() => setSelectedTodo(todo)}
                    className="flex cursor-pointer gap-4 rounded-xl bg-zinc-800/70 p-4 opacity-80"
                  >
                    <div className="flex-1">
                      <h3 className="line-through">{todo.title}</h3>
                      <p className="text-sm text-gray-500">{todo.work}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTodo(todo._id);
                      }}
                      className="rounded-md bg-red-600 px-2 py-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )
            )}
          </div>
        </section>
      </div>

      {/* ADD TODO MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-bold text-orange-500">
              Add New Todo
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="mb-3 w-full rounded bg-zinc-800 p-3"
            />

            <textarea
              value={work}
              onChange={(e) => setwork(e.target.value)}
              placeholder="Description"
              rows="4"
              className="mb-5 w-full rounded bg-zinc-800 p-3"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTodo}
                className="rounded bg-orange-500 px-5 py-2 text-black"
              >
                Add Todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* READ-ONLY TODO MODAL */}
      {selectedTodo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-bold text-orange-500">
              Todo Details
            </h2>

            <input
              value={selectedTodo.title}
              readOnly
              className="mb-3 w-full rounded bg-zinc-800 p-3 opacity-80"
            />

            <textarea
              value={selectedTodo.work}
              readOnly
              rows="5"
              className="mb-5 w-full rounded bg-zinc-800 p-3 opacity-80"
            />

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedTodo(null)}
                className="rounded bg-orange-500 px-5 py-2 text-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
