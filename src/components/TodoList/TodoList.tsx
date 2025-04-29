import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: { todos: Todo[] }) => (
  <>
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </>
);
