import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

interface Todo {
  id: number;
  level: number;
  task: string;
  completed: boolean;
}

type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
type FormEvent = React.FormEvent<HTMLFormElement>;
type AddTodo = (task: string, level: number) => void;
type ToggleTodo = (id: number) => void;
type RemoveTodo = (id: number) => void;

const Home: NextPage = () => {
  // todo list boilerplate
  const todoList = [
    {
      id: 1,
      level: 1,
      task: "Learn Next.js",
      completed: false,
    },
    {
      id: 2,
      level: 3,
      task: "Learn Tailwind CSS",
      completed: false,
    },
    {
      id: 3,
      level: 2,
      task: "Learn TypeScript",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState<Todo[]>(todoList);

  const addTodo: AddTodo = (task, level) => {
    const newTodo = {
      id: todos.length + 1,
      level: level,
      task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo: ToggleTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const removeTodo: RemoveTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleSubmit: SubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const task = e.target.task.value;
    const level = e.target.level.value;
    addTodo(task, level);
  };

  return (
    <>
      <Head>
        <title>Defcon.DO</title>
        <meta
          name="description"
          content="Defcon.DO, fucking do it before it's too late."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-red-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Defcon.<span className="text-red-600">DO</span>
          </h1>
          <h2 className="text-2xl text-neutral-400">
            The daily todo app to fucking do it before it&apos;s too late.
          </h2>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-center text-3xl font-bold text-white sm:text-2xl">
                Add a task
              </h3>
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  type="text"
                  name="task"
                  id="task"
                  placeholder="Task"
                  className="rounded-md bg-neutral-100 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                />
                <select
                  name="level"
                  id="level"
                  className="rounded-md bg-neutral-100 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                >
                  <option value="1">Defcon 1</option>
                  <option value="2">Defcon 2</option>
                  <option value="3">Defcon 3</option>
                  <option value="4">Defcon 4</option>
                  <option value="5">Defcon 5</option>
                </select>
                <button className="rounded-md bg-red-600 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                  Add
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-center text-3xl font-bold text-white sm:text-2xl">
                Todo List
              </h3>
              <ul className="flex flex-col gap-4">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <button
                      className="rounded-md bg-red-600 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                      onClick={() => removeTodo(todo.id)}
                    >
                      Remove
                    </button>
                    <div>{todo.task}</div>
                    <div>{todo.level}</div>
                    <button
                      className="rounded-md bg-red-600 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.completed ? "Completed" : "Incomplete"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;