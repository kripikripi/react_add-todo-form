import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => (
  <>
    <article
      data-id="1"
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  </>
);
