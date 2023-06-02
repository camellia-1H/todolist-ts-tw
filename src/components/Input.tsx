import { useRef } from "react";

interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleSet: () => void;
}

const InputFeild = ({ todo, setTodo, handleSet }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<div className="w-full text-center">
			<input
				ref={inputRef}
				type="input"
				value={todo}
				onChange={e => setTodo(e.target.value)}
				className="w-9/12 my-3 rounded-md border-2 border-sky-500 focus:outline-none focus:ring focus:ring-violet-300"
			/>
			<button
				type="submit"
				className="w-4/12 text-xl text-blue-700 bg-neutral-400 rounded-full hover:bg-neutral-500 hover:text-red-400"
				onClick={() => {
					handleSet();
					inputRef.current?.focus();
				}}
			>
				Set
			</button>
		</div>
	);
};

export default InputFeild;
