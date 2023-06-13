import { useEffect, useRef, useState } from "react";
import { Todo } from "../models/Todo";
import {
	doneTodoThunk,
	editTodoThunk,
	deleteTodoThunk,
} from "../features/todo/todoSlice";
import store from "../features/store";

type Props = {
	todo: Todo;
	// list: Todo[];
	// setList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo }: Props) => {
	const [todoEdit, setTodoEdit] = useState<string>(todo.todo);
	const [isEdit, setEdit] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleDone = (id: number) => {
		// dispatch(doneTodo(id));
		store.dispatch(doneTodoThunk(id));
	};

	const handleDelete = (id: number) => {
		// dispatch(deleteTodo(id));
		store.dispatch(deleteTodoThunk(id));
	};

	const handleEdit = (id: number, todo: string) => {
		// dispatch(editTodo({ id, todo }));
		store.dispatch(editTodoThunk({ id, todo }));
		setEdit(false);
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, [isEdit]);

	return (
		<li className="h-7 flex justify-between items-center mt-2">
			<span className="caret-lime-200 font-bold h-6 w-6">{todo.isDone}</span>
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
						className="w-10 h-6 rounded-lg bg-slate-600 text-red-500"
						onClick={() => handleEdit(todo.id, todoEdit)}
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
			<button
				onClick={() => handleDelete(todo.id)}
				className="ml-1 w-1/6 text-sm text-fuchsia-400 bg-red-200 rounded-full hover:bg-neutral-500 hover:text-red-400"
			>
				Delete
			</button>

			{todo.isDone ? (
				<>
					<s className="ml-1 text-center w-1/6 text-sm text-fuchsia-400 bg-slate-600 rounded-full ">
						Edit
					</s>
					<button
						onClick={() => handleDone(todo.id)}
						className="ml-1 w-1/6 text-sm text-fuchsia-400 bg-slate-600 rounded-full "
					>
						Done
					</button>
				</>
			) : (
				<>
					<button
						onClick={() => {
							if (!isEdit) {
								setEdit(!isEdit);
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
				</>
			)}
		</li>
	);
};

export default SingleTodo;
