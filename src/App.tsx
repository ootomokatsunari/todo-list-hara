import React, { useState } from 'react';
import './App.css';
import Card from './Card';

type Todo = {
  title: string;
  id: number;
  checked: boolean;
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    const newTodo: Todo = {
      title: inputValue,
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const handleEdit = (id: number, newValue: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: newValue } : todo
    );
    setTodos(newTodos);
  };

  const handleChecked = (id: number) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>ToDo List</h1>
        <form onSubmit={e => e.preventDefault()}>
          <input type="text" value={inputValue} onChange={handleChange} />
          <button onClick={handleAddTodo}>追加</button>
        </form>
      </div>
      <div className="cardList">
        {todos.map(todo => (
          <Card
            key={todo.id}
            title={todo.title}
            checked={todo.checked}
            onChecked={() => handleChecked(todo.id)}
            onDelete={() => handleDelete(todo.id)}
            onSave={(newValue: string) => handleEdit(todo.id, newValue)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
