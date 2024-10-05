"use client";
import { todoType } from "@/types/todo-type";
import { ChangeEvent, FC, useState } from "react";

interface Props {
    todo: todoType;
    changeTodoText: (id: number, text: string) => void;
    toggleIsTodoDone: (id: number, done: boolean) => void;
    deleteTodoItem: (id: number) => void;
}

const Focus: FC<Props> = ({
    todo,
    changeTodoText,
    toggleIsTodoDone,
    deleteTodoItem,
}) => {
    const [editing, setEditing] = useState(false);

    const [text, setText] = useState(todo.goal);

    const [isDone, setIsDone] = useState(todo.done);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleIsDone = async () => {
        toggleIsTodoDone(todo.id, !isDone);
        setIsDone((prev) => !prev);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        changeTodoText(todo.id, text);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
        setText(todo.goal);
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this todo?")) {
        deleteTodoItem(todo.id);
        }
    };

  return (
    <div className="flex items-center gap-2 p-4 border-gray-200 border-solid border rounded-lg">
        <input
            type="checkbox"
            className="text-blue-200 rounded-sm h-4 w-4"
            checked={isDone}
            onChange={handleIsDone}
        />
        <input
            type="text"
            value={text}
            onChange={handleTextChange}
            readOnly={!editing}
            className={`${
                todo.done ? "line-through" : ""
            } outline-none read-only:border-transparent focus:border border-gray-200 rounded px-2 py-1 w-full`}
        />
        <div className="flex gap-1 ml-auto">
            {/* edit and save button */}
            {editing ? (
                <div onClick={handleSave} className="text-white mt-1 cursor-pointer">
                    <span>Save</span>
                </div>
            ) : (
                <div onClick={handleEdit} className="mt-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </div>
            )}

            {/* delete button */}
            <div onClick={handleDelete} className="mt-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f87171" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
            </div>
        </div>
    </div>
  );
};

export default Focus;