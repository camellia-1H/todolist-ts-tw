import { useState } from "react";
import "./index.css";
import InputFeild from "./Input";
import { Todo } from "./models/Todo";

function App() {
	const [todo, setTodo] = useState<string>("");
	const [list, setList] = useState<Todo[]>([]);

	const handleSet = (): void => {
		setList([
			...list,
			{ id: Math.floor(Math.random() * 10 + 1), todo: todo, isDone: false },
		]);
		setTodo("");
	};
	console.log(list);

	return (
		<div className="flex justify-center my-12">
			<div className="flex flex-col w-2/4 items-center">
				<h1 className="text-3xl underline text-red-500 py-20">
					To do App by Manh
				</h1>
				<InputFeild todo={todo} setTodo={setTodo} handleSet={handleSet} />

				<ul className="w-full marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-400">
					{list.map(value => {
						return (
							<li key={value.id} className="flex justify-between">
								<h1 className="text-amber-700 flex-1 font-bold">
									{value.todo}
								</h1>
								<span>{String(value.isDone)}</span>{" "}
								<button className="ml-5 w-1/6 text-sm text-fuchsia-400 bg-indigo-400 rounded-full hover:bg-neutral-500 hover:text-red-400">
									Delete
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default App;
