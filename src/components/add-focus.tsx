"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
    createFocus: (value: string) => void;
}

const AddFocus: FC<Props> = ({ createFocus }) => {
    const [input, setInput] = useState<string>("");

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleAdd = async () => {
        if (input.trim() === "") {
            alert("Enter what you want to focus on first ;)");
            return;
        }

        createFocus(input);
        setInput("");
    };

    return (
        <div className="w-full flex flex-col items-center gap-3">
            <span className="text-white text-3xl font-medium">What is your main focus today?</span>
            <input
                type="text"
                className="max-w-lg w-full px-2 py-1 outline-none bg-transparent border-b-2 border-white rounded text-white"
                onChange={handleInput}
                value={input}
                onKeyDownCapture={(e) => {
                    if (e.key === "Enter") {
                        handleAdd();
                    }
                }}
            />
        </div>
    );
};

export default AddFocus;