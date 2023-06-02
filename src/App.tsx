import { useState } from "react";
import InputFeild from "./components/Input";
import { Todo } from "./models/Todo";
import SingleTodo from "./components/Singletodo";

function App() {
	const [todo, setTodo] = useState<string>("");
	const [list, setList] = useState<Todo[]>([]);

	const handleSet = (): void => {
		setList([
			...list,
			{ id: Math.floor(Math.random() * 100 + 1), todo: todo, isDone: false },
		]);
		setTodo("");
	};
	console.log(list);

	return (
		<div className="flex justify-center my-12">
			<div className="flex flex-col w-3/4 items-center">
				<h1 className="text-3xl underline text-red-500 py-20">
					To do App by Manh
				</h1>
				<InputFeild todo={todo} setTodo={setTodo} handleSet={handleSet} />

				<ul className="w-full  marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-400">
					{list.map(todo => (
						<SingleTodo
							key={todo.id}
							todo={todo}
							list={list}
							setList={setList}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
