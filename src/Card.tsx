import React, { useState } from 'react';
import './Card.css';



type CardProps = {
  title: string;
  checked: boolean;
  priority: 'high' | 'middle' | 'low';
  date: string; // 追加
  deadline: string; // 追加
  onEdit: (newValue: string) => void;
  onChecked: () => void;
  onDelete: () => void;
  onOpenEditDialog: () => void;
  isBeforeDeadline: boolean;
};

const Card = ({ title, checked,priority,onEdit, onChecked, onDelete,onOpenEditDialog}: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  
  const handleCancelClick = () => {
    setIsEditing(false);
    setInputValue(title);
  };

  const handleSaveClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(inputValue);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="card">
  <div className="cardContent">
    <div className="cardTitle">
      {checked ? (
        <del>{title}</del>
      ) : (
        <span onClick={onChecked}>{title}</span>
      )}
    </div>
    <div className="cardPriority">
          <span>優先度: </span>
          <span>{priority}</span>
        </div>
    <div className="cardEdit">
      <button onClick={onOpenEditDialog} className="cardEditButton">
        編集
      </button>
      <button onClick={onDelete} className="cardDeleteButton">
        削除
      </button>
    </div>
  </div>
  {isEditing && (
    <div className="dialog">
      <h3>タスク修正</h3>
      <form onSubmit={handleSaveClick}>
        <label htmlFor="editInput">タイトル</label>
        <input
          type="text"
          id="editInput"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">更新</button>
        <button type="button" onClick={handleCancelClick}>
          閉じる
        </button>
      </form>
    </div>
  )}
</div>
  );
};

export default Card;
