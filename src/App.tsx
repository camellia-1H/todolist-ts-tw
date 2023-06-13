import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import InputFeild from "./components/Input";
import store, { RootState } from "./features/store";
import TodoList from "./components/TodoList";
import { setupServer } from "./fakeApi";
import { fetchTodos } from "./features/todo/todoSlice";

setupServer();

function App() {
	const todoSelector = useSelector((state: RootState) => state.todos.todos);
	const [filterStatus, setStatus] = useState<string>("All");
	const [filterString, setFilterString] = useState<string>("");
	// const [result, setResult] = useState<Todo[]>([]);

	// const [result, setResult] = useState<Todo[]>([]);
	// console.log(todos);

	// const result = useMemo(async () => {
	// 	const data = await store.dispatch(fetchTodos());
	// 	return data.payload;
	// }, [filterStatus, filterString]);
	console.log(todoSelector);

	useEffect(() => {
		store.dispatch(fetchTodos());
	}, []);
	console.log(todoSelector);

	const result = useMemo(() => {
		return todoSelector.filter(todo => {
			return (
				(filterStatus === "All"
					? true
					: String(todo.isDone) === filterStatus) &&
				(todo.todo.startsWith(filterString) || todo.todo.includes(filterString))
			);
		});
	}, [filterStatus, todoSelector, filterString]);

	return (
		<div className="flex justify-center my-12">
			<div className="flex flex-col xl:w-1/2 sm:w-10/12 items-center">
				<h1 className="text-3xl underline text-red-500 py-20">
					To do App by Manh
				</h1>
				<InputFeild />
				<div className="w-6/12 flex justify-around my-4">
					<label htmlFor="isDone">Filter</label>
					<input
						type="text"
						placeholder="search"
						className="border-2 rounded-full border-slate-500 focus:bg-red-200 px-2 mx-3"
						onChange={e => setFilterString(e.target.value)}
					/>
					<select
						name="isDone"
						id="isDone"
						onChange={e => setStatus(e.target.value)}
					>
						<option value="All">All</option>
						<option value="true">Done</option>
						<option value="false">Not Done</option>
					</select>
				</div>

				<TodoList todos={result} />
			</div>
		</div>
	);
}

export default App;
