import React, { useState } from 'react';
import './App.css';
import { Task } from './types';
import Card from './Card';
import Dialog from './EditDialog';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [inputPriority, setInputPriority] = useState<'high' | 'middle' | 'low'>('low');
  const [todos, setTodos] = useState<Task[]>([{ id: 1, title: 'Reactの勉強', checked: false, priority: 'high' },
  { id: 2, title: '洗濯', checked: false, priority: 'middle' },
  { id: 3, title: '買い物', checked: false, priority: 'low' },]);

  const [id, setId] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>({ id: 0, title: '', checked: false, priority: 'low' }); // selectedTask の型アノテーションを修正

  type Todo = {
    title: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputPriority(e.target.value as 'high' | 'middle' | 'low');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedPriority: 'low' | 'middle' | 'high' = (e.currentTarget[1]as HTMLSelectElement).value as 'low' | 'middle' | 'high';

    const newTask: Task = {
      id: id,
      title: inputValue,
      checked: false,
      priority: selectedPriority
    };

    setTodos(prevTodos => [...prevTodos, newTask]);
  setId(id + 1);
  setInputValue('');
  setIsDialogOpen(false);
};

const handleEdit = (id: number, newValue: string, newPriority: 'high' | 'middle' | 'low') => {
  const newTodos = todos.map(todo => (todo.id === id ? { ...todo, title: newValue, priority: newPriority } : todo));
  setTodos(newTodos);
};

  

  const handleOpenEditDialog = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };
  

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
    setSelectedTask({ id: 0, title: '', checked: false, priority: 'low' }); // 選択されたタスクを初期化
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="todoInput">タスクを追加する</label>
          <input
            type="text"
            id="todoInput"
            value={inputValue}
            onChange={handleChange}
            className="inputText"
          />
              <label htmlFor="priority">優先順位</label>
                <select
                id="priority"
                value={selectedTask.priority}
                onChange={(e) =>
                  setSelectedTask((prevTask) => ({
                    ...prevTask,
                    priority: e.target.value as 'high' | 'middle' | 'low',
                  }))
                }
                >
                  <option value="low">低</option>
                  <option value="middle">中</option>
                  <option value="high">高</option>
                </select>
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <div className="cardList">
          {todos.map(item => (
            <Card
            key={item.id}
            title={item.title}
            checked={item.checked}
            priority={item.priority} // 追加した優先度の値をカードに渡す
            onEdit={(newValue: string) => handleEdit(item.id, newValue, item.priority)}
            onChecked={() => handleChecked(item.id)}
            onDelete={() => handleDelete(item.id)}
            onOpenEditDialog={() => handleOpenEditDialog(item)}
          />
          ))}
           <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog} selectedTask={selectedTask} onEdit={handleEdit} />


        </div>
      </div>
    </div>
  );
}

export default App;
