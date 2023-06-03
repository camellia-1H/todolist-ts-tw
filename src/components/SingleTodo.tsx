import { useEffect, useRef, useState } from "react";
import { Todo } from "../models/Todo";

type Props = {
	todo: Todo;
	list: Todo[];
	setList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, list, setList }: Props) => {
	const [todoEdit, setTodoEdit] = useState<string>(todo.todo);
	const [isEdit, setEdit] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleDone = (id: number) => {
		setList(
			list.map(todo =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
			),
		);
	};

	const handleDelete = (id: number) => {
		setList(list.filter(todo => todo.id !== id));
	};

	const handleEdit = (id: number) => {
		setList(
			list.map(todo => (todo.id === id ? { ...todo, todo: todoEdit } : todo)),
		);

		setEdit(false);
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, [isEdit]);

	return (
		<li className="h-7 flex justify-between items-center mt-2">
			{isEdit ? (
				<div className="flex-1">
					<input
						ref={inputRef}
						type="text"
						value={todoEdit}
						onChange={e => setTodoEdit(e.target.value)}
						className="mr-4 border-2 rounded-md border-cyan-300"
					/>
					<button
						className="w-3 h-5 bg-slate-600 text-black"
						onClick={() => handleEdit(todo.id)}
					>
						oke
					</button>
				</div>
			) : (
				<>
					{todo.isDone ? (
						<s className="text-amber-700 flex-1 font-bold">{todo.todo}</s>
					) : (
						<h1 className="text-amber-700 flex-1 font-bold">{todo.todo}</h1>
					)}
				</>
			)}

			<span>{String(todo.isDone)}</span>
			<button
				onClick={() => handleDelete(todo.id)}
				className="ml-1 w-1/6 text-sm text-fuchsia-400 bg-red-200 rounded-full hover:bg-neutral-500 hover:text-red-400"
			>
				Delete
			</button>
			<button
				onClick={() => {
					if (!isEdit) {
						setEdit(!isEdit);
						// inputRef.current?.focus();
					} else setEdit(false);
				}}
				className="ml-1 w-1/6 text-sm text-fuchsia-400 bg-red-200 rounded-full hover:bg-neutral-500 hover:text-red-400"
			>
				Edit
			</button>
			<button
				onClick={() => handleDone(todo.id)}
				className="ml-1 w-1/6 text-sm text-fuchsia-400 bg-red-200 rounded-full hover:bg-neutral-500 hover:text-red-400"
			>
				Done
			</button>
		</li>
	);
};

export default SingleTodo;
