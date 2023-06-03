import { useSelector } from "react-redux";
import InputFeild from "./components/Input";
import SingleTodo from "./components/SingleTodo";
import { RootState } from "./features/store";

function App() {
	const todos = useSelector((state: RootState) => state.todos);
	console.log(todos);

	return (
		<div className="flex justify-center my-12">
			<div className="flex flex-col xl:w-1/2 sm:w-10/12 items-center">
				<h1 className="text-3xl underline text-red-500 py-20">
					To do App by Manh
				</h1>
				<InputFeild />

				<ul className="w-full marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-400">
					{todos.map(todo => (
						<SingleTodo key={todo.id} todo={todo} />
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
