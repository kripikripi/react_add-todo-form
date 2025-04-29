import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';
import { Todo } from './Types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    })),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title === '' || userId === 0) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Enter todo title"
          />
          {title.length === 0 && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={userId}
            onChange={event => setUserId(Number(event.target.value))}
            data-cy="userSelect"
          >
            <option disabled value={0}>
              Please choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userId === 0 && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={title.trim() === '' || userId === 0}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
