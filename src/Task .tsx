import React, { useState } from 'react';
import './TaskForm.css';

type TaskFormProps = {
  onSubmit: (title: string, priority: 'high' | 'middle' | 'low', deadline: string) => void;
};

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<'high' | 'middle' | 'low'>('low');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue, priority, deadline);
    setInputValue('');
    setPriority('low');
    setDeadline(''); // 追加
  };

  // 期限が前日かどうかを判定する関数
  const isDeadlineYesterday = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const nowDate = new Date();
    nowDate.setDate(nowDate.getDate() + 1); // 今日の日付を1日進めたもの
    return deadlineDate.getTime() < nowDate.getTime() && deadlineDate.getTime() >= new Date().getTime();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">タスク名</label>
        <input
          type="text"
          id="title"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">優先度</label>
        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as 'high' | 'middle' | 'low')}>
          <option value="high">高</option>
          <option value="middle">中</option>
          <option value="low">低</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="deadline">期限</label>
        <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </div>
      <div className="form-buttons">
        <button type="submit" className="submit-button">
          追加
        </button>
      </div>
      {deadline && isDeadlineYesterday(deadline) && ( // 期限が前日の場合に赤文字で表示
        <div className="form-warning">期限が明日に迫っています！</div>
      )}
    </form>
  );
};

export default TaskForm;
