import { FC } from "react";
import { Todo } from "../models/Todo";
import SingleTodo from "./SingleTodo";

type Props = {
	todos: Todo[];
};

const TodoList: FC<Props> = ({ todos }) => {
	return (
		<ul className="w-full marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-400">
			{todos.map(todo => (
				<SingleTodo key={todo.id} todo={todo} />
			))}
		</ul>
	);
};

export default TodoList;
