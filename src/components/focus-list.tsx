"use client";

import { FC, useEffect, useState } from "react";
import { todoType } from "@/types/todo-type";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "@/actions/todo-actions";
import { getRandomQuote } from "@/actions/quote-actions";
import Focus from "./focus";
import AddFocus from "./add-focus";
import AddDailyGoal from "./add-daily-goal";

interface Props {
  todos: todoType[];
}

const FocusList: FC<Props> = ({ todos }) => {
  const [randomQuote, setRandomQuote] = useState<string>("");
  const [isLoadingQuote, setIsLoadingQuote] = useState<boolean>(false);
  const [showTodoList, setShowTodoList] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoadingQuote(true);

      try {
        const quotes = await getRandomQuote();

        if (Array.isArray(quotes) && quotes.length > 0) {
          setRandomQuote(quotes[0].quote);
        } else {
          setRandomQuote("No quotes found");
        }
      } catch (error) {
        console.error("Error fetching quote:", error);

        setRandomQuote("Error fetching quote");
      } finally {
        setIsLoadingQuote(false);
      }
    };

    fetchQuote();
  }, []);

  const [todoItems, setTodoItems] = useState<todoType[]>(todos);

  const createFocus = (text: string) => {
    const id = (todoItems.at(-1)?.id ?? 0) + 1;
    addTodo(id, text);
    setTodoItems((prev) => [...prev, { id: id, goal: text, done: false }]);
  };

  const changeTodoText = (id: number, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );

    editTodo(id, text);
  };

  const toggleIsTodoDone = (id: number) => {
    setTodoItems((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );

    toggleTodo(id);
  };

  const deleteTodoItem = (id: number) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  return (
    <div className="relative h-screen w-full">
      <main className="mx-auto max-w-4xl w-full flex flex-col justify-around">
        <section className="flex w-full flex-col items-center p-16">
          <AddDailyGoal />
        </section>

        {/* Random Quote */}
        <section className="mx-auto max-w-2xl mt-4">
          {isLoadingQuote ? (
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-transparent border-t-cyan-400" />
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-transparent border-t-cyan-400 opacity-50 blur" />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-xl font-medium text-white">
                &quot;{randomQuote}&quot;
              </span>
            </div>
          )}
        </section>
      </main>

      <div className="absolute right-4 mt-16 bottom-20 mb-12">
        {showTodoList &&
          todoItems.map((todo) => (
            <Focus
              key={todo.id}
              todo={todo}
              changeTodoText={changeTodoText}
              toggleIsTodoDone={toggleIsTodoDone}
              deleteTodoItem={deleteTodoItem}
            />
          ))}

        <div
          onClick={() => {
            setShowTodoList(true);
          }}
        >
          <AddFocus createFocus={createFocus} />
        </div>
      </div>
    </div>
  );
};

export default FocusList;
