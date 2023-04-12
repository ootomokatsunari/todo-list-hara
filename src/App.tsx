import React, { useState } from 'react';
import './App.css';
import Task from "./types"
import Card from './Card';
import Dialog from './EditDialog';
import Button from './Button';
import { log } from 'console';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [inputPriority, setInputPriority] = useState<'high' | 'middle' | 'low'>('low');
  const [inputDeadline, setInputDeadline] = useState('');
  const [error, setError] = useState('');
  const [todos, setTodos] = useState<Task[]>([
    { id: 1, title: 'Reactの勉強', checked: false, priority: 'high', date: '', deadline: '' },
    { id: 2, title: '洗濯', checked: false, priority: 'middle', date: '', deadline: '' },
    { id: 3, title: '買い物', checked: false, priority: 'low', date: '', deadline: '' },
  ]);
  

  const [id, setId] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: 0,
    title: '',
    checked: false,
    priority: 'low',
    date: '',
    deadline: ''
  });
  
  const [selectedDate, setSelectedDate] = useState('');
  

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDeadline(e.target.value); //変更をstateに格納
  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCount(e.target.value.length);
  };

  const handleCheckTaskContent = () => {
    if (inputValue.trim() === '') {
      let errorMsg = '';
  
      if (!inputValue) {
        errorMsg = 'タスク内容は必須です。';
      }
  
      if (inputValue.length > 50) {
        alert('タスク内容は50文字以内で入力してください');
        return;
      }
    
      if (inputDeadline !== '') {
        const today = new Date().toISOString().slice(0, 10);
        if (inputDeadline < today) {
          alert('期限は当日または未来日を指定してください');
          return;
        }
  
        setError(errorMsg);
      }
    }
  };
  
    

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedPriority: 'low' | 'middle' | 'high' = (e.currentTarget[1]as HTMLSelectElement).value as 'low' | 'middle' | 'high';
    handleCheckTaskContent();

    const newTask: Task = {
      id: id,
      title: inputValue,
      checked: false,
      priority: selectedPriority,
      date: selectedDate,
      deadline: inputDeadline,
    };

    setTodos(prevTodos => [...prevTodos, newTask]);
  setId(id + 1);
  setInputValue('');
  setIsDialogOpen(false);
};

const handleEdit = (id: number, newValue: string, newPriority: 'high' | 'middle' | 'low') => {
  const newTodos = todos.map(todo => 
    todo.id === id ? { ...todo, title: newValue, priority: newPriority } : todo
    );
  setTodos(newTodos);
};

  

  const handleOpenEditDialog = (task: Task) => {
    // console.log(task)
    setSelectedTask(task);
    setIsDialogOpen(true);
  };
  

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setSelectedTask({ id: 0, title: '', checked: false, priority: 'low', date: '', deadline: '' }); // 選択されたタスクを初期化
  };
  

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}年${month}月${day}日`;
  };
  const isBeforeDeadline = (date: string, deadline: string) => {
    const today = new Date();
    const d = new Date(deadline);
    d.setDate(d.getDate() + 1);
    return today <= d;
  };
  
  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="todoInput">タスクを追加する<span className="required">*</span></label>
          <input
            type="text"
            id="todoInput"
            value={inputValue}
            onChange={handleChange}
            className="inputText"
          />
            <p>文字数: {count}/50</p> 
           {error && <div className="error">{error}</div>}
              <label htmlFor="priority">優先順位</label>
              
                <select
                id="priority"
                value={selectedTask.priority}
                onChange={(e) =>
                  setSelectedTask((prevTask: Task) => ({
                    ...prevTask,
                    priority: e.target.value as 'high' | 'middle' | 'low',
                  }))
                  
                }
                >
                  <option value="low">低</option>
                  <option value="middle">中</option>
                  <option value="high">高</option>
                </select>
      <h2>日付を入力する</h2>
           <label htmlFor="deadline">期限<span className="required">*</span></label>
           <input
         type="date"
         id="deadline"
         value={inputDeadline}
         onChange={handleDeadlineChange}
       />
          <input type="submit"
           value="作成" 
           className="submitButton" />
        </form>
        <div className="cardList">
          {todos.map(item => (
            <Card
            key={item.id}
            title={item.title}
            checked={item.checked}
            priority={item.priority}
            date={item.date}
            deadline={item.deadline}
            onDelete={() => handleDelete(item.id)}
            onOpenEditDialog={() => handleOpenEditDialog(item)}
            isBeforeDeadline={isBeforeDeadline(item.date, item.deadline)}
            />
           ))}

           <Dialog isOpen={isDialogOpen} 
           onClose={handleCloseDialog} 
           selectedTask={selectedTask}
           onEdit={handleEdit} 
           />


        </div>
      </div>
    </div>
  );
};

export default App
