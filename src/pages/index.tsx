import { type NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { BiCheckbox, BiCheckboxChecked, BiCheckboxMinus } from "react-icons/bi";
interface Todo {
  id: number;
  level: number;
  task: string;
  completed: boolean;
}

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (task: string, level: number) => {
    const newTodo = {
      // random id
      id: Math.floor(Math.random() * 100000000),
      level,
      task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
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

  const removeTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = (e.currentTarget.task as HTMLInputElement).value.toString();
    const level = parseInt((e.currentTarget.level as HTMLInputElement).value);
    addTodo(task, level);
  };

  const levelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-neutral-100";
      case 2:
        return "bg-red-700";
      case 3:
        return "bg-yellow-600";
      case 4:
        return "bg-lime-800";
      case 5:
        return "bg-blue-800";
      default:
        return "bg-neutral-100";
    }
  };

  const LevelBox = (level: number, children: React.ReactFragment) => {
    return (
      <div
        className={`h-10 w-10 rounded-full bg-opacity-75 ${levelColor(level)}`}
      >
        {children}
      </div>
    );
  };

  const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
    const { id, level, task, completed } = todo;
    return (
      <li className="flex place-items-center space-x-1 rounded bg-neutral-100/50 p-2 shadow-md">
        <BiCheckboxMinus
          className="w-1/6 cursor-pointer text-4xl text-red-700/75"
          onClick={() => removeTodo(id)}
        />
        <div className="w-4/6">{task}</div>
        {completed ? (
          <BiCheckboxChecked
            className="w-1/6 cursor-pointer text-4xl text-green-600/75"
            onClick={() => toggleTodo(id)}
          />
        ) : (
          <BiCheckbox
            className="w-1/6 cursor-pointer text-4xl text-neutral-600/75"
            onClick={() => toggleTodo(id)}
          />
        )}
      </li>
    );
  };

  // regroup todos by level
  const todosByLevel = todos.reduce((acc, todo) => {
    if (!acc[todo.level]) {
      acc[todo.level] = [];
    }
    acc[todo.level] = acc[todo.level] || [];
    return acc;
  }, {} as Record<number, Todo[]>);

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
      <main className="justify-starr flex min-h-screen flex-col items-center bg-gradient-to-b from-neutral-900 to-red-900">
        <div className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 ">
          <div className="flex w-full max-w-lg flex-col place-items-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-neutral-100 sm:text-[5rem]">
              Defcon.<span className="text-red-700">DO</span>
            </h1>
            <h2 className="text-xl text-neutral-400">
              The daily todo app to fucking do it before it&apos;s too late.
            </h2>
          </div>
          <div className="flex w-full max-w-lg flex-col gap-4">
            <h3 className="border-0 border-b-2 border-neutral-100 pb-2 text-left text-3xl font-bold uppercase text-neutral-100 sm:text-2xl">
              <span className="text-red-700">Add</span> a task.
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
                className="rounded bg-neutral-100 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
              />
              <select
                name="level"
                id="level"
                className="rounded bg-neutral-100 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
              >
                <option value="1">Defcon 1</option>
                <option value="2">Defcon 2</option>
                <option value="3">Defcon 3</option>
                <option value="4">Defcon 4</option>
                <option value="5">Defcon 5</option>
              </select>
              <button className="rounded bg-red-700 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">
                Add
              </button>
            </form>
          </div>
          <div className="flex w-full max-w-lg flex-col gap-4">
            <h3 className="border-0 border-b-2 border-neutral-100 pb-2 text-left text-3xl font-bold uppercase text-neutral-100 sm:text-2xl">
              <span className="text-red-700">Do</span> it.
            </h3>
            <ul className="flex flex-col gap-4">
              {todos.length === 0 ? (
                <p className="text-center text-neutral-400">
                  C&apos;mon do something.
                </p>
              ) : (
                Object.keys(todosByLevel)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map((level) => (
                    <div
                      key={level}
                      className={`flex space-x-4 rounded p-4 ${levelColor(
                        parseInt(level)
                      )}`}
                    >
                      <h4 className="flex w-1/5 place-items-center text-9xl font-bold text-neutral-900/20">
                        {level}
                      </h4>
                      <ul className="flex w-full flex-col justify-center gap-4">
                        {(todosByLevel[parseInt(level)] as Todo[]).map(
                          (todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                          )
                        )}
                      </ul>
                    </div>
                  ))
              )}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
